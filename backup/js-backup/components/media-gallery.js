customElements.get("media-gallery") ||
  customElements.define(
    "media-gallery",
    class extends HTMLElement {
      constructor() {
        (super(),
          (this.elements = {
            liveRegion: this.querySelector('[id^="GalleryStatus"]'),
            viewer: this.querySelector('[id^="GalleryViewer"]'),
            thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
          }),
          (this.mql = window.matchMedia("(min-width: 750px)")),
          this.elements.thumbnails &&
            (this.elements.viewer.addEventListener(
              "slideChanged",
              debounce(this.onSlideChanged.bind(this), 500),
            ),
            this.elements.thumbnails
              .querySelectorAll("[data-target]")
              .forEach((mediaToSwitch) => {
                mediaToSwitch
                  .querySelector("button")
                  .addEventListener(
                    "click",
                    this.setActiveMedia.bind(
                      this,
                      mediaToSwitch.dataset.target,
                      !1,
                      !0,
                    ),
                  );
              }),
            this.dataset.desktopLayout.includes("thumbnail") &&
              this.mql.matches &&
              this.removeListSemantic(),
            this.elements.viewer.addEventListener(
              "slideChanged",
              debounce(this.onSlideChanged.bind(this), 500),
            )));
      }
      connectedCallback() {
        (this.updateVariantImages(),
          this.addEventListener(
            "variant-change",
            this.handleQuarterlyAltImages.bind(this),
          ));
      }
      handleQuarterlyAltImagesOnLoad() {
        const selectedVariant = this.selectedVariant;
        if (!selectedVariant) {
          console.log("[VariantAltImage] No selected variant found");
          return;
        }
        const variantId = selectedVariant.id,
          altImages =
            window.variantAltImages || window.quarterlyVariantAltImages || {},
          hasAltImage = altImages[variantId],
          altImageUrl = hasAltImage ? altImages[variantId] : null;
        (console.log(
          "[VariantAltImage] Handling variant:",
          variantId,
          "option1:",
          selectedVariant.option1,
          "option2:",
          selectedVariant.option2,
        ),
          console.log(
            "[VariantAltImage] hasAltImage:",
            !!hasAltImage,
            "altImageUrl:",
            altImageUrl,
          ),
          console.log(
            "[VariantAltImage] Available alt images:",
            Object.keys(altImages),
          ));
        const altSlide = this.querySelector(
            '[data-quarterly-alt-slide="true"]',
          ),
          altThumbnail = this.elements.thumbnails?.querySelector(
            '[data-quarterly-alt-thumbnail="true"]',
          );
        console.log(
          "[VariantAltImage] altSlide found:",
          !!altSlide,
          "altThumbnail found:",
          !!altThumbnail,
        );
        const altPopupSlide = document
          .querySelector(".Product_popup_slider")
          ?.querySelector('[data-quarterly-alt-popup-slide="true"]');
        if (hasAltImage && altImageUrl) {
          if (
            (console.log(
              "[VariantAltImage] Showing alt image, HIDING all other first-position images",
            ),
            altSlide)
          ) {
            const img = altSlide.querySelector("img");
            (img &&
              ((img.src = altImageUrl),
              (img.srcset = `${altImageUrl.replace("1946", "493")} 493w, ${altImageUrl.replace("1946", "823")} 823w, ${altImageUrl.replace("1946", "1100")} 1100w, ${altImageUrl.replace("1946", "1426")} 1426w, ${altImageUrl} 1946w`)),
              (altSlide.style.display = ""),
              altSlide.classList.add("is-active"));
          }
          if (altThumbnail) {
            const thumbImg = altThumbnail.querySelector("img");
            if (thumbImg) {
              const thumbUrl = altImageUrl.replace("1946", "416");
              ((thumbImg.src = thumbUrl),
                (thumbImg.srcset = `${altImageUrl.replace("1946", "54")} 54w, ${altImageUrl.replace("1946", "74")} 74w, ${altImageUrl.replace("1946", "104")} 104w, ${altImageUrl.replace("1946", "162")} 162w, ${altImageUrl.replace("1946", "208")} 208w, ${altImageUrl.replace("1946", "324")} 324w, ${altImageUrl.replace("1946", "416")} 416w`),
                console.log(
                  "[VariantAltImage] Updated thumbnail image to:",
                  thumbUrl,
                ));
            }
            altThumbnail.style.display = "";
            const btn = altThumbnail.querySelector("button");
            btn && btn.setAttribute("aria-current", "true");
          }
          this.querySelectorAll(".slider__slide").forEach((slide) => {
            slide !== altSlide &&
              slide.dataset.quarterlyAltSlide !== "true" &&
              (slide.classList.contains("is-active") ||
                slide === this.querySelector(".slider__slide:first-child")) &&
              ((slide.style.display = "none"),
              slide.classList.remove("is-active"),
              console.log(
                "[VariantAltImage] Hiding variant slide:",
                slide.dataset.mediaId,
              ));
          });
          const firstThumbnail = this.elements.thumbnails?.querySelector(
            ".thumbnail-list__item:first-child",
          );
          if (
            firstThumbnail &&
            firstThumbnail !== altThumbnail &&
            firstThumbnail.dataset.quarterlyAltThumbnail !== "true"
          ) {
            firstThumbnail.style.display = "none";
            const btn = firstThumbnail.querySelector("button");
            (btn && btn.removeAttribute("aria-current"),
              console.log(
                "[VariantAltImage] Hiding first thumbnail (prepended variant)",
              ));
          }
          if (
            (this.elements.thumbnails
              ?.querySelectorAll(".thumbnail-list__item")
              .forEach((thumb) => {
                if (
                  thumb === altThumbnail ||
                  thumb.dataset.quarterlyAltThumbnail === "true"
                )
                  return;
                const btn = thumb.querySelector("button");
                btn &&
                  btn.getAttribute("aria-current") === "true" &&
                  btn.removeAttribute("aria-current");
              }),
            altPopupSlide)
          ) {
            const popupImg = altPopupSlide.querySelector("img");
            (popupImg &&
              ((popupImg.src = altImageUrl),
              (popupImg.srcset = `${altImageUrl.replace("1946", "493")} 493w, ${altImageUrl.replace("1946", "823")} 823w, ${altImageUrl.replace("1946", "1100")} 1100w, ${altImageUrl.replace("1946", "1426")} 1426w, ${altImageUrl} 1946w`)),
              (altPopupSlide.style.display = ""));
          }
        } else {
          if (
            (console.log(
              "[VariantAltImage] No alt image - hiding alt elements, restoring normal display",
            ),
            altSlide &&
              ((altSlide.style.display = "none"),
              altSlide.classList.remove("is-active")),
            altThumbnail)
          ) {
            altThumbnail.style.display = "none";
            const btn = altThumbnail.querySelector("button");
            btn && btn.removeAttribute("aria-current");
          }
          altPopupSlide && (altPopupSlide.style.display = "none");
          const firstThumbnail = this.elements.thumbnails?.querySelector(
            ".thumbnail-list__item:first-child",
          );
          firstThumbnail &&
            firstThumbnail !== altThumbnail &&
            firstThumbnail.style.display === "none" &&
            ((firstThumbnail.style.display = ""),
            console.log(
              "[VariantAltImage] Restoring first thumbnail visibility",
            ));
          const firstSlide = this.querySelector(".slider__slide:first-child");
          firstSlide &&
            firstSlide !== altSlide &&
            firstSlide.style.display === "none" &&
            ((firstSlide.style.display = ""),
            console.log("[VariantAltImage] Restoring first slide visibility"));
        }
      }
      handleQuarterlyAltImages() {
        (this.handleQuarterlyAltImagesOnLoad(),
          this.elements.viewer?.slider &&
            this.elements.viewer.slider.scrollTo({ left: 0 }),
          this.elements.thumbnails?.slider &&
            this.elements.thumbnails.slider.scrollTo({ left: 0 }));
      }
      onSlideChanged(event) {
        const thumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${event.detail.currentElement.dataset.mediaId}"]`,
        );
        this.setActiveThumbnail(thumbnail);
      }
      updateVariantImages() {
        this.handleQuarterlyAltImagesOnLoad();
        const selectedVariant = this.selectedVariant,
          altImages =
            window.variantAltImages || window.quarterlyVariantAltImages || {};
        if (selectedVariant && altImages[selectedVariant.id]) {
          console.log(
            "[VariantAltImage] Alt image active - skipping normal display logic",
          );
          return;
        }
        (this.elements.thumbnails
          .querySelectorAll("[data-target]")
          .forEach((thumbnail) => {
            thumbnail.getAttribute("thumbnail_alt") === "Quarterly" ||
              thumbnail.dataset.hiddenForQuarterly === "true" ||
              this.updateDisplay(thumbnail);
          }),
          this.elements.viewer.slider
            .querySelectorAll("[thumbnail_alt]")
            .forEach((slide) => {
              slide.getAttribute("thumbnail_alt") === "Quarterly" ||
                slide.dataset.hiddenForQuarterly === "true" ||
                (window.innerWidth <= 768 && this.updateDisplay(slide));
            }));
        const visibleThumbnails = Array.from(
            this.elements.thumbnails.querySelectorAll("[data-target]"),
          ).filter((el) => el.style.display !== "none"),
          visibleSlides = Array.from(
            this.elements.viewer.querySelectorAll("[thumbnail_alt]"),
          ).filter((el) => el.style.display !== "none");
        (this.elements.thumbnails &&
          this.elements.thumbnails.slider &&
          (setTimeout(() => {
            const slider2 = this.elements.thumbnails.slider;
            slider2.scrollTo({ left: 0, behavior: "smooth" });
            const _ = slider2.offsetWidth;
          }, 100),
          setTimeout(() => {
            this.elements.thumbnails.resetPages &&
              this.elements.thumbnails.resetPages();
            const thumbnailButtons =
              this.elements.thumbnails.querySelectorAll(".slider-button");
            thumbnailButtons &&
              thumbnailButtons.length &&
              (visibleThumbnails.length <= 3
                ? thumbnailButtons.forEach((btn) =>
                    btn.classList.add("small-hide"),
                  )
                : thumbnailButtons.forEach((btn) =>
                    btn.classList.remove("small-hide"),
                  ),
              visibleThumbnails.length <= 4
                ? thumbnailButtons.forEach((btn) =>
                    btn.classList.add("medium-hide", "large-up-hide"),
                  )
                : thumbnailButtons.forEach((btn) =>
                    btn.classList.remove("medium-hide", "large-up-hide"),
                  ));
          }, 50)),
          this.elements.viewer &&
            this.elements.viewer.slider &&
            (this.elements.viewer.slider.scrollTo({ left: 0 }),
            setTimeout(() => {
              this.elements.viewer.resetPages &&
                this.elements.viewer.resetPages();
              const mainSliderButtons =
                this.elements.viewer.querySelector(".slider-buttons");
              if (mainSliderButtons) {
                visibleSlides.length <= 1
                  ? mainSliderButtons.classList.add("small-hide")
                  : mainSliderButtons.classList.remove("small-hide");
                const totalCounter = mainSliderButtons.querySelector(
                  ".slider-counter--total",
                );
                totalCounter &&
                  (totalCounter.textContent = visibleSlides.length);
              }
            }, 50)),
          document.addEventListener("click", (event) => {
            const closeButton = event.target.closest('[id^="ModalClose-"]'),
              modal = document.querySelector("product-modal");
            closeButton && modal && modal.hide();
          }));
      }
      updateDisplay(element) {
        const alt = element.getAttribute("thumbnail_alt");
        if (
          alt === "Quarterly" ||
          element.dataset.hiddenForQuarterly === "true"
        )
          return;
        const [imageAlt, others] =
          alt && alt.includes("|")
            ? alt.split("|").map((part) => part.trim())
            : [alt, null];
        if (this.dataset.nutritionKitchen === "true") {
          const selectedFormat = this.selectedVariant?.option1;
          if (selectedFormat && imageAlt) {
            const selectedFormatLower = selectedFormat.toLowerCase(),
              imageAltLower = imageAlt.toLowerCase(),
              isSachetFormat =
                selectedFormatLower.includes("sachet") ||
                selectedFormatLower.includes("single"),
              isJarFormat =
                selectedFormatLower.includes("jar") ||
                selectedFormatLower.includes("forever");
            let shouldShow = !1;
            (isSachetFormat
              ? (shouldShow = !imageAltLower.includes("jar"))
              : isJarFormat && (shouldShow = imageAltLower.includes("jar")),
              (element.style.display = shouldShow ? "block" : "none"));
          }
          return;
        }
        const { oneTimePurchase } = window.storeConstants,
          oneTimePurchaseChecked =
            this.selectedVariant?.option2 === oneTimePurchase;
        imageAlt !== window.item?.Name &&
          (oneTimePurchaseChecked
            ? (element.style.display =
                imageAlt === this.selectedVariant?.option1 &&
                others !== "specification"
                  ? "block"
                  : "none")
            : imageAlt === this.selectedVariant?.option1
              ? (element.style.display =
                  others === null || others === "specification"
                    ? "block"
                    : "none")
              : (element.style.display = "none"));
      }
      get selectedVariant() {
        if (this.currentVariant) return this.currentVariant;
        const selectedVariant = this.closest("product-info").querySelector(
          "variant-selects [data-selected-variant]",
        )?.innerHTML;
        return selectedVariant ? JSON.parse(selectedVariant) : null;
      }
      setActiveMedia(mediaId, prepend, scrollToTop) {
        const activeMedia =
          this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`) ||
          this.elements.viewer.querySelector("[data-media-id]");
        if (!activeMedia) return;
        if (
          (this.elements.viewer
            .querySelectorAll("[data-media-id]")
            .forEach((element) => {
              element.classList.remove("is-active");
            }),
          activeMedia?.classList?.add("is-active"),
          activeMedia?.style?.display === "none" &&
            (activeMedia.style.display = ""),
          this.presizePopupSlider(mediaId),
          prepend)
        ) {
          if (
            (activeMedia.parentElement.firstChild !== activeMedia &&
              activeMedia.parentElement.prepend(activeMedia),
            this.elements.thumbnails)
          ) {
            const activeThumbnail2 = this.elements.thumbnails.querySelector(
              `[data-target="${mediaId}"]`,
            );
            activeThumbnail2.parentElement.firstChild !== activeThumbnail2 &&
              activeThumbnail2.parentElement.prepend(activeThumbnail2);
          }
          this.elements.viewer.slider && this.elements.viewer.resetPages();
        }
        if (
          (this.preventStickyHeader(),
          window.setTimeout(() => {
            (!this.mql.matches || this.elements.thumbnails) &&
              activeMedia.parentElement.scrollTo({
                left: activeMedia.offsetLeft,
              });
            const activeMediaRect = activeMedia.getBoundingClientRect();
            if (activeMediaRect.top > -0.5 || !scrollToTop) return;
            const top = activeMediaRect.top + window.scrollY;
            window.scrollTo({ top, behavior: "smooth" });
          }),
          this.playActiveMedia(activeMedia),
          !this.elements.thumbnails)
        )
          return;
        const activeThumbnail = this.elements.thumbnails.querySelector(
          `[data-target="${mediaId}"]`,
        );
        (this.setActiveThumbnail(activeThumbnail),
          this.announceLiveRegion(
            activeMedia,
            activeThumbnail.dataset.mediaPosition,
          ));
      }
      setActiveThumbnail(thumbnail) {
        !this.elements.thumbnails ||
          !thumbnail ||
          (this.elements.thumbnails
            .querySelectorAll("button")
            .forEach((element) => element.removeAttribute("aria-current")),
          thumbnail.querySelector("button").setAttribute("aria-current", !0),
          !this.elements.thumbnails.isSlideVisible(thumbnail, 10) &&
            this.elements.thumbnails.slider.scrollTo({
              left: thumbnail.offsetLeft,
            }));
      }
      announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector(
          ".product__modal-opener--image img",
        );
        image &&
          ((image.onload = () => {
            (this.elements.liveRegion.setAttribute("aria-hidden", !1),
              (this.elements.liveRegion.innerHTML =
                window.accessibilityStrings.imageAvailable.replace(
                  "[index]",
                  position,
                )),
              setTimeout(() => {
                this.elements.liveRegion.setAttribute("aria-hidden", !0);
              }, 2e3));
          }),
          (image.src = image.src));
      }
      playActiveMedia(activeItem) {
        window.pauseAllMedia();
        const deferredMedia = activeItem.querySelector(".deferred-media");
        deferredMedia && deferredMedia.loadContent(!1);
      }
      preventStickyHeader() {
        ((this.stickyHeader =
          this.stickyHeader || document.querySelector("sticky-header")),
          this.stickyHeader &&
            this.stickyHeader.dispatchEvent(new Event("preventHeaderReveal")));
      }
      removeListSemantic() {
        this.elements.viewer.slider &&
          (this.elements.viewer.slider.setAttribute("role", "presentation"),
          this.elements.viewer.sliderItems.forEach((slide) =>
            slide.setAttribute("role", "presentation"),
          ));
      }
      presizePopupSlider(mediaId) {
        if (!document.querySelector(".Product_popup_slider")) return;
        console.log(
          `Media gallery triggering presize for media ID: ${mediaId}`,
        );
        const productModal = document.querySelector("product-modal");
        if (productModal && productModal.masterPresizeSystem) {
          const fakeOpener = {
            getAttribute: (attr) => (attr === "data-media-id" ? mediaId : null),
          };
          productModal.masterPresizeSystem(fakeOpener);
        } else this.directPresizing(mediaId);
      }
      directPresizing(mediaId) {
        const popupSlider = document.querySelector(".Product_popup_slider");
        if (!popupSlider) return;
        const allSlides = popupSlider.querySelectorAll(".swiper-slide"),
          isMobile = window.innerWidth <= 749;
        (allSlides.forEach((slide, index) => {
          const slideMediaId = slide
              .querySelector("[data-media-id]")
              ?.getAttribute("data-media-id"),
            img = slide.querySelector("img");
          if (!img) return;
          if (
            img.classList.contains(
              "global-media-settings--supplement-enlarged",
            ) &&
            slideMediaId === mediaId
          ) {
            const targetHeight = isMobile ? "83vh" : "95vh";
            (slide.style.setProperty("height", targetHeight, "important"),
              img.style.setProperty("object-fit", "cover", "important"),
              img.style.setProperty("object-position", "center", "important"),
              img.style.setProperty("width", "100%", "important"),
              img.style.setProperty("height", "100%", "important"),
              img.style.setProperty("max-width", "100%", "important"),
              img.style.setProperty("max-height", "100%", "important"),
              slide.style.setProperty("padding", "0", "important"),
              slide.style.setProperty("box-sizing", "border-box", "important"),
              console.log(
                `FALLBACK: Pre-sized enlarged slide ${index} to ${targetHeight}`,
              ));
          } else this.calculateOptimalHeightForImage(slide, img);
        }),
          popupSlider.swiper &&
            (popupSlider.swiper.updateSize(),
            popupSlider.swiper.updateSlides()));
      }
      calculateOptimalHeightForImage(slide, img) {
        const calculateHeight = () => {
          if (img.naturalWidth && img.naturalHeight) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            let calculatedHeight =
              (slide.offsetWidth || window.innerWidth * 0.9) / aspectRatio;
            const minHeight = window.innerHeight * 0.3,
              maxHeight = window.innerHeight * 0.7;
            ((calculatedHeight = Math.max(
              minHeight,
              Math.min(calculatedHeight, maxHeight),
            )),
              slide.style.setProperty(
                "height",
                `${calculatedHeight}px`,
                "important",
              ),
              img.style.setProperty("object-fit", "contain", "important"),
              img.style.setProperty("object-position", "center", "important"),
              img.style.setProperty("width", "100%", "important"),
              img.style.setProperty("height", "100%", "important"),
              img.style.setProperty("max-width", "100%", "important"),
              img.style.setProperty("max-height", "100%", "important"),
              slide.style.setProperty("padding", "0", "important"),
              slide.style.setProperty("box-sizing", "border-box", "important"));
          }
        };
        img.complete && img.naturalWidth
          ? calculateHeight()
          : (img.onload = calculateHeight);
      }
    },
  );
//# sourceMappingURL=/cdn/shop/t/121/assets/media-gallery.js.map?v=60583854866485040501768214224
