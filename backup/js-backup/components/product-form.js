customElements.get("product-form") ||
  customElements.define(
    "product-form",
    class extends HTMLElement {
      constructor() {
        (super(),
          (this.form = this.querySelector("form")),
          (this.variantIdInput.disabled = !1),
          this.form.addEventListener("submit", this.onSubmitHandler.bind(this)),
          (this.cart =
            document.querySelector("cart-notification") ||
            document.querySelector("cart-drawer")),
          (this.submitButton = this.querySelector('[type="submit"]')),
          this.submitButton &&
            ((this.submitButtonText = this.submitButton.querySelector("span")),
            document.querySelector("cart-drawer") &&
              this.submitButton.setAttribute("aria-haspopup", "dialog")),
          (this.hideErrors = this.dataset.hideErrors === "true"));
      }
      onSubmitHandler(evt) {
        if (
          (evt.preventDefault(),
          this.submitButton.getAttribute("aria-disabled") === "true")
        )
          return;
        (this.handleErrorMessage(),
          this.submitButton.setAttribute("aria-disabled", !0),
          this.submitButton.classList.add("loading"),
          this.querySelector(".loading__spinner").classList.remove("hidden"));
        const config = fetchConfig("javascript");
        ((config.headers["X-Requested-With"] = "XMLHttpRequest"),
          delete config.headers["Content-Type"]);
        const formData = new FormData(this.form),
          variantIdInput = this.form.querySelector("[name=id]");
        console.log(
          "[ProductForm] Submitting form with variant ID:",
          variantIdInput?.value,
          "product handle:",
          variantIdInput?.dataset?.productHandle,
        );
        let sellingPlanFound = !1;
        const filteredFormData = new FormData();
        for (const [key, value] of formData.entries())
          key === "selling_plan"
            ? sellingPlanFound ||
              (filteredFormData.append(key, value), (sellingPlanFound = !0))
            : filteredFormData.append(key, value);
        const variantId = variantIdInput?.value,
          vid = parseInt(variantId),
          isQuarterly =
            (window.isQuarterlyVariant &&
              window.isQuarterlyVariant(variantId)) ||
            (window.hbPopupQuarterlyVariantIds &&
              window.hbPopupQuarterlyVariantIds.includes(vid)),
          isDouble =
            (window.isDoubleSubscriptionVariant &&
              window.isDoubleSubscriptionVariant(variantId)) ||
            (window.hbPopupDoubleSubscriptionVariantIds &&
              window.hbPopupDoubleSubscriptionVariantIds.includes(vid));
        (console.log(
          "[ProductForm] Variant ID:",
          variantId,
          "Is Quarterly:",
          isQuarterly,
          "Is Double:",
          isDouble,
        ),
          isQuarterly &&
            (filteredFormData.append("properties[_quarterly_variant]", "true"),
            console.log(
              "[ProductForm] Added _quarterly_variant (hidden) property to cart item",
            )),
          isDouble &&
            (filteredFormData.append("properties[_double_variant]", "true"),
            console.log(
              "[ProductForm] Added _double_variant (hidden) property to cart item",
            )),
          this.cart &&
            typeof this.cart.getSectionsToRender == "function" &&
            (filteredFormData.append(
              "sections",
              this.cart.getSectionsToRender().map((section) => section.id),
            ),
            filteredFormData.append("sections_url", window.location.pathname),
            typeof this.cart.setActiveElement == "function" &&
              this.cart.setActiveElement(document.activeElement)),
          (config.body = filteredFormData),
          fetch(`${routes.cart_add_url}`, config)
            .then((response) => response.json())
            .then((response) => {
              if (response.status) {
                (publish(PUB_SUB_EVENTS.cartError, {
                  source: "product-form",
                  productVariantId: formData.get("id"),
                  errors: response.errors || response.description,
                  message: response.message,
                }),
                  this.handleErrorMessage(response.description));
                const soldOutMessage =
                  this.submitButton.querySelector(".sold-out-message");
                if (!soldOutMessage) return;
                (this.submitButton.setAttribute("aria-disabled", !0),
                  this.submitButtonText.classList.add("hidden"),
                  soldOutMessage.classList.remove("hidden"),
                  (this.error = !0));
                return;
              } else if (!this.cart) {
                window.location = window.routes.cart_url;
                return;
              }
              {
                (this.error ||
                  publish(PUB_SUB_EVENTS.cartUpdate, {
                    source: "product-form",
                    productVariantId: formData.get("id"),
                    cartData: response,
                    eventType: EVENT_TYPE.add,
                  }),
                  (this.error = !1));
                const quickAddModal = this.closest("quick-add-modal");
                quickAddModal
                  ? (document.body.addEventListener(
                      "modalClosed",
                      () => {
                        setTimeout(() => {
                          this.cart &&
                            typeof this.cart.renderContents == "function" &&
                            this.cart.renderContents(response);
                        });
                      },
                      { once: !0 },
                    ),
                    quickAddModal.hide(!0))
                  : this.cart &&
                    typeof this.cart.renderContents == "function" &&
                    this.cart.renderContents(response);
              }
              const quickAddDrawer = document.querySelector("[js-hb-popup]");
              quickAddDrawer &&
                (quickAddDrawer.classList.remove("open"),
                quickAddDrawer.classList.add("hidden"));
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
              (this.submitButton.classList.remove("loading"),
                this.cart &&
                  this.cart.classList.contains("is-empty") &&
                  this.cart.classList.remove("is-empty"),
                this.error ||
                  this.submitButton.removeAttribute("aria-disabled"),
                this.querySelector(".loading__spinner").classList.add(
                  "hidden",
                ));
            }));
      }
      handleErrorMessage(errorMessage = !1) {
        this.hideErrors ||
          ((this.errorMessageWrapper =
            this.errorMessageWrapper ||
            this.querySelector(".product-form__error-message-wrapper")),
          this.errorMessageWrapper &&
            ((this.errorMessage =
              this.errorMessage ||
              this.errorMessageWrapper.querySelector(
                ".product-form__error-message",
              )),
            this.errorMessageWrapper.toggleAttribute("hidden", !errorMessage),
            errorMessage && (this.errorMessage.textContent = errorMessage)));
      }
      toggleSubmitButton(disable = !0, text) {
        const isPreorder = this?.dataset?.preorder === "true",
          variantId = this.variantIdInput?.value,
          isQuarterly =
            window.isQuarterlyVariant && window.isQuarterlyVariant(variantId),
          isHidden =
            window.isHiddenVariant && window.isHiddenVariant(variantId);
        let displayVariant = window.productVariants?.find(
          (v) => v.id == parseInt(variantId),
        );
        if (
          (isHidden &&
            window.getFirstAvailableNonHiddenVariant &&
            (displayVariant = window.getFirstAvailableNonHiddenVariant()),
          disable)
        ) {
          if ((this.submitButton.setAttribute("disabled", "disabled"), text)) {
            const buttonText = this.submitButton.querySelector(".button-text");
            buttonText
              ? (buttonText.textContent = text)
              : (this.submitButtonText.textContent = text);
          }
        } else {
          this.submitButton.removeAttribute("disabled");
          const buttonText = this.submitButton.querySelector(".button-text"),
            priceDisplay =
              this.submitButton.querySelector(".product_price_new"),
            isDoubleSubscription =
              window.isDoubleSubscriptionVariant &&
              window.isDoubleSubscriptionVariant(variantId),
            isSubscription = !(
              window.isOneTimePurchaseVariant &&
              window.isOneTimePurchaseVariant(variantId)
            );
          if (isQuarterly && !isHidden) {
            if (
              (this.submitButton.classList.add("quarterly-selected"),
              buttonText
                ? (buttonText.textContent =
                    "START MY 90-DAY TRANSFORMATION PROGRAM")
                : this.submitButtonText &&
                  (this.submitButtonText.textContent =
                    "START MY 90-DAY TRANSFORMATION PROGRAM"),
              priceDisplay && window.productVariants)
            ) {
              const currentVariant = window.productVariants.find(
                (v) => v.id == parseInt(variantId),
              );
              if (currentVariant && window.formatMoney) {
                const monthlyPrice = currentVariant.price / 3,
                  formattedPrice = window.formatMoney(monthlyPrice);
                priceDisplay.innerHTML = formattedPrice + "/mo";
              }
            }
          } else if (isPreorder)
            (this.submitButton.classList.remove("quarterly-selected"),
              buttonText
                ? (buttonText.textContent = "Pre-order")
                : this.submitButtonText &&
                  (this.submitButtonText.textContent = "Pre-order"));
          else if (
            (this.submitButton.classList.remove("quarterly-selected"),
            buttonText
              ? (buttonText.textContent = window.variantStrings.addToCart)
              : this.submitButtonText &&
                (this.submitButtonText.textContent =
                  window.variantStrings.addToCart),
            priceDisplay && displayVariant && window.formatMoney)
          ) {
            let monthlyPrice = displayVariant.price;
            isDoubleSubscription && (monthlyPrice = displayVariant.price / 2);
            const isQuarterly2 =
              window.isQuarterlyVariant && window.isQuarterlyVariant(variantId);
            window.isNutritionKitchenPage &&
              !isQuarterly2 &&
              !isDoubleSubscription &&
              (monthlyPrice = Math.round(monthlyPrice * 0.9));
            const formattedPrice = window.formatMoney(monthlyPrice);
            priceDisplay.innerHTML =
              formattedPrice + (isSubscription ? "/mo" : "");
          }
        }
      }
      get variantIdInput() {
        return this.form.querySelector("[name=id]");
      }
    },
  );
//# sourceMappingURL=/cdn/shop/t/121/assets/product-form.js.map?v=2051695091139469241767781077
