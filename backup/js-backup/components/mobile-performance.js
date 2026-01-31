(function () {
  "use strict";
  const isMobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
    isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory < 2,
    isReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!isMobile || isReducedMotion) return;
  const MobileOptimizer = {
    cache: new Set(),
    isPreloading: !1,
    maxCacheSize: isLowEndDevice ? 5 : 20,
    errorCount: 0,
    maxErrors: 3,
    networkInfo: { saveData: !1, effectiveType: "4g", isOnline: !0 },
    isInitialized: !1,
    hasErrors: !1,
    init() {
      try {
        if (this.isInitialized) return;
        if (
          (console.log("\u{1F680} Mobile Optimizer: Safe initialization..."),
          !this.checkDeviceCapability())
        ) {
          console.log("\u{1F4F1} Device not suitable for optimization");
          return;
        }
        (this.safeBoostINP(),
          this.safeOptimizeCriticalImages(),
          isLowEndDevice ||
            (this.safeTouchPrefetching(),
            this.safeViewportPrefetching(),
            this.instantCriticalPathPrefetch()),
          this.safeNetworkMonitoring(),
          this.installLongTaskBreaker(),
          this.initSafeCleanup(),
          (this.isInitialized = !0),
          console.log("\u26A1 Mobile Optimizer: Safely active!"));
      } catch (error) {
        (console.warn("\u274C Mobile Optimizer initialization failed:", error),
          this.handleError(error));
      }
    },
    checkDeviceCapability() {
      try {
        return !(
          !document.querySelector ||
          !document.addEventListener ||
          (navigator.deviceMemory && navigator.deviceMemory < 1) ||
          !Array.from ||
          !Promise
        );
      } catch {
        return !1;
      }
    },
    safeBoostINP() {
      try {
        const existingStyle = document.documentElement.style.cssText;
        ((document.documentElement.style.cssText =
          existingStyle +
          `
          -webkit-overflow-scrolling: touch;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        `),
          this.safeOptimizeInteractiveElements(),
          this.safeOptimizeInputs(),
          this.injectTouchActionCSS(),
          this.deferThirdPartyWork(),
          this.optimizeScrollHandlers());
      } catch (error) {
        (console.warn("\u274C INP boost failed:", error),
          this.handleError(error));
      }
    },
    injectTouchActionCSS() {
      try {
        if (document.getElementById("inp-touch-optimization")) return;
        const style = document.createElement("style");
        ((style.id = "inp-touch-optimization"),
          (style.textContent = `
          html,body,a,button,input,select,textarea,label,summary,
          [role="button"],[role="link"],[tabindex]{
            touch-action:manipulation
          }
        `),
          document.head.appendChild(style));
      } catch {}
    },
    deferThirdPartyWork() {
      try {
        ((window.__yieldToMain = () =>
          new Promise((resolve) => {
            "scheduler" in window && "yield" in window.scheduler
              ? window.scheduler.yield().then(resolve)
              : setTimeout(resolve, 0);
          })),
          (window.__idleCallback = (callback, options = {}) =>
            "requestIdleCallback" in window
              ? requestIdleCallback(callback, {
                  timeout: options.timeout || 2e3,
                })
              : setTimeout(callback, 1)));
        const forcePassive = ["touchstart", "touchmove", "wheel", "mousewheel"],
          originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (
          type,
          listener,
          options,
        ) {
          let newOptions = options;
          return (
            forcePassive.includes(type) &&
              (typeof options == "boolean"
                ? (newOptions = { capture: options, passive: !0 })
                : typeof options == "object"
                  ? options.passive === void 0 &&
                    (newOptions = { ...options, passive: !0 })
                  : (newOptions = { passive: !0 })),
            originalAddEventListener.call(this, type, listener, newOptions)
          );
        };
      } catch {}
    },
    optimizeScrollHandlers() {
      try {
        let scrollTimeout;
        window.__isScrolling = !1;
        const onScroll = () => {
          ((window.__isScrolling = !0),
            clearTimeout(scrollTimeout),
            (scrollTimeout = setTimeout(() => {
              window.__isScrolling = !1;
            }, 100)));
        };
        (window.addEventListener("scroll", onScroll, {
          passive: !0,
          capture: !1,
        }),
          (window.__checkScrolling = () => window.__isScrolling));
      } catch {}
    },
    safeOptimizeInteractiveElements() {
      try {
        const elements = document.querySelectorAll(
          'button, [role="button"], .btn, input[type="submit"], input[type="button"], a[href]',
        );
        if (!elements || elements.length === 0) return;
        Array.from(elements)
          .slice(0, 100)
          .forEach((el) => {
            try {
              (el.style.touchAction !== "manipulation" &&
                (el.style.touchAction = "manipulation"),
                el.style.cursor !== "pointer" && (el.style.cursor = "pointer"));
            } catch {}
          });
      } catch (error) {
        this.handleError(error);
      }
    },
    safeOptimizeInputs() {
      try {
        const inputs = document.querySelectorAll("input, select, textarea");
        if (!inputs || inputs.length === 0) return;
        Array.from(inputs)
          .slice(0, 50)
          .forEach((input) => {
            try {
              const type = input.type;
              if (type === "range" || type === "color" || type === "file")
                return;
              const currentFontSize = window.getComputedStyle(input).fontSize;
              parseFloat(currentFontSize) < 16 &&
                (input.style.fontSize = "16px");
            } catch {}
          });
      } catch (error) {
        this.handleError(error);
      }
    },
    safeOptimizeCriticalImages() {
      try {
        const images = document.querySelectorAll("img[src]");
        if (!images || images.length === 0) return;
        const viewportImages = Array.from(images)
          .filter((img) => {
            try {
              const rect = img.getBoundingClientRect();
              return (
                rect.top >= -100 &&
                rect.top < window.innerHeight &&
                rect.width > 100
              );
            } catch {
              return !1;
            }
          })
          .slice(0, 5);
        if (viewportImages.length === 0) return;
        const lcpImage = this.findLCPImageSafely(viewportImages);
        (lcpImage && this.optimizeImageSafely(lcpImage, !0),
          viewportImages.slice(1, 3).forEach((img) => {
            this.optimizeImageSafely(img, !1);
          }));
      } catch (error) {
        (console.warn("\u274C Image optimization failed:", error),
          this.handleError(error));
      }
    },
    findLCPImageSafely(images) {
      try {
        return images.reduce((largest, img) => {
          try {
            const rect = img.getBoundingClientRect(),
              largestRect = largest.getBoundingClientRect();
            return rect.width * rect.height >
              largestRect.width * largestRect.height
              ? img
              : largest;
          } catch {
            return largest;
          }
        });
      } catch {
        return images[0] || null;
      }
    },
    optimizeImageSafely(img, isLCP) {
      try {
        if (
          !img ||
          !img.src ||
          (img.loading === "eager" && img.fetchPriority === "high")
        )
          return;
        ((img.loading = "eager"),
          "fetchPriority" in img && (img.fetchPriority = "high"),
          img.decode &&
            typeof img.decode == "function" &&
            img.decode().catch(() => {}),
          isLCP && this.preloadImageSafely(img.src));
      } catch {}
    },
    preloadImageSafely(src) {
      try {
        if (!src || this.cache.has(src)) return;
        const link = document.createElement("link");
        ((link.rel = "preload"),
          (link.as = "image"),
          (link.href = src),
          (link.onerror = () => {
            link.parentNode && link.parentNode.removeChild(link);
          }),
          document.head.appendChild(link),
          this.cache.add(src));
      } catch {}
    },
    safeTouchPrefetching() {
      try {
        if (!("ontouchstart" in window)) return;
        document.addEventListener(
          "touchstart",
          (e) => {
            try {
              if (this.hasErrors || this.errorCount >= this.maxErrors) return;
              const link = e.target.closest("a[href]");
              if (!link || this.isPreloading) return;
              this.shouldPrefetchSafely(link.href) &&
                this.isConnectionSafe() &&
                this.prefetchPageSafely(link.href, "touch");
            } catch {}
          },
          { passive: !0 },
        );
      } catch (error) {
        (console.warn("\u274C Touch prefetching failed:", error),
          this.handleError(error));
      }
    },
    safeViewportPrefetching() {
      try {
        if (!("IntersectionObserver" in window) || isLowEndDevice) return;
        const observer = new IntersectionObserver(
            (entries) => {
              try {
                if (this.hasErrors) return;
                entries.forEach((entry) => {
                  try {
                    if (entry.isIntersecting) {
                      const link = entry.target.closest("a[href]");
                      link &&
                        this.shouldPrefetchSafely(link.href) &&
                        this.isConnectionSafe() &&
                        setTimeout(() => {
                          this.prefetchPageSafely(link.href, "viewport");
                        }, 200);
                    }
                  } catch {}
                });
              } catch {
                observer.disconnect();
              }
            },
            { rootMargin: "100px", threshold: 0.1 },
          ),
          links = document.querySelectorAll("a[href]");
        Array.from(links)
          .filter((link) => this.isHighPriorityLinkSafely(link))
          .slice(0, 15)
          .forEach((link) => {
            try {
              observer.observe(link);
            } catch {}
          });
      } catch (error) {
        (console.warn("\u274C Viewport prefetching failed:", error),
          this.handleError(error));
      }
    },
    isConnectionSafe() {
      try {
        const { saveData, effectiveType, isOnline } = this.networkInfo;
        if (
          !isOnline ||
          saveData ||
          effectiveType === "2g" ||
          effectiveType === "slow-2g"
        )
          return !1;
        const maxCache =
          effectiveType === "4g" ? this.maxCacheSize + 5 : this.maxCacheSize;
        return !(this.cache.size >= maxCache);
      } catch {
        return !1;
      }
    },
    shouldPrefetchSafely(href) {
      try {
        if (
          !href ||
          typeof href != "string" ||
          this.cache.has(href) ||
          this.cache.size >= this.maxCacheSize
        )
          return !1;
        const url = new URL(href);
        return (
          url.origin === location.origin &&
          !url.href.includes("#") &&
          !url.href.includes("mailto:") &&
          !url.href.includes("tel:") &&
          !url.pathname.includes("/account") &&
          !url.pathname.includes("/logout")
        );
      } catch {
        return !1;
      }
    },
    isHighPriorityLinkSafely(link) {
      try {
        if (!link || !link.href) return !1;
        const href = link.href,
          classes = (link.className || "").toLowerCase(),
          text = (link.textContent || "").toLowerCase();
        return !!(
          href.includes("/cart") ||
          href.includes("/checkout") ||
          href.includes("/products/") ||
          href.includes("/collections/") ||
          classes.includes("btn") ||
          classes.includes("button") ||
          text.includes("shop") ||
          text.includes("buy")
        );
      } catch {
        return !1;
      }
    },
    prefetchPageSafely(href, source) {
      try {
        if (
          !href ||
          this.cache.has(href) ||
          this.isPreloading ||
          this.hasErrors ||
          this.errorCount >= this.maxErrors
        )
          return;
        this.isPreloading = !0;
        const link = document.createElement("link");
        ((link.rel = "preload"),
          (link.href = href),
          (link.as = "document"),
          (link.onload = () => {
            (this.cache.add(href),
              console.log(`\u26A1 Lightning prefetch (${source}):`, href),
              (this.isPreloading = !1));
          }),
          (link.onerror = () => {
            (console.warn("\u274C Prefetch failed:", href),
              this.handleError(new Error("Prefetch failed")),
              link.parentNode && link.parentNode.removeChild(link),
              (this.isPreloading = !1));
          }),
          document.head.appendChild(link),
          setTimeout(() => {
            this.isPreloading = !1;
          }, 3e3));
      } catch (error) {
        ((this.isPreloading = !1), this.handleError(error));
      }
    },
    instantCriticalPathPrefetch() {
      try {
        if (!this.isConnectionSafe()) return;
        const currentPath = location.pathname,
          criticalPaths = [];
        (currentPath === "/" || currentPath === ""
          ? criticalPaths.push(
              "/collections/all",
              "/products/daily-ultimate-essentials",
            )
          : (currentPath.includes("/products/") ||
              currentPath.includes("/collections/")) &&
            criticalPaths.push("/cart"),
          criticalPaths.slice(0, 2).forEach((path) => {
            const fullPath = location.origin + path;
            this.shouldPrefetchSafely(fullPath) &&
              setTimeout(() => {
                this.prefetchPageSafely(fullPath, "critical");
              }, 100);
          }));
      } catch {}
    },
    safeNetworkMonitoring() {
      try {
        if ("connection" in navigator && navigator.connection) {
          const updateConnection = () => {
            try {
              ((this.networkInfo.saveData =
                navigator.connection.saveData || !1),
                (this.networkInfo.effectiveType =
                  navigator.connection.effectiveType || "4g"));
            } catch {}
          };
          (navigator.connection.addEventListener("change", updateConnection),
            updateConnection());
        }
        (window.addEventListener("online", () => {
          ((this.networkInfo.isOnline = !0),
            console.log("\u{1F4F6} Connection restored"));
        }),
          window.addEventListener("offline", () => {
            ((this.networkInfo.isOnline = !1),
              console.log("\u{1F4F5} Connection lost"));
          }));
      } catch {}
    },
    installLongTaskBreaker() {
      try {
        if (!("PerformanceObserver" in window)) return;
        let isInteracting = !1,
          interactionTimeout;
        const markInteractionStart = () => {
          ((isInteracting = !0),
            clearTimeout(interactionTimeout),
            (interactionTimeout = setTimeout(() => {
              isInteracting = !1;
            }, 100)));
        };
        if (
          (document.addEventListener("pointerdown", markInteractionStart, {
            passive: !0,
            capture: !0,
          }),
          document.addEventListener("keydown", markInteractionStart, {
            passive: !0,
            capture: !0,
          }),
          (window.__isUserInteracting = () => isInteracting),
          window.location.hostname === "localhost" ||
            window.location.hostname.includes("preview"))
        ) {
          const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries())
              entry.duration > 100 &&
                isInteracting &&
                console.warn(
                  `\u26A0\uFE0F Long task during interaction: ${entry.duration.toFixed(0)}ms`,
                );
          });
          try {
            longTaskObserver.observe({ type: "longtask", buffered: !1 });
          } catch {}
        }
        window.__breakLongTask = async () => {
          "scheduler" in window && "yield" in window.scheduler
            ? await window.scheduler.yield()
            : await new Promise((resolve) => setTimeout(resolve, 0));
        };
      } catch {}
    },
    initSafeCleanup() {
      try {
        const cleanup = () => {
          try {
            const links = document.querySelectorAll(
              'link[rel="prefetch"], link[rel="preload"]',
            );
            links.length > this.maxCacheSize &&
              Array.from(links)
                .slice(0, links.length - this.maxCacheSize)
                .forEach((link) => {
                  try {
                    link.parentNode && link.parentNode.removeChild(link);
                  } catch {}
                });
          } catch {}
        };
        (setInterval(cleanup, 3e5),
          window.addEventListener("beforeunload", cleanup, { once: !0 }));
      } catch {}
    },
    handleError(error) {
      (this.errorCount++,
        this.errorCount >= this.maxErrors &&
          ((this.hasErrors = !0),
          console.warn("\u{1F6D1} Mobile Optimizer disabled due to errors"),
          (this.isPreloading = !1),
          this.cache.clear()));
    },
  };
  try {
    document.readyState === "loading"
      ? document.addEventListener(
          "DOMContentLoaded",
          () => {
            try {
              MobileOptimizer.init();
            } catch (error) {
              console.warn(
                "\u274C Mobile Optimizer failed to initialize:",
                error,
              );
            }
          },
          { once: !0 },
        )
      : MobileOptimizer.init();
  } catch (error) {
    console.warn("\u274C Mobile Optimizer script error:", error);
  }
})();
//# sourceMappingURL=/cdn/shop/t/121/assets/mobile-performance.js.map?v=73409860031713592181768366441
