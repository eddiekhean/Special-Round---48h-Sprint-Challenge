(function () {
  "use strict";
  if (
    window.innerWidth < 768 ||
    "ontouchstart" in window ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    (navigator.deviceMemory && navigator.deviceMemory < 4) ||
    matchMedia("(prefers-reduced-motion)").matches
  )
    return;
  if (
    location.pathname.includes("/a/account") ||
    location.pathname.includes("/account") ||
    document.body.getAttribute("data-template")?.includes("account")
  ) {
    console.log(
      "\u{1F6AB} Page transitions completely disabled for customer portal",
    );
    return;
  }
  const PageTransitions = {
    config: {
      maxPreloads: 6,
      timeout: 5e3,
      intersectionThreshold: 0.2,
      heroImageTimeout: 100,
      backgroundImageTimeout: 5e3,
      instantTransitionTimeout: 80,
    },
    cache: { preloaded: new Set(), links: new Set() },
    observers: new Set(),
    isTransitioning: !1,
    init() {
      !document.body ||
        !fetch ||
        (document.addEventListener("mouseover", this.onHover, { passive: !0 }),
        document.addEventListener("click", this.onNavigate, { passive: !1 }),
        this.preloadCritical(),
        this.prefetchVisibleLinks(),
        this.setupImageLoading(),
        this.setupCleanup());
    },
    onHover: (e) => {
      const link = e.target.closest("a[href]");
      !link ||
        !PageTransitions.shouldPreload(link) ||
        PageTransitions.isTransitioning ||
        PageTransitions.preload(link.href, "high");
    },
    onNavigate: (e) => {
      const link = e.target.closest("a[href]");
      if (!(!link || e.button !== 0 || PageTransitions.isTransitioning))
        try {
          const url = new URL(link.href);
          if (
            url.pathname.includes("/a/account") ||
            url.pathname.includes("/account") ||
            location.pathname.includes("/a/account") ||
            location.pathname.includes("/account")
          ) {
            console.log(
              "\u{1F6AB} Page transitions disabled for customer portal",
            );
            return;
          }
          url.origin === location.origin &&
            !url.href.includes("#") &&
            (PageTransitions.isTransitioning = !0);
        } catch {}
    },
    shouldPreload(link) {
      try {
        const url = new URL(link.href);
        return (
          url.origin === location.origin &&
          !url.href.includes("#") &&
          !url.href.includes("mailto:") &&
          !url.href.includes("tel:") &&
          !url.pathname.includes("/a/account") &&
          !url.pathname.includes("/account") &&
          !PageTransitions.cache.preloaded.has(url.href) &&
          PageTransitions.cache.links.size < PageTransitions.config.maxPreloads
        );
      } catch {
        return !1;
      }
    },
    preload(href, priority = "low") {
      if (
        !href ||
        PageTransitions.cache.preloaded.has(href) ||
        PageTransitions.cache.links.size >= PageTransitions.config.maxPreloads
      )
        return;
      const link = document.createElement("link");
      ((link.rel = priority === "high" ? "preload" : "prefetch"),
        (link.href = href),
        priority === "high" && (link.as = "document"),
        (link.onerror = () => {
          PageTransitions.cleanup(link);
        }),
        document.head.appendChild(link),
        PageTransitions.cache.preloaded.add(href),
        PageTransitions.cache.links.add(link),
        setTimeout(
          () => PageTransitions.cleanup(link),
          PageTransitions.config.timeout,
        ));
    },
    ensureHeroImagesLoaded() {
      const allImages = document.querySelectorAll("img[src]"),
        heroImages = [];
      (Array.from(allImages).forEach((img) => {
        if (
          img.classList.contains("hero") ||
          img.closest(".hero") ||
          img.closest('[class*="hero"]') ||
          img.closest(".banner") ||
          img.closest('[class*="banner"]')
        )
          heroImages.push(img);
        else {
          const rect = img.getBoundingClientRect(),
            isHero = rect.top < 500 && rect.top > -100,
            isLarge = rect.width > 200 || rect.height > 200;
          isHero && isLarge && heroImages.push(img);
        }
      }),
        PageTransitions.processHeroImages(heroImages, allImages));
    },
    processHeroImages(heroImages, allImages) {
      if (heroImages.length === 0) {
        (PageTransitions.completeTransition(),
          PageTransitions.loadAllRemainingImages(allImages));
        return;
      }
      let loadedCount = 0;
      const totalHero = Math.min(heroImages.length, 3),
        criticalHeroImages = heroImages.slice(0, 3),
        timeoutId = setTimeout(() => {
          (PageTransitions.completeTransition(),
            PageTransitions.loadAllRemainingImages(allImages));
        }, PageTransitions.config.heroImageTimeout),
        checkComplete = () => {
          if ((loadedCount++, loadedCount >= totalHero)) {
            (clearTimeout(timeoutId), PageTransitions.completeTransition());
            const remainingImages = Array.from(allImages).filter(
              (img) => !criticalHeroImages.includes(img),
            );
            PageTransitions.loadAllRemainingImages(remainingImages);
          }
        };
      (criticalHeroImages.forEach((img) => {
        if (img.complete || img.naturalWidth > 0)
          img.decode && typeof img.decode == "function"
            ? img
                .decode()
                .catch(() => {})
                .finally(checkComplete)
            : checkComplete();
        else {
          const handleLoad = () => {
              (img.decode && typeof img.decode == "function"
                ? img
                    .decode()
                    .catch(() => {})
                    .finally(checkComplete)
                : checkComplete(),
                img.removeEventListener("load", handleLoad),
                img.removeEventListener("error", handleError));
            },
            handleError = () => {
              (setTimeout(() => {
                const newSrc = img.src;
                ((img.src = ""), (img.src = newSrc));
              }, 50),
                checkComplete(),
                img.removeEventListener("load", handleLoad),
                img.removeEventListener("error", handleError));
            };
          (img.addEventListener("load", handleLoad),
            img.addEventListener("error", handleError));
        }
      }),
        setTimeout(() => {
          PageTransitions.isTransitioning &&
            (PageTransitions.completeTransition(),
            PageTransitions.loadAllRemainingImages(allImages));
        }, PageTransitions.config.instantTransitionTimeout));
    },
    completeTransition() {
      PageTransitions.isTransitioning = !1;
    },
    loadAllRemainingImages(images) {
      if (images.length === 0) return;
      const visibleImages = images.filter(
          (img) => img.getBoundingClientRect().top < window.innerHeight + 500,
        ),
        invisibleImages = images.filter(
          (img) => img.getBoundingClientRect().top >= window.innerHeight + 500,
        );
      (this.loadImageBatch(visibleImages, 200),
        setTimeout(() => {
          this.loadImageBatch(invisibleImages, 500);
        }, 2e3));
    },
    loadImageBatch(images, interval) {
      let activeLoads = 0,
        imageIndex = 0;
      const loadNext = () => {
        if (imageIndex >= images.length || activeLoads >= 3) return;
        const img = images[imageIndex++];
        if (img.complete || img.naturalWidth > 0) {
          loadNext();
          return;
        }
        activeLoads++;
        const handleComplete = () => {
            (activeLoads--, setTimeout(loadNext, interval));
          },
          handleError = () => {
            (handleComplete(), img.removeEventListener("error", handleError));
          },
          handleLoad = () => {
            (handleComplete(), img.removeEventListener("load", handleLoad));
          };
        (img.addEventListener("load", handleLoad, { once: !0 }),
          img.addEventListener("error", handleError, { once: !0 }));
      };
      for (let i = 0; i < 3 && i < images.length; i++)
        setTimeout(loadNext, i * interval);
    },
    setupImageLoading() {
      const observer = new MutationObserver((mutations) => {
        PageTransitions.isTransitioning ||
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              node.nodeType === 1 && node.tagName === "IMG"
                ? PageTransitions.handleNewImage(node)
                : node.nodeType === 1 &&
                  node
                    .querySelectorAll?.("img[src]")
                    ?.forEach((img) => PageTransitions.handleNewImage(img));
            });
          });
      });
      (observer.observe(document.body, { childList: !0, subtree: !0 }),
        PageTransitions.observers.add(observer));
    },
    handleNewImage(img) {
      if (img.complete || img.naturalWidth > 0) return;
      const handleError = () => {
        (console.warn("Image failed to load:", img.src),
          img.removeEventListener("error", handleError));
      };
      img.addEventListener("error", handleError, { once: !0 });
    },
    preloadCritical() {
      requestIdleCallback?.(
        () => {
          const criticalPaths = [],
            currentPath = location.pathname;
          (currentPath.includes("/products/")
            ? criticalPaths.push("/cart")
            : currentPath === "/" && criticalPaths.push("/collections/all"),
            criticalPaths.slice(0, 2).forEach((path) => {
              PageTransitions.preload(location.origin + path, "high");
            }));
        },
        { timeout: 1e3 },
      );
    },
    prefetchVisibleLinks() {
      requestIdleCallback?.(
        () => {
          const links = document.querySelectorAll("a[href]");
          let prefetchCount = 0;
          const maxViewportPrefetch = 4;
          links.forEach((link) => {
            if (
              prefetchCount >= maxViewportPrefetch ||
              !PageTransitions.shouldPreload(link)
            )
              return;
            const rect = link.getBoundingClientRect();
            rect.top >= 0 &&
              rect.top <= window.innerHeight &&
              (PageTransitions.preload(link.href, "low"), prefetchCount++);
          });
        },
        { timeout: 2e3 },
      );
    },
    cleanup(link) {
      (link?.parentNode && link.parentNode.removeChild(link),
        PageTransitions.cache.links.delete(link));
    },
    setupCleanup() {
      (addEventListener(
        "beforeunload",
        () => {
          (PageTransitions.cache.links.forEach(PageTransitions.cleanup),
            PageTransitions.observers.forEach((observer) =>
              observer.disconnect(),
            ));
        },
        { once: !0 },
      ),
        document.addEventListener("visibilitychange", () => {
          document.hidden &&
            PageTransitions.cache.links.forEach(PageTransitions.cleanup);
        }));
    },
  };
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", PageTransitions.init, {
        once: !0,
      })
    : PageTransitions.init();
})();
//# sourceMappingURL=/cdn/shop/t/121/assets/page-transitions.js.map?v=40811460022224770221762185673
