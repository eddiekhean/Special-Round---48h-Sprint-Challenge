(function () {
  "use strict";
  const IMAGE_ALT_PATTERNS = {
    forbes: "As featured in Forbes",
    "mens-health": "As featured in Men's Health",
    today: "As featured in Today",
    fortune: "As featured in Fortune",
    "fast-company": "As featured in Fast Company",
    athletech: "As featured in Athletech News",
    yahoo: "As featured in Yahoo",
    "usa-today": "As featured in USA Today",
    essentials: "Daily Ultimate Essentials supplement",
    longevity: "Daily Ultimate Longevity supplement",
    beckham: "The Beckham Stack bundle",
    nsf: "NSF Certified for Sport",
    vegan: "Certified vegan",
    "gluten-free": "Gluten-free certified",
  };
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      (clearTimeout(timeout),
        (timeout = setTimeout(() => func.apply(this, args), wait)));
    };
  }
  function createAnnouncer() {
    if (document.getElementById("a11y-announcer")) return;
    const announcer = document.createElement("div");
    ((announcer.id = "a11y-announcer"),
      announcer.setAttribute("aria-live", "polite"),
      announcer.setAttribute("aria-atomic", "true"),
      document.body.appendChild(announcer));
  }
  function announce(message, priority) {
    const announcer = document.getElementById("a11y-announcer");
    announcer &&
      (announcer.setAttribute("aria-live", priority || "polite"),
      (announcer.textContent = ""),
      setTimeout(() => {
        announcer.textContent = message;
      }, 50));
  }
  function fixImageAltText() {
    document.querySelectorAll("img:not([alt])").forEach((img) => {
      const src = (img.src || img.dataset.src || "").toLowerCase(),
        filename = src.split("/").pop().split("?")[0];
      let altText = "";
      for (const [pattern, alt] of Object.entries(IMAGE_ALT_PATTERNS))
        if (filename.includes(pattern) || src.includes(pattern)) {
          altText = alt;
          break;
        }
      if (!altText) {
        const parent = img.closest("a, button, figure, .card");
        if (parent) {
          const heading = parent.querySelector(
            "h1, h2, h3, h4, h5, h6, .title, .name",
          );
          heading && (altText = heading.textContent.trim());
        }
      }
      if (
        filename.includes("background") ||
        filename.includes("pattern") ||
        filename.includes("divider") ||
        filename.includes("spacer") ||
        img.closest('[role="presentation"]')
      )
        img.setAttribute("alt", "");
      else if (altText) img.setAttribute("alt", altText.substring(0, 125));
      else {
        const fallback = filename
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .replace(/\d+/g, "")
          .trim();
        img.setAttribute("alt", fallback.length > 2 ? fallback : "");
      }
    });
  }
  function fixLinkAccessibility() {
    document.querySelectorAll("a[href]").forEach((link) => {
      if (
        link.getAttribute("aria-label") ||
        link.textContent.trim() ||
        link.querySelector('img[alt]:not([alt=""])') ||
        link.querySelector("[aria-label]") ||
        link.querySelector(".visually-hidden, .sr-only")
      )
        return;
      const href = link.getAttribute("href") || "";
      let label = "";
      if (
        (href === "/" || href.includes("home")
          ? (label = "Go to homepage")
          : href.includes("/products/")
            ? (label =
                "View " +
                href.split("/products/").pop().split("?")[0].replace(/-/g, " "))
            : href.includes("/collections/")
              ? (label =
                  "View " +
                  href
                    .split("/collections/")
                    .pop()
                    .split("?")[0]
                    .replace(/-/g, " ") +
                  " collection")
              : href.includes("facebook")
                ? (label = "Follow us on Facebook")
                : href.includes("instagram")
                  ? (label = "Follow us on Instagram")
                  : href.includes("twitter") || href.includes("x.com")
                    ? (label = "Follow us on Twitter")
                    : href.includes("tiktok")
                      ? (label = "Follow us on TikTok")
                      : href.includes("youtube")
                        ? (label = "Subscribe on YouTube")
                        : href.includes("mailto:")
                          ? (label = "Send email")
                          : href.includes("tel:") && (label = "Call us"),
        !label)
      ) {
        const card = link.closest(".card, .product-card, article");
        if (card) {
          const heading = card.querySelector(
            "h1, h2, h3, h4, h5, h6, .title, .name, .card__heading",
          );
          heading && (label = "View " + heading.textContent.trim());
        }
      }
      label && link.setAttribute("aria-label", label);
    });
  }
  function fixButtonAccessibility() {
    (document.querySelectorAll('button, [role="button"]').forEach((button) => {
      if (
        button.getAttribute("aria-label") ||
        button.textContent.trim() ||
        button.querySelector(".visually-hidden, .sr-only") ||
        !button.querySelector("svg")
      )
        return;
      const classes = button.className.toLowerCase();
      let label = "";
      (classes.includes("close") || classes.includes("dismiss")
        ? (label = "Close")
        : classes.includes("menu") || classes.includes("hamburger")
          ? (label = "Open menu")
          : classes.includes("search")
            ? (label = "Search")
            : classes.includes("cart")
              ? (label = "View cart")
              : classes.includes("plus") || classes.includes("increase")
                ? (label = "Increase quantity")
                : classes.includes("minus") || classes.includes("decrease")
                  ? (label = "Decrease quantity")
                  : classes.includes("prev")
                    ? (label = "Previous")
                    : classes.includes("next")
                      ? (label = "Next")
                      : classes.includes("play")
                        ? (label = "Play")
                        : classes.includes("pause") && (label = "Pause"),
        label && button.setAttribute("aria-label", label));
    }),
      document
        .querySelectorAll('button svg, a svg, [role="button"] svg')
        .forEach((svg) => {
          svg.getAttribute("aria-hidden") ||
            svg.setAttribute("aria-hidden", "true");
        }));
  }
  function fixFormAccessibility() {
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      if (
        input.getAttribute("aria-label") ||
        input.getAttribute("aria-labelledby") ||
        (input.id && document.querySelector(`label[for="${input.id}"]`)) ||
        input.type === "hidden"
      )
        return;
      let label = input.placeholder || input.name || "";
      ((label = label.replace(/[-_]/g, " ").trim()),
        label ||
          (label =
            {
              email: "Email address",
              password: "Password",
              search: "Search",
              tel: "Phone number",
            }[input.type] || ""),
        label && input.setAttribute("aria-label", label));
    });
  }
  function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const closeBtn = document.querySelector(
          '[role="dialog"][open] [class*="close"], .modal.active [class*="close"], .drawer.is-open [class*="close"], .drawer.active [class*="close"]',
        );
        closeBtn && closeBtn.click();
        const openDetails = document.querySelector("details[open]");
        openDetails && openDetails.removeAttribute("open");
      }
    });
  }
  function fixLandmarkRoles() {
    const main = document.querySelector(
      "main:not([role]), #MainContent:not([role])",
    );
    main && !main.getAttribute("role") && main.setAttribute("role", "main");
    const header = document.querySelector("header:not([role])");
    header &&
      !header.getAttribute("role") &&
      header.setAttribute("role", "banner");
    const footer = document.querySelector("footer:not([role])");
    (footer &&
      !footer.getAttribute("role") &&
      footer.setAttribute("role", "contentinfo"),
      document.querySelectorAll("nav:not([role])").forEach((nav) => {
        nav.setAttribute("role", "navigation");
      }));
  }
  function fixCarouselAccessibility() {
    (document
      .querySelectorAll(".swiper-button-prev:not([aria-label])")
      .forEach((btn) => {
        btn.setAttribute("aria-label", "Previous slide");
      }),
      document
        .querySelectorAll(".swiper-button-next:not([aria-label])")
        .forEach((btn) => {
          btn.setAttribute("aria-label", "Next slide");
        }),
      document
        .querySelectorAll(".swiper-pagination-bullet:not([aria-label])")
        .forEach((dot, i) => {
          dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        }));
  }
  function fixScrollableContent() {
    document
      .querySelectorAll(
        '[data-scroll], .optiscroll-content, [class*="scroll"]:not([tabindex])',
      )
      .forEach((el) => {
        const isScrollable =
            el.scrollHeight > el.clientHeight ||
            el.scrollWidth > el.clientWidth,
          hasOverflow = window.getComputedStyle(el).overflow !== "visible";
        isScrollable &&
          hasOverflow &&
          !el.getAttribute("tabindex") &&
          el.setAttribute("tabindex", "0");
      });
  }
  function setupDynamicContentObserver() {
    new MutationObserver(
      debounce(() => {
        (fixImageAltText(),
          fixLinkAccessibility(),
          fixButtonAccessibility(),
          fixFormAccessibility(),
          fixCarouselAccessibility(),
          fixScrollableContent());
      }, 500),
    ).observe(document.body, { childList: !0, subtree: !0 });
  }
  function handleReducedMotion() {
    window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (document.documentElement.classList.add("reduce-motion"),
      document.querySelectorAll(".swiper").forEach((el) => {
        el.swiper && el.swiper.autoplay && el.swiper.autoplay.stop();
      }));
  }
  function fixViewportZoom() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;
    let content = viewport.getAttribute("content") || "";
    (content.includes("maximum-scale") || content.includes("user-scalable")) &&
      ((content = content
        .replace(/,?\s*maximum-scale\s*=\s*[\d.]+/gi, "")
        .replace(/,?\s*user-scalable\s*=\s*(no|0)/gi, "")
        .replace(/,\s*,/g, ",")
        .replace(/^,\s*/, "")
        .replace(/,\s*$/, "")
        .trim()),
      viewport.setAttribute("content", content));
  }
  function init() {
    (fixViewportZoom(),
      createAnnouncer(),
      fixImageAltText(),
      fixLinkAccessibility(),
      fixButtonAccessibility(),
      fixFormAccessibility(),
      fixLandmarkRoles(),
      fixCarouselAccessibility(),
      fixScrollableContent(),
      setupKeyboardNavigation(),
      handleReducedMotion(),
      setupDynamicContentObserver());
  }
  (document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init(),
    window.addEventListener("load", () => {
      setTimeout(() => {
        (fixImageAltText(), fixLinkAccessibility(), fixButtonAccessibility());
      }, 1e3);
    }),
    (window.IM8Accessibility = {
      init,
      announce,
      fixImageAltText,
      fixLinkAccessibility,
    }));
})();
//# sourceMappingURL=/cdn/shop/t/121/assets/accessibility.js.map?v=175677302665901117391767337629
