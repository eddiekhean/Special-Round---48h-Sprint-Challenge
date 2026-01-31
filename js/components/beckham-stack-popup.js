class BeckhamStackPopup {
  constructor() {
    ((this.popup = null),
      (this.overlay = null),
      (this.currentVariantId = null),
      (this.shouldShowCartAfterClose = !1),
      this.setupCartInterception(),
      this.init());
  }
  setupCartInterception() {
    window.beckhamStackShowingPopup = !1;
    const interceptCart = () => {
      const cartDrawer = document.querySelector("cart-drawer"),
        cartNotification = document.querySelector("cart-notification");
      (cartDrawer &&
        !cartDrawer._beckhamIntercepted &&
        ((cartDrawer._beckhamIntercepted = !0),
        (cartDrawer._beckhamOriginalOpen = cartDrawer.open),
        (cartDrawer.open = function (opener) {
          return window.beckhamStackShowingPopup
            ? !1
            : this._beckhamOriginalOpen?.call(this, opener);
        })),
        cartNotification &&
          !cartNotification._beckhamIntercepted &&
          ((cartNotification._beckhamIntercepted = !0),
          (cartNotification._beckhamOriginalOpen = cartNotification.open),
          (cartNotification.open = function (opener) {
            return window.beckhamStackShowingPopup
              ? !1
              : this._beckhamOriginalOpen?.call(this, opener);
          })));
    };
    interceptCart();
    const interceptInterval = setInterval(() => {
      interceptCart();
    }, 100);
    setTimeout(() => clearInterval(interceptInterval), 1e4);
  }
  async init() {
    if (
      ((this.popup = document.getElementById("beckham-stack-popup")),
      (this.overlay = document.getElementById("beckham-stack-overlay")),
      console.log("[Beckham DEBUG] JS init:", {
        popupElement: !!this.popup,
        overlayElement: !!this.overlay,
        settings: window.beckhamStackSettings,
      }),
      !this.popup || !this.overlay)
    ) {
      console.log(
        "[Beckham DEBUG] Missing elements - popup:",
        !!this.popup,
        "overlay:",
        !!this.overlay,
      );
      return;
    }
    if (!window.beckhamStackSettings?.enabled) {
      console.log("[Beckham DEBUG] Popup not enabled in settings");
      return;
    }
    (console.log("[Beckham DEBUG] Popup initialization continuing..."),
      this.overlay &&
        !this.overlay.dataset.moved &&
        (document.body.appendChild(this.overlay),
        (this.overlay.dataset.moved = "true")),
      this.popup &&
        !this.popup.dataset.moved &&
        (document.body.appendChild(this.popup),
        (this.popup.dataset.moved = "true")),
      this.bindEvents(),
      this.bindFormEvents());
  }
  bindFormEvents() {
    const essentialsVariants = (
        window.beckhamStackSettings?.essentialsVariants || ""
      )
        .split(",")
        .map((id) => id.trim()),
      longevityVariants = (window.beckhamStackSettings?.longevityVariants || "")
        .split(",")
        .map((id) => id.trim()),
      allVariants = [...essentialsVariants, ...longevityVariants];
    if (
      (console.log(
        "[Beckham DEBUG] Setting up cartUpdate listener, PUB_SUB_EVENTS:",
        typeof PUB_SUB_EVENTS,
      ),
      typeof PUB_SUB_EVENTS < "u")
    ) {
      const subscription = {
        callback: async (event) => {
          const variantId = event.productVariantId,
            cartData = event.cartData,
            source = event.source;
          if (
            (console.log("[Beckham DEBUG] cartUpdate event received:", {
              variantId,
              source,
              allVariants,
              isInList: variantId && allVariants.includes(String(variantId)),
            }),
            source === "beckham-stack-popup" ||
              source === "beckham-stack-popup-skip")
          ) {
            console.log("[Beckham DEBUG] Ignoring our own event");
            return;
          }
          if (variantId && allVariants.includes(String(variantId))) {
            (console.log(
              "[Beckham DEBUG] Variant matches! Showing popup for:",
              variantId,
            ),
              (window.beckhamStackShowingPopup = !0));
            const beckhamStackProductId = 8360959213735;
            let alreadyInCart = !1;
            if (cartData?.items && Array.isArray(cartData.items))
              ((alreadyInCart = cartData.items.some(
                (item) => item.product_id === beckhamStackProductId,
              )),
                console.log(
                  "[Beckham DEBUG] Cart check from event data, alreadyInCart:",
                  alreadyInCart,
                ));
            else
              try {
                (console.log("[Beckham DEBUG] Fetching cart.js..."),
                  (alreadyInCart = (
                    await (await fetch("/cart.js")).json()
                  ).items.some(
                    (item) => item.product_id === beckhamStackProductId,
                  )),
                  console.log(
                    "[Beckham DEBUG] Cart check from fetch, alreadyInCart:",
                    alreadyInCart,
                  ));
              } catch (error) {
                (console.log("[Beckham DEBUG] Cart fetch error:", error),
                  (alreadyInCart = !1));
              }
            if (alreadyInCart) {
              (console.log(
                "[Beckham DEBUG] Beckham Stack already in cart, skipping popup",
              ),
                (window.beckhamStackShowingPopup = !1));
              return;
            }
            ((this.currentVariantId = variantId),
              console.log(
                "[Beckham DEBUG] About to call openPopup, this.popup:",
                !!this.popup,
              ),
              cartData && (window.beckhamStackCartResponse = cartData),
              this.openPopup());
          }
        },
      };
      typeof subscribe < "u" &&
        subscribe(PUB_SUB_EVENTS.cartUpdate, subscription.callback);
    }
  }
  bindEvents() {
    const closeBtn = this.popup.querySelector("[data-close-popup]");
    (closeBtn &&
      closeBtn.addEventListener("click", async () => {
        ((this.shouldShowCartAfterClose = !0), await this.closePopup());
      }),
      this.overlay &&
        this.overlay.addEventListener("click", async () => {
          ((this.shouldShowCartAfterClose = !0), await this.closePopup());
        }),
      document.addEventListener("keydown", async (e) => {
        e.key === "Escape" &&
          this.isPopupOpen() &&
          ((this.shouldShowCartAfterClose = !0), await this.closePopup());
      }));
    const ctaBtn = this.popup.querySelector("[data-beckham-add-to-cart]");
    ctaBtn &&
      ctaBtn.addEventListener("click", () => this.upgradeToBeckhamStack());
    const proceedBtn = this.popup.querySelector(
      "[data-beckham-proceed-original]",
    );
    proceedBtn &&
      proceedBtn.addEventListener("click", async () => {
        ((this.shouldShowCartAfterClose = !0),
          (window.beckhamStackCartResponse = null),
          await this.closePopup());
      });
  }
  async openPopup() {
    if (
      (console.log(
        "[Beckham DEBUG] openPopup called, popup:",
        !!this.popup,
        "overlay:",
        !!this.overlay,
      ),
      !this.popup || !this.overlay)
    ) {
      console.log("[Beckham DEBUG] openPopup ABORTED - missing elements");
      return;
    }
    ((window.beckhamStackShowingPopup = !0),
      (this.shouldShowCartAfterClose = !0),
      console.log(
        "[Beckham DEBUG] Adding active classes to popup and overlay",
      ));
    const cartDrawer = document.querySelector("cart-drawer"),
      cartNotification = document.querySelector("cart-notification");
    (cartDrawer &&
      (cartDrawer.classList.remove("active"),
      cartDrawer._beckhamOriginalClose
        ? cartDrawer._beckhamOriginalClose.call(cartDrawer)
        : typeof cartDrawer.close == "function" && cartDrawer.close()),
      cartNotification &&
        (cartNotification.classList.remove("active"),
        cartNotification._beckhamOriginalClose
          ? cartNotification._beckhamOriginalClose.call(cartNotification)
          : typeof cartNotification.close == "function" &&
            cartNotification.close()),
      document.body.classList.add("beckham-stack-popup-open"),
      this.overlay.classList.add("active"),
      setTimeout(() => {
        this.popup.classList.add("active");
      }, 50));
  }
  openCartDrawer() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cartDrawer = document.querySelector("cart-drawer"),
          cartNotification = document.querySelector("cart-notification"),
          cart = cartDrawer || cartNotification;
        if (cart && typeof cart.open == "function")
          try {
            cart.open();
          } catch (error) {
            console.error("[Beckham] Error opening cart:", error);
            const cartIcon = document.querySelector(".header__icon--cart");
            cartIcon && cartIcon.click();
          }
        else {
          const cartIcon = document.querySelector(".header__icon--cart");
          cartIcon && cartIcon.click();
        }
      });
    });
  }
  async checkBeckhamStackInCart(cartData = null) {
    try {
      return cartData && cartData.items
        ? cartData.items.some((item) => item.product_id === 8360959213735)
        : (await (await fetch("/cart.js")).json()).items.some(
            (item) => item.product_id === 8360959213735,
          );
    } catch {
      return !1;
    }
  }
  async closePopup() {
    if (!(!this.popup || !this.overlay))
      if (
        (this.popup.classList.remove("active"),
        setTimeout(() => {
          (this.overlay.classList.remove("active"),
            document.body.classList.remove("beckham-stack-popup-open"));
        }, 100),
        await new Promise((resolve) => setTimeout(resolve, 400)),
        (window.beckhamStackShowingPopup = !1),
        this.shouldShowCartAfterClose)
      )
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const [cartJson, sectionsData] = await Promise.all([
              fetch("/cart.js").then((r) => r.json()),
              fetch("/?sections=cart-drawer,cart-icon-bubble").then((r) =>
                r.json(),
              ),
            ]),
            cartData = { ...cartJson, sections: sectionsData },
            cart =
              document.querySelector("cart-notification") ||
              document.querySelector("cart-drawer");
          cart && typeof cart.renderContents == "function"
            ? (typeof publish < "u" &&
                typeof PUB_SUB_EVENTS < "u" &&
                publish(PUB_SUB_EVENTS.cartUpdate, {
                  source: "beckham-stack-popup",
                  productVariantId: null,
                  cartData,
                }),
              await cart.renderContents(cartData),
              await new Promise((resolve) => setTimeout(resolve, 300)),
              await new Promise((resolve) => {
                requestAnimationFrame(() => requestAnimationFrame(resolve));
              }),
              this.openCartDrawer())
            : (await new Promise((resolve) => setTimeout(resolve, 200)),
              this.openCartDrawer());
        } catch (error) {
          (console.error("[Beckham] Error in cart display:", error),
            await new Promise((resolve) => setTimeout(resolve, 300)),
            this.openCartDrawer());
        } finally {
          ((this.shouldShowCartAfterClose = !1),
            (window.beckhamStackCartResponse = null));
        }
      else window.beckhamStackCartResponse = null;
  }
  async addBeckhamStackToCart() {
    try {
      const updateObj = await this.getEssentialAndLongevityIdsObj();
      if (Object.keys(updateObj).length > 0) {
        const emptyResponse = await fetch("/cart/update.js", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates: updateObj }),
          credentials: "include",
        });
        if (!emptyResponse.ok) throw new Error("Failed to update cart");
        (await emptyResponse.json(),
          await new Promise((resolve) => setTimeout(resolve, 200)));
      }
      const beckhamStackVariantId = this.getBeckhamStackVariantId(),
        addResponse = await fetch("/cart/add.js", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: beckhamStackVariantId,
            quantity: 1,
            selling_plan: "2546008231",
          }),
          credentials: "include",
        });
      if (!addResponse.ok)
        throw new Error("Failed to add Beckham Stack to cart");
      const addData = await addResponse.json();
      if (
        (await new Promise((resolve) => setTimeout(resolve, 300)),
        typeof publish < "u" && typeof PUB_SUB_EVENTS < "u")
      ) {
        const cartJson2 = await fetch("/cart.js").then((r) => r.json());
        publish(PUB_SUB_EVENTS.cartUpdate, {
          source: "beckham-stack-added",
          productVariantId: beckhamStackVariantId,
          eventType: "add",
          cartData: {
            items: cartJson2.items,
            item_count: cartJson2.item_count,
            quantity: 1,
          },
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
      const [cartJson, sectionsData] = await Promise.all([
        fetch("/cart.js").then((r) => r.json()),
        fetch("/?sections=cart-drawer,cart-icon-bubble").then((r) => r.json()),
      ]);
      return (
        (window.beckhamStackCartResponse = {
          ...addData,
          items: cartJson.items,
          item_count: cartJson.item_count,
          sections: sectionsData,
        }),
        !0
      );
    } catch (error) {
      throw (
        console.error("[Beckham] Error in addBeckhamStackToCart:", error),
        error
      );
    }
  }
  getBeckhamStackVariantId() {
    const variantMap = {
        46073779257511: "46073779388583",
        46166911811751: "46166929735847",
        46073779323047: "46166929735847",
        default: "46073779388583",
      },
      originalVariantId = String(this.currentVariantId || "");
    return variantMap[originalVariantId] || variantMap.default;
  }
  async addWelcomeGifts(beckhamStackVariantId) {}
  async upgradeToBeckhamStack() {
    const ctaBtn = this.popup.querySelector("[data-beckham-add-to-cart]");
    if (ctaBtn) {
      ctaBtn.classList.add("loading");
      const spinner = ctaBtn.querySelector(".loading__spinner");
      spinner && spinner.classList.remove("hidden");
    }
    try {
      ((window.beckhamStackCartResponse = null),
        await this.addBeckhamStackToCart(),
        await new Promise((resolve) => setTimeout(resolve, 300)),
        (this.currentVariantId = null),
        (this.shouldShowCartAfterClose = !0),
        await this.closePopup());
    } catch (error) {
      (console.error("[Beckham] Error in upgrade flow:", error),
        await this.closePopup());
    } finally {
      if (ctaBtn) {
        ctaBtn.classList.remove("loading");
        const spinner = ctaBtn.querySelector(".loading__spinner");
        spinner && spinner.classList.add("hidden");
      }
    }
  }
  isPopupOpen() {
    return this.popup && this.popup.classList.contains("active");
  }
  async getEssentialAndLongevityIdsObj() {
    try {
      if (this.currentVariantId) return { [this.currentVariantId]: 0 };
      const cart = await (await fetch("/cart.js")).json(),
        beckhamStackProductId = 8360959213735,
        updates = {};
      return (
        cart.items.forEach((item) => {
          item.product_id !== beckhamStackProductId && (updates[item.id] = 0);
        }),
        updates
      );
    } catch {
      return {};
    }
  }
}
(document.addEventListener("DOMContentLoaded", () => {
  window.beckhamStackPopup = new BeckhamStackPopup();
}),
  (window.IM8 = window.IM8 || {}),
  (window.IM8.revealBeckhamStackPopup = function () {
    try {
      const overlay = document.getElementById("beckham-stack-overlay"),
        popup = document.getElementById("beckham-stack-popup");
      if (
        (overlay && overlay.classList.remove("is-disabled"),
        popup && popup.classList.remove("is-disabled"),
        window.beckhamStackPopup ||
          (window.beckhamStackPopup = new BeckhamStackPopup()),
        window.beckhamStackPopup &&
          typeof window.beckhamStackPopup.openPopup == "function")
      )
        return (window.beckhamStackPopup.openPopup(), !0);
    } catch {
      return !1;
    }
    return !1;
  }),
  (window.IM8.hideBeckhamStackPopup = function () {
    try {
      if (
        window.beckhamStackPopup &&
        typeof window.beckhamStackPopup.closePopup == "function"
      )
        return (window.beckhamStackPopup.closePopup(), !0);
    } catch {
      return !1;
    }
    return !1;
  }),
  (window.openBeckhamStackPopup = window.IM8.revealBeckhamStackPopup),
  (window.closeBeckhamStackPopup = window.IM8.hideBeckhamStackPopup));
//# sourceMappingURL=/cdn/shop/t/121/assets/beckham-stack-popup.js.map?v=51760086457612606781764243453
