/* ============================================
   JavaScript Extracted from index-updated.html
   Generated: 2026-01-31 12:42:03
   
   Total blocks extracted: 53
   Original file: index-updated.html
   
   IMPORTANT: This file preserves the exact execution
   order and logic from the original HTML file.
   DO NOT refactor or modify unless necessary.
   ============================================ */


/* ============================================
   Script Block 1 of 88
   Source: lines ~8
   Type: REGULAR
   
   ============================================ */


    // Accessibility: Ensure zoom is never disabled (WCAG 2.1 AA requirement)
    (function () {
      function fixViewport() {
        var v = document.querySelector('meta[name="viewport"]');
        if (v) {
          var c = v.getAttribute('content') || '';
          if (c.includes('maximum-scale') || c.includes('user-scalable')) {
            v.setAttribute('content', c.replace(/,?\s*maximum-scale\s*=\s*[\d.]+/gi, '').replace(/,?\s*user-scalable\s*=\s*(no|0)/gi, '').replace(/,\s*,/g, ',').trim());
          }
        }
      }
      fixViewport();
      new MutationObserver(function (m) { m.forEach(function (r) { if (r.type === 'attributes' && r.attributeName === 'content') fixViewport(); }); }).observe(document.querySelector('meta[name="viewport"]'), { attributes: true });
    })();

/* ============================================
   Script Block 2 of 88
   Source: lines ~30
   Type: REGULAR
   
   ============================================ */


    window.codebase = window.codebase || {};
    window.codebase.iid = '53B52C85B4E8';

/* ============================================
   Script Block 3 of 88
   Source: lines ~69
   Type: REGULAR
   
   ============================================ */

window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');

/* ============================================
   Script Block 5 of 88
   Source: lines ~77
   Type: REGULAR
   
   ============================================ */

window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');

/* ============================================
   Script Block 6 of 88
   Source: lines ~78
   Type: REGULAR
   
   ============================================ */


    (function () {
      console.log('IM8 Discount Script: Executing.');
      if (sessionStorage.getItem('drJamesDiscountTriggered')) {
        console.log('IM8 Discount Script: "drJamesDiscountTriggered" found in session storage. Script will not re-apply discount.');
        return;
      }
      console.log('IM8 Discount Script: "drJamesDiscountTriggered" NOT found in session storage. Proceeding with checks.');
      const referrer = document.referrer;
      let applyDiscount = false;
      const drJamesKeyword = 'drjames'; // Keyword to look for in utm_creator
      // Condition 1: Referrer is Linktree
      let fromLinktree = false;
      if (referrer) {
        try {
          const referrerUrl = new URL(referrer);
          const referrerHostname = referrerUrl.hostname.toLowerCase();
          if (referrerHostname.includes('linktr.ee')) {
            fromLinktree = true;
          }
        } catch (e) {
          console.warn('IM8 Discount Script: Error processing referrer. Referrer: "' + referrer + '"', e);
        }
      }
      // Condition 2: Current URL has utm_creator query parameter containing 'drjames'
      let utmCreatorContainsDrJames = false;
      try {
        const currentUrlParams = new URLSearchParams(window.location.search);
        const utmCreator = currentUrlParams.get('utm_creator');
        if (utmCreator && utmCreator.toLowerCase().includes(drJamesKeyword)) {
          utmCreatorContainsDrJames = true;
        }
      } catch (e) {
        console.warn('IM8 Discount Script: Error processing URL parameters.', e);
      }
      // Apply discount if either condition is met
      if (fromLinktree || utmCreatorContainsDrJames) {
        applyDiscount = true;
      }
      if (applyDiscount) {
        console.log('IM8 Discount Script: Setting "drJamesDiscountTriggered" and redirecting to apply discount DRJAMES.');
        sessionStorage.setItem('drJamesDiscountTriggered', 'true');
        window.location.href = '/discount/DRJAMES';
      } else {
        console.log('IM8 Discount Script: Final decision: Conditions for DRJAMES discount NOT met. No redirect.');
      }
    })();

/* ============================================
   Script Block 17 of 88
   Source: lines ~160
   Type: REGULAR
   
   ============================================ */


    if (Shopify.designMode) {
      document.documentElement.classList.add('shopify-design-mode');
    }

/* ============================================
   Script Block 24 of 88
   Source: lines ~172
   Type: REGULAR
   
   ============================================ */


    if (window.location.pathname.startsWith('/account/login') && !window.location.href.includes('?return_url=/a/account/shopify-login')) {
      window.location.href = '/a/account/login';
    }
    if (window.location.pathname.startsWith('/apps/customers')) {
      window.location.href = '/a/account/login';
    }

/* ============================================
   Script Block 25 of 88
   Source: lines ~183
   Type: REGULAR
   
   ============================================ */


    /* >> TriplePixel :: start*/
    window.TriplePixelData = { TripleName: "im8store.myshopify.com", ver: "2.16", plat: "SHOPIFY", isHeadless: false, src: 'SHOPIFY_EXT', product: { id: "8360959148199", name: `Daily Ultimate Essentials: All-in-One Supplement`, price: "105,00", variant: "47315076022439" }, search: "", collection: "", cart: "drawer", template: "product", curr: "EUR" || "USD" }, function (W, H, A, L, E, _, B, N) { function O(U, T, P, H, R) { void 0 === R && (R = !1), H = new XMLHttpRequest, P ? (H.open("POST", U, !0), H.setRequestHeader("Content-Type", "text/plain")) : H.open("GET", U, !0), H.send(JSON.stringify(P || {})), H.onreadystatechange = function () { 4 === H.readyState && 200 === H.status ? (R = H.responseText, U.includes("/first") ? eval(R) : P || (N[B] = R)) : (299 < H.status || H.status < 200) && T && !R && (R = !0, O(U, T - 1, P)) } } if (N = window, !N[H + "sn"]) { N[H + "sn"] = 1, L = function () { return Date.now().toString(36) + "_" + Math.random().toString(36) }; try { A.setItem(H, 1 + (0 | A.getItem(H) || 0)), (E = JSON.parse(A.getItem(H + "U") || "[]")).push({ u: location.href, r: document.referrer, t: Date.now(), id: L() }), A.setItem(H + "U", JSON.stringify(E)) } catch (e) { } var i, m, p; A.getItem('"!nC`') || (_ = A, A = N, A[H] || (E = A[H] = function (t, e, i) { return void 0 === i && (i = []), "State" == t ? E.s : (W = L(), (E._q = E._q || []).push([W, t, e].concat(i)), W) }, E.s = "Installed", E._q = [], E.ch = W, B = "configSecurityConfModel", N[B] = 1, O("https://conf.config-security.com/model", 5), i = L(), m = A[atob("c2NyZWVu")], _.setItem("di_pmt_wt", i), p = { id: i, action: "profile", avatar: _.getItem("auth-security_rand_salt_"), time: m[atob("d2lkdGg=")] + ":" + m[atob("aGVpZ2h0")], host: A.TriplePixelData.TripleName, plat: A.TriplePixelData.plat, url: window.location.href.slice(0, 500), ref: document.referrer, ver: A.TriplePixelData.ver }, O("https://api.config-security.com/event", 5, p), O("https://api.config-security.com/first?host=".concat(p.host, "&plat=").concat(p.plat), 5))) } }("", "TriplePixel", localStorage);
    /* << TriplePixel :: end*/

/* ============================================
   Script Block 26 of 88
   Source: lines ~192
   Type: REGULAR
   
   ============================================ */


    window.ShopifyAnalytics = window.ShopifyAnalytics || {};
    window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
    window.ShopifyAnalytics.meta.currency = 'EUR';
    var meta = { "product": { "id": 8360959148199, "gid": "gid:\/\/shopify\/Product\/8360959148199", "vendor": "im8health", "type": "", "handle": "essentials", "variants": [{ "id": 46073779257511, "price": 10500, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Subscription", "public_title": "Forever Jar \/ Subscription", "sku": "IM8-FG-000010" }, { "id": 46954316955815, "price": 18200, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Double Subscription", "public_title": "Forever Jar \/ Double Subscription", "sku": "IM8-FG-000059" }, { "id": 46166911778983, "price": 13000, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ One Time Purchase", "public_title": "Forever Jar \/ One Time Purchase", "sku": "IM8-FG-000076" }, { "id": 47315076022439, "price": 27300, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Quarterly Subscription", "public_title": "Forever Jar \/ Quarterly Subscription", "sku": "IM8-FG-000159" }, { "id": 46166911811751, "price": 11700, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Subscription", "public_title": "Single-Serve Sachets \/ Subscription", "sku": "IM8-FG-000030" }, { "id": 46954316923047, "price": 18200, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Double Subscription", "public_title": "Single-Serve Sachets \/ Double Subscription", "sku": "IM8-FG-000066" }, { "id": 46166911877287, "price": 13000, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ One Time Purchase", "public_title": "Single-Serve Sachets \/ One Time Purchase", "sku": "IM8-FG-000080" }, { "id": 47315075989671, "price": 30500, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Quarterly Subscription", "public_title": "Single-Serve Sachets \/ Quarterly Subscription", "sku": "IM8-FG-000160" }], "remote": false }, "page": { "pageType": "product", "resourceType": "product", "resourceId": 8360959148199, "requestId": "8732f2b5-c7cb-4cae-a578-27f4b2383bd7-1769749531" } };
    for (var attr in meta) {
      window.ShopifyAnalytics.meta[attr] = meta[attr];
    }

/* ============================================
   Script Block 28 of 88
   Source: lines ~207
   Type: REGULAR
   
   ============================================ */

window.ShopifyAnalytics = window.ShopifyAnalytics || {}; window.ShopifyAnalytics.performance = window.ShopifyAnalytics.performance || {}; (function () { const LONG_FRAME_THRESHOLD = 50; const longAnimationFrames = []; let activeRafId = null; function collectLongFrames() { let previousTime = null; function rafMonitor(now) { if (activeRafId === null) { return; } const delta = now - previousTime; if (delta > LONG_FRAME_THRESHOLD) { longAnimationFrames.push({ startTime: previousTime, endTime: now, }); } previousTime = now; activeRafId = requestAnimationFrame(rafMonitor); } previousTime = performance.now(); activeRafId = requestAnimationFrame(rafMonitor); } if (!PerformanceObserver.supportedEntryTypes.includes('long-animation-frame')) { collectLongFrames(); const timeoutId = setTimeout(() => { cancelAnimationFrame(activeRafId); }, 10_000); window.ShopifyAnalytics.performance.getLongAnimationFrames = function (stopCollection = false) { if (stopCollection) { clearTimeout(timeoutId); cancelAnimationFrame(activeRafId); } return longAnimationFrames; }; } })();

/* ============================================
   Script Block 30 of 88
   Source: lines ~359
   Type: REGULAR
   
   ============================================ */


      document.addEventListener('DOMContentLoaded', () => {
        const stickyHeader = document.querySelector('.shop-now-bar');
        let scrollThreshold = 400;
        let isVisible = false;
        // Check initial scroll position in case user refreshes mid-page
        const initialShouldShow = window.scrollY > scrollThreshold;
        if (initialShouldShow) {
          stickyHeader.style.transform = 'translateY(0)';
          isVisible = true;
        }
        window.addEventListener('scroll', () => {
          const shouldShow = window.scrollY > scrollThreshold;
          if (shouldShow && !isVisible) {
            // Show with smooth slide down
            stickyHeader.style.transform = 'translateY(0)';
            isVisible = true;
          } else if (!shouldShow && isVisible) {
            // Hide with smooth slide up
            stickyHeader.style.transform = 'translateY(-100%)';
            isVisible = false;
          }
        });
      });

/* ============================================
   Script Block 31 of 88
   Source: lines ~388
   Type: MODULE
   Attributes: type="module"
   ============================================ */

// Module script - preserved as-is

      // Swiper is now globally imported in theme.liquid
      new Swiper('.Index_announcement_slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 0,
        slidesPerView: 1,
        watchSlidesProgress: true,
        draggable: !0,
        autoHeight: !1,
        watchOverflow: !0,
        threshold: 10,
        mousewheel: {
          forceToAxis: !0
        },
        freeMode: !0,
        effect: "fade",
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        }
      })

/* ============================================
   Script Block 36 of 88
   Source: lines ~3026
   Type: REGULAR
   
   ============================================ */


                    (function () {
                      // Fetch order count from API and update stats
                      const cachedUrl = 'https://im8-order-count.vercel.app/api/exact-order-count?maxAgeMinutes=1440';
                      const waitedUrl = 'https://im8-order-count.vercel.app/api/exact-order-count?wait=1&timeoutMs=3000';
                      function formatPurchases(count) {
                        if (count >= 1000000) {
                          return Math.round(count / 100000) / 10 + 'M+';
                        } else if (count >= 1000) {
                          return Math.round(count / 1000) + 'k+';
                        }
                        return count.toLocaleString() + '+';
                      }
                      function formatServings(orderCount) {
                        const totalServings = orderCount * 30;
                        if (totalServings >= 1000000) {
                          return Math.round(totalServings / 1000000) + 'M+';
                        } else if (totalServings >= 1000) {
                          return Math.round(totalServings / 1000) + 'k+';
                        }
                        return totalServings.toLocaleString() + '+';
                      }
                      function updateStats(data) {
                        if (data && data.status === 'COMPLETED' && typeof data.exactOrders === 'number') {
                          const purchasesEl = document.querySelector('.product-review-stats__purchases');
                          const servingsEl = document.querySelector('.product-review-stats__servings');
                          if (purchasesEl) {
                            purchasesEl.textContent = formatPurchases(data.exactOrders) + ' customer purchases';
                          }
                          if (servingsEl) {
                            servingsEl.textContent = formatServings(data.exactOrders) + ' servings';
                          }
                        }
                      }
                      function safeFetch(url, timeoutMs) {
                        return new Promise(function (resolve, reject) {
                          const controller = new AbortController();
                          const tid = setTimeout(function () { controller.abort(); }, timeoutMs);
                          fetch(url, { signal: controller.signal })
                            .then(function (resp) { clearTimeout(tid); return resp && resp.ok ? resp.json() : Promise.reject(); })
                            .then(resolve)
                            .catch(reject);
                        });
                      }
                      safeFetch(cachedUrl, 2500)
                        .then(updateStats)
                        .catch(function () {
                          safeFetch(waitedUrl, 3200).then(updateStats).catch(function () { });
                        });
                    })();

/* ============================================
   Script Block 37 of 88
   Source: lines ~3212
   Type: REGULAR
   
   ============================================ */


                    (function () {
                      const trigger = document.querySelector('.cpr-expand__trigger');
                      const content = document.querySelector('.cpr-expand__content');
                      if (trigger && content) {
                        trigger.addEventListener('click', function () {
                          const isOpen = content.classList.contains('open');
                          content.classList.toggle('open');
                          trigger.classList.toggle('active');
                          trigger.setAttribute('aria-expanded', !isOpen);
                        });
                      }
                    })();

/* ============================================
   Script Block 38 of 88
   Source: lines ~3247
   Type: REGULAR
   
   ============================================ */


                        // Detect ?highlight=30day parameter and set body class for CSS targeting
                        (function () {
                          const urlParams = new URLSearchParams(window.location.search);
                          const highlight = urlParams.get('highlight');
                          if (highlight === '30day') {
                            document.documentElement.classList.add('highlight-30day-mode');
                            console.log('[Highlight Mode] 30-day variant highlight mode enabled via URL parameter');
                          }
                        })();

/* ============================================
   Script Block 39 of 88
   Source: lines ~3262
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] BEFORE matching - Option:', {
                          optionName: 'Format',
                          value: 'Forever Jar',
                          valueId: '4684834635943',
                          isPlan: null,
                          isFormat: true,
                          settingExists: true
                        });

/* ============================================
   Script Block 40 of 88
   Source: lines ~3272
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] AFTER matching:', {
                          optionName: 'Format',
                          value: 'Forever Jar',
                          valueId: '4684834635943',
                          isHidden: false,
                          dataAttribute: 'false'
                        });

/* ============================================
   Script Block 41 of 88
   Source: lines ~3310
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] BEFORE matching - Option:', {
                          optionName: 'Format',
                          value: 'Single-Serve Sachets',
                          valueId: '4684834668711',
                          isPlan: null,
                          isFormat: true,
                          settingExists: true
                        });

/* ============================================
   Script Block 42 of 88
   Source: lines ~3320
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] AFTER matching:', {
                          optionName: 'Format',
                          value: 'Single-Serve Sachets',
                          valueId: '4684834668711',
                          isHidden: false,
                          dataAttribute: 'false'
                        });

/* ============================================
   Script Block 43 of 88
   Source: lines ~3364
   Type: REGULAR
   
   ============================================ */


                        // Detect ?highlight=30day parameter and set body class for CSS targeting
                        (function () {
                          const urlParams = new URLSearchParams(window.location.search);
                          const highlight = urlParams.get('highlight');
                          if (highlight === '30day') {
                            document.documentElement.classList.add('highlight-30day-mode');
                            console.log('[Highlight Mode] 30-day variant highlight mode enabled via URL parameter');
                          }
                        })();

/* ============================================
   Script Block 44 of 88
   Source: lines ~3380
   Type: REGULAR
   
   ============================================ */


                        // Auto-select the preferred variant on page load based on region and URL parameters
                        // Priority: ?highlight=30day > region-based selection
                        // US/UK: Auto-select quarterly (90-day) unless highlight=30day
                        // Rest of World (including HK): Auto-select double subscription (60-day), or regular 30-day if no double sub exists
                        document.addEventListener('DOMContentLoaded', function () {
                          setTimeout(function () {
                            const isQuarterlyRegion = true;
                            const isHighlight30dayMode = document.documentElement.classList.contains('highlight-30day-mode');
                            // If highlight=30day mode, always select the regular 30-day subscription
                            if (isHighlight30dayMode) {
                              console.log('[Variant Auto-Select] Highlight 30-day mode detected - selecting 30-day subscription');
                              const allPlanInputs = document.querySelectorAll('input[type="radio"][name*="Plan"]');
                              for (const input of allPlanInputs) {
                                // Skip quarterly, double subscription, and one-time variants
                                if (input.dataset.quarterlyVariant === 'true') continue;
                                if (input.dataset.doubleSubscription === 'true') continue;
                                if (input.value.toLowerCase().includes('one time')) continue;
                                // Check if this option is visible (regular 30-day subscription)
                                const wrapper = input.closest('.product-variant-option-wrapper');
                                if (wrapper && window.getComputedStyle(wrapper).display !== 'none') {
                                  console.log('[Variant Auto-Select] Selecting 30-day subscription:', input.value);
                                  input.checked = true;
                                  input.dispatchEvent(new Event('change', { bubbles: true }));
                                  const label = input.nextElementSibling;
                                  if (label) {
                                    label.click();
                                  }
                                  break;
                                }
                              }
                              return; // Exit early - don't run region-based selection
                            }
                            if (isQuarterlyRegion) {
                              // US/UK: Auto-select quarterly variant
                              const quarterlyInput = document.querySelector('input[type="radio"][name*="Plan"][data-quarterly-variant="true"]');
                              if (quarterlyInput && !quarterlyInput.checked) {
                                console.log('[Variant Auto-Select] Auto-selecting quarterly variant (US/UK region)');
                                quarterlyInput.checked = true;
                                quarterlyInput.dispatchEvent(new Event('change', { bubbles: true }));
                                const label = quarterlyInput.nextElementSibling;
                                if (label) {
                                  label.click();
                                }
                              }
                            } else {
                              // Rest of World: Auto-select double subscription variant if available AND VISIBLE
                              const doubleSubInput = document.querySelector('input[type="radio"][name*="Plan"][data-double-subscription="true"]');
                              const quarterlyInput = document.querySelector('input[type="radio"][name*="Plan"][data-quarterly-variant="true"]');
                              // Check if double subscription is actually visible (not hidden by CSS)
                              let doubleSubIsVisible = false;
                              if (doubleSubInput) {
                                const wrapper = doubleSubInput.closest('.product-variant-option-wrapper');
                                doubleSubIsVisible = wrapper && window.getComputedStyle(wrapper).display !== 'none';
                              }
                              if (doubleSubIsVisible && !doubleSubInput.checked) {
                                console.log('[Variant Auto-Select] Auto-selecting double subscription variant (Rest of World)');
                                doubleSubInput.checked = true;
                                doubleSubInput.dispatchEvent(new Event('change', { bubbles: true }));
                                const label = doubleSubInput.nextElementSibling;
                                if (label) {
                                  label.click();
                                }
                              } else if (!doubleSubIsVisible || (quarterlyInput && quarterlyInput.checked)) {
                                // Double subscription is hidden OR quarterly is selected - select first visible regular subscription
                                console.log('[Variant Auto-Select] Double subscription hidden or quarterly selected in Rest of World - selecting regular subscription');
                                const allPlanInputs = document.querySelectorAll('input[type="radio"][name*="Plan"]');
                                for (const input of allPlanInputs) {
                                  // Skip quarterly, double subscription, and one-time variants
                                  if (input.dataset.quarterlyVariant === 'true') continue;
                                  if (input.dataset.doubleSubscription === 'true') continue;
                                  if (input.value.toLowerCase().includes('one time')) continue;
                                  // Check if this option is visible
                                  const wrapper = input.closest('.product-variant-option-wrapper');
                                  if (wrapper && window.getComputedStyle(wrapper).display !== 'none') {
                                    console.log('[Variant Auto-Select] Selecting regular subscription:', input.value);
                                    input.checked = true;
                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                    const label = input.nextElementSibling;
                                    if (label) {
                                      label.click();
                                    }
                                    break;
                                  }
                                }
                              }
                            }
                          }, 100);
                        });

/* ============================================
   Script Block 45 of 88
   Source: lines ~3470
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] BEFORE matching - Option:', {
                          optionName: 'Plan',
                          value: 'Subscription',
                          valueId: '4599807738023',
                          isPlan: true,
                          isFormat: null,
                          settingExists: true
                        });

/* ============================================
   Script Block 46 of 88
   Source: lines ~3480
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] ID matching result for Subscription:', {
                          optionValueId: '4599807738023',
                          hiddenIds: ["46954316923047", " 46954316955815"],
                          isHidden: false,
                          checkedVariantIds: [
                            '46073779257511',
                            '46166911811751',
                          ]
                        });

/* ============================================
   Script Block 47 of 88
   Source: lines ~3491
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] AFTER matching:', {
                          optionName: 'Plan',
                          value: 'Subscription',
                          valueId: '4599807738023',
                          isHidden: false,
                          dataAttribute: 'false'
                        });

/* ============================================
   Script Block 48 of 88
   Source: lines ~3536
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] BEFORE matching - Option:', {
                          optionName: 'Plan',
                          value: 'Double Subscription',
                          valueId: '5316462870695',
                          isPlan: true,
                          isFormat: null,
                          settingExists: true
                        });

/* ============================================
   Script Block 49 of 88
   Source: lines ~3546
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] ID matching result for Double Subscription:', {
                          optionValueId: '5316462870695',
                          hiddenIds: ["46954316923047", " 46954316955815"],
                          isHidden: true,
                          checkedVariantIds: [
                            '46954316955815',
                            '46954316923047',
                          ]
                        });

/* ============================================
   Script Block 50 of 88
   Source: lines ~3557
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] AFTER matching:', {
                          optionName: 'Plan',
                          value: 'Double Subscription',
                          valueId: '5316462870695',
                          isHidden: true,
                          dataAttribute: 'true'
                        });

/* ============================================
   Script Block 51 of 88
   Source: lines ~3608
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] BEFORE matching - Option:', {
                          optionName: 'Plan',
                          value: 'Quarterly Subscription',
                          valueId: '5658043252903',
                          isPlan: true,
                          isFormat: null,
                          settingExists: true
                        });

/* ============================================
   Script Block 52 of 88
   Source: lines ~3618
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] ID matching result for Quarterly Subscription:', {
                          optionValueId: '5658043252903',
                          hiddenIds: ["46954316923047", " 46954316955815"],
                          isHidden: false,
                          checkedVariantIds: [
                            '47315076022439',
                            '47315075989671'
                          ]
                        });

/* ============================================
   Script Block 53 of 88
   Source: lines ~3629
   Type: REGULAR
   
   ============================================ */


                        console.log('[Hidden Variants] AFTER matching:', {
                          optionName: 'Plan',
                          value: 'Quarterly Subscription',
                          valueId: '5658043252903',
                          isHidden: false,
                          dataAttribute: 'false'
                        });

/* ============================================
   Script Block 54 of 88
   Source: lines ~3695
   Type: REGULAR
   
   ============================================ */


                        (function () {
                          const productId = '8360959148199';
                          const otpContainer = document.querySelector('.one-time-purchase-standalone[data-product-id="' + productId + '"]');
                          if (!otpContainer) return;
                          const otpLink = otpContainer.querySelector('.one-time-purchase-link');
                          if (!otpLink) return;
                          // Skip if already initialized (prevents double-binding on HB popup where global.js also runs)
                          if (otpLink.dataset.listenerAttached === 'true') return;
                          // Parse OTP variants map
                          let otpVariantsMap = {};
                          try {
                            otpVariantsMap = JSON.parse(otpContainer.dataset.otpVariants || '{}');
                          } catch (e) {
                            console.warn('[OTP] Could not parse OTP variants map');
                          }
                          // Format money helper
                          function formatOtpMoney(cents) {
                            if (window.formatMoney) return window.formatMoney(cents);
                            return '$' + (cents / 100).toFixed(2);
                          }
                          // Update OTP link when format changes
                          function updateOtpLink(format) {
                            const otpData = otpVariantsMap[format];
                            if (!otpData) {
                              console.log('[OTP] No OTP variant found for format:', format);
                              return;
                            }
                            console.log('[OTP] Updating OTP link for format:', format, 'variant:', otpData.id);
                            otpLink.dataset.variantId = otpData.id;
                            otpContainer.dataset.oneTimeVariantId = otpData.id;
                            const priceEl = otpLink.querySelector('.otp-price');
                            if (priceEl) priceEl.textContent = formatOtpMoney(otpData.price);
                            const perServingEl = otpLink.querySelector('.otp-per-serving');
                            if (perServingEl) {
                              if (otpData.pricePerServing && otpData.pricePerServing > 0) {
                                perServingEl.textContent = '(' + formatOtpMoney(otpData.pricePerServing) + '/serving)';
                                perServingEl.style.display = '';
                              } else {
                                perServingEl.style.display = 'none';
                              }
                            }
                          }
                          // Find variant-selects scoped to this product
                          const productInfo = otpContainer.closest('product-info');
                          const variantSelects = productInfo ? productInfo.querySelector('variant-selects') : document.querySelector('variant-selects');
                          if (variantSelects) {
                            // Format radios
                            const formatRadios = variantSelects.querySelectorAll('input[type="radio"][data-option-position="1"]');
                            formatRadios.forEach(function (radio) {
                              radio.addEventListener('change', function () {
                                updateOtpLink(this.value);
                              });
                            });
                            // Format select dropdown
                            const formatSelect = variantSelects.querySelector('select[data-option-position="1"]');
                            if (formatSelect) {
                              formatSelect.addEventListener('change', function () {
                                updateOtpLink(this.value);
                              });
                            }
                          }
                          // Attach click listener
                          otpLink.dataset.listenerAttached = 'true';
                          console.log('[OTP] Attaching click listener for product:', productId, 'variant:', otpLink.dataset.variantId);
                          otpLink.addEventListener('click', async function (e) {
                            e.preventDefault();
                            const variantId = this.dataset.variantId;
                            const link = this;
                            link.style.pointerEvents = 'none';
                            link.style.opacity = '0.5';
                            console.log('[One Time Purchase] Adding variant to cart:', variantId);
                            const cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
                            if (!cart) {
                              window.location.href = '/cart?add=' + variantId;
                              return;
                            }
                            try {
                              const sectionsToRender = cart.getSectionsToRender ? cart.getSectionsToRender().map(section => section.id) : [];
                              const body = JSON.stringify({
                                items: [{ id: parseInt(variantId), quantity: 1 }],
                                sections: sectionsToRender,
                                sections_url: window.location.pathname
                              });
                              const response = await fetch(window.routes.cart_add_url || '/cart/add.js', {
                                ...fetchConfig(),
                                body: body
                              });
                              const state = await response.text();
                              const parsedState = JSON.parse(state);
                              if (parsedState.status) {
                                alert(parsedState.description || parsedState.message || 'Error adding to cart');
                                return;
                              }
                              if (cart && typeof cart.renderContents === 'function') {
                                cart.renderContents(parsedState);
                              }
                              if (cart && cart.classList.contains('is-empty')) {
                                cart.classList.remove('is-empty');
                              }
                              // Close HB popup if open
                              const quickAddDrawer = document.querySelector('[js-hb-popup]');
                              if (quickAddDrawer) {
                                quickAddDrawer.classList.remove('open');
                                quickAddDrawer.classList.remove('active');
                                quickAddDrawer.classList.add('hidden');
                              }
                            } catch (error) {
                              console.error('[One Time Purchase] Error:', error);
                              window.location.href = '/cart';
                            } finally {
                              link.style.pointerEvents = '';
                              link.style.opacity = '';
                            }
                          });
                        })();

/* ============================================
   Script Block 55 of 88
   Source: lines ~3814
   Type: REGULAR
   Attributes: type="application/json"
                    data-selected-variant=""
   ============================================ */

{"id":47315076022439,"title":"Forever Jar \/ Quarterly Subscription","option1":"Forever Jar","option2":"Quarterly Subscription","option3":null,"sku":"IM8-FG-000159","requires_shipping":true,"taxable":true,"featured_image":{"id":40446423367847,"product_id":8360959148199,"position":8,"created_at":"2025-10-21T05:56:40-04:00","updated_at":"2025-10-21T05:56:42-04:00","alt":"Forever Jar","width":1000,"height":1000,"src":"\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602","variant_ids":[46073779257511,46166911778983,46954316955815,47315076022439]},"available":true,"name":"Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Quarterly Subscription","public_title":"Forever Jar \/ Quarterly Subscription","options":["Forever Jar","Quarterly Subscription"],"price":27300,"weight":2940,"compare_at_price":null,"inventory_management":"shopify","barcode":"","featured_media":{"alt":"Forever Jar","id":31999526174887,"position":8,"preview_image":{"aspect_ratio":1.0,"height":1000,"width":1000,"src":"\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602"}},"requires_selling_plan":false,"selling_plan_allocations":[{"price_adjustments":[{"position":1,"price":27300}],"price":27300,"compare_at_price":27300,"per_delivery_price":27300,"selling_plan_id":2948432039,"selling_plan_group_id":"d1c31b7d875f371afdda85ee0906e6c15aee403a"}],"quantity_rule":{"min":1,"max":null,"increment":1}}

/* ============================================
   Script Block 57 of 88
   Source: lines ~3918
   Type: REGULAR
   
   ============================================ */


                        console.log('[Buy Buttons DEBUG] Product:', 'essentials', 'ID:', '8360959148199');
                        console.log('[Buy Buttons DEBUG] Initial variant:', '47315076022439', 'Forever Jar / Quarterly Subscription');
                        console.log('[Buy Buttons DEBUG] selected_or_first_available:', '47315076022439', 'Forever Jar / Quarterly Subscription');

/* ============================================
   Script Block 58 of 88
   Source: lines ~3943
   Type: REGULAR
   
   ============================================ */


                    // Make product variants available globally for product-form.js
                    window.productVariants = [{ "id": 46073779257511, "title": "Forever Jar \/ Subscription", "option1": "Forever Jar", "option2": "Subscription", "option3": null, "sku": "IM8-FG-000010", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423367847, "product_id": 8360959148199, "position": 8, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": "Forever Jar", "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602", "variant_ids": [46073779257511, 46166911778983, 46954316955815, 47315076022439] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Subscription", "public_title": "Forever Jar \/ Subscription", "options": ["Forever Jar", "Subscription"], "price": 10500, "weight": 1506, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": "Forever Jar", "id": 31999526174887, "position": 8, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 10500 }], "price": 10500, "compare_at_price": 10500, "per_delivery_price": 10500, "selling_plan_id": 2546008231, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 46954316955815, "title": "Forever Jar \/ Double Subscription", "option1": "Forever Jar", "option2": "Double Subscription", "option3": null, "sku": "IM8-FG-000059", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423367847, "product_id": 8360959148199, "position": 8, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": "Forever Jar", "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602", "variant_ids": [46073779257511, 46166911778983, 46954316955815, 47315076022439] }, "available": false, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Double Subscription", "public_title": "Forever Jar \/ Double Subscription", "options": ["Forever Jar", "Double Subscription"], "price": 18200, "weight": 1360, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": "Forever Jar", "id": 31999526174887, "position": 8, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 18200 }], "price": 18200, "compare_at_price": 18200, "per_delivery_price": 18200, "selling_plan_id": 2951151783, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 46166911778983, "title": "Forever Jar \/ One Time Purchase", "option1": "Forever Jar", "option2": "One Time Purchase", "option3": null, "sku": "IM8-FG-000076", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423367847, "product_id": 8360959148199, "position": 8, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": "Forever Jar", "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602", "variant_ids": [46073779257511, 46166911778983, 46954316955815, 47315076022439] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ One Time Purchase", "public_title": "Forever Jar \/ One Time Purchase", "options": ["Forever Jar", "One Time Purchase"], "price": 13000, "weight": 1506, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": "Forever Jar", "id": 31999526174887, "position": 8, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 47315076022439, "title": "Forever Jar \/ Quarterly Subscription", "option1": "Forever Jar", "option2": "Quarterly Subscription", "option3": null, "sku": "IM8-FG-000159", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423367847, "product_id": 8360959148199, "position": 8, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": "Forever Jar", "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602", "variant_ids": [46073779257511, 46166911778983, 46954316955815, 47315076022439] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Forever Jar \/ Quarterly Subscription", "public_title": "Forever Jar \/ Quarterly Subscription", "options": ["Forever Jar", "Quarterly Subscription"], "price": 27300, "weight": 2940, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": "Forever Jar", "id": 31999526174887, "position": 8, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-jar_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 27300 }], "price": 27300, "compare_at_price": 27300, "per_delivery_price": 27300, "selling_plan_id": 2948432039, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 46166911811751, "title": "Single-Serve Sachets \/ Subscription", "option1": "Single-Serve Sachets", "option2": "Subscription", "option3": null, "sku": "IM8-FG-000030", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423269543, "product_id": 8360959148199, "position": 1, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": null, "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602", "variant_ids": [46166911811751, 46166911877287, 46954316923047, 47315075989671] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Subscription", "public_title": "Single-Serve Sachets \/ Subscription", "options": ["Single-Serve Sachets", "Subscription"], "price": 11700, "weight": 1360, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": null, "id": 31999526076583, "position": 1, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 11700 }], "price": 11700, "compare_at_price": 11700, "per_delivery_price": 11700, "selling_plan_id": 2546008231, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 46954316923047, "title": "Single-Serve Sachets \/ Double Subscription", "option1": "Single-Serve Sachets", "option2": "Double Subscription", "option3": null, "sku": "IM8-FG-000066", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423269543, "product_id": 8360959148199, "position": 1, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": null, "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602", "variant_ids": [46166911811751, 46166911877287, 46954316923047, 47315075989671] }, "available": false, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Double Subscription", "public_title": "Single-Serve Sachets \/ Double Subscription", "options": ["Single-Serve Sachets", "Double Subscription"], "price": 18200, "weight": 1360, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": null, "id": 31999526076583, "position": 1, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 18200 }], "price": 18200, "compare_at_price": 18200, "per_delivery_price": 18200, "selling_plan_id": 2951151783, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 46166911877287, "title": "Single-Serve Sachets \/ One Time Purchase", "option1": "Single-Serve Sachets", "option2": "One Time Purchase", "option3": null, "sku": "IM8-FG-000080", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423269543, "product_id": 8360959148199, "position": 1, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": null, "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602", "variant_ids": [46166911811751, 46166911877287, 46954316923047, 47315075989671] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ One Time Purchase", "public_title": "Single-Serve Sachets \/ One Time Purchase", "options": ["Single-Serve Sachets", "One Time Purchase"], "price": 13000, "weight": 1360, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": null, "id": 31999526076583, "position": 1, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }, { "id": 47315075989671, "title": "Single-Serve Sachets \/ Quarterly Subscription", "option1": "Single-Serve Sachets", "option2": "Quarterly Subscription", "option3": null, "sku": "IM8-FG-000160", "requires_shipping": true, "taxable": true, "featured_image": { "id": 40446423269543, "product_id": 8360959148199, "position": 1, "created_at": "2025-10-21T05:56:40-04:00", "updated_at": "2025-10-21T05:56:42-04:00", "alt": null, "width": 1000, "height": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602", "variant_ids": [46166911811751, 46166911877287, 46954316923047, 47315075989671] }, "available": true, "name": "Daily Ultimate Essentials: All-in-One Supplement - Single-Serve Sachets \/ Quarterly Subscription", "public_title": "Single-Serve Sachets \/ Quarterly Subscription", "options": ["Single-Serve Sachets", "Quarterly Subscription"], "price": 30500, "weight": 2940, "compare_at_price": null, "inventory_management": "shopify", "barcode": "", "featured_media": { "alt": null, "id": 31999526076583, "position": 1, "preview_image": { "aspect_ratio": 1.0, "height": 1000, "width": 1000, "src": "\/\/im8health.com\/cdn\/shop\/files\/pdp_essentials-sachet_carousel01.jpg?v=1761040602" } }, "requires_selling_plan": false, "selling_plan_allocations": [{ "price_adjustments": [{ "position": 1, "price": 30500 }], "price": 30500, "compare_at_price": 30500, "per_delivery_price": 30500, "selling_plan_id": 2948432039, "selling_plan_group_id": "d1c31b7d875f371afdda85ee0906e6c15aee403a" }], "quantity_rule": { "min": 1, "max": null, "increment": 1 } }];
                    // Store currency format info
                    window.shopCurrency = {
                      symbol: '€',
                      isoCode: 'EUR',
                      moneyFormat: "€{{amount_with_comma_separator}}",
                      moneyWithCurrencyFormat: "€{{amount_with_comma_separator}} EUR"
                    };
                    // Track quarterly variant IDs (metafields not available in JSON)
                    window.quarterlyVariantIds = [47315076022439,
                      47315075989671
                    ];
                    // Track double subscription custom monthly costs (for display)
                    window.doubleSubscriptionMonthlyCosts = {};
                    // Track double subscription variant IDs (metafields not available in JSON)
                    window.doubleSubscriptionVariantIds = [46954316955815,
                      46954316923047,
                    ];
                    // Track variant alt images for ALL variants that have them (variant ID -> image URL)
                    // This allows each Plan variant to have its own custom alt image
                    window.variantAltImages = {
                      "47315076022439": "//im8health.com/cdn/shop/files/PDP_060fbac6-1883-4c53-aae5-f791c68056a5.jpg?v=1766566335&width=1946",
                      "47315075989671": "//im8health.com/cdn/shop/files/PDP_07c659fc-2e80-4d58-a136-6d06961f00aa.jpg?v=1766566325&width=1946"
                    };
                    // Keep backwards compatibility
                    window.quarterlyVariantAltImages = window.variantAltImages;
                    // Track hidden variant IDs from settings
                    window.hiddenVariantIds = [46954316923047,
                      46954316955815
                    ];
                    // Helper to check if variant is quarterly (and not hidden)
                    window.isQuarterlyVariant = function (variantId) {
                      const vid = parseInt(variantId);
                      // Check if it's a quarterly variant AND not in the hidden list
                      return window.quarterlyVariantIds.includes(vid) && !window.hiddenVariantIds.includes(vid);
                    };
                    // Helper to check if variant is double subscription
                    window.isDoubleSubscriptionVariant = function (variantId) {
                      const vid = parseInt(variantId);
                      return window.doubleSubscriptionVariantIds && window.doubleSubscriptionVariantIds.includes(vid);
                    };
                    // Flag for merchandise products (no /mo suffix)window.isMerchandiseProduct = false;
                    // Flag for Nutrition Kitchen page (apply additional 10% discount to displayed prices)
                    window.isNutritionKitchenPage = false;
                    // Helper to check if variant is a one-time purchase (not a subscription)
                    window.isOneTimePurchaseVariant = function (variantId) {
                      // Merchandise products are always treated as one-time purchases (no /mo suffix)
                      if (window.isMerchandiseProduct) return true;
                      const variant = window.productVariants?.find(v => v.id == parseInt(variantId));
                      if (!variant) return false;
                      // Check if any option contains "One Time"
                      const options = [variant.option1, variant.option2, variant.option3].filter(Boolean);
                      return options.some(opt => opt.toLowerCase().includes('one time'));
                    };
                    // Helper to check if variant is a subscription (anything that's not one-time purchase)
                    window.isSubscriptionVariant = function (variantId) {
                      return !window.isOneTimePurchaseVariant(variantId);
                    };
                    // Helper to format price with currency (uses money_with_currency format to match Liquid output)
                    window.formatMoney = function (cents, useWithCurrency = true) {
                      if (!window.shopCurrency) return '$' + (cents / 100).toFixed(2);
                      const amount = (cents / 100);
                      // Use money_with_currency_format to match Liquid's money_with_currency filter
                      const format = useWithCurrency && window.shopCurrency.moneyWithCurrencyFormat
                        ? window.shopCurrency.moneyWithCurrencyFormat
                        : window.shopCurrency.moneyFormat;
                      // Format based on money format - handle common patterns
                      let formatted = format
                        .replace(/\{\{\s*amount\s*\}\}/g, amount.toFixed(2))
                        .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, Math.round(amount))
                        .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, amount.toFixed(2).replace('.', ','))
                        .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, Math.round(amount).toString().replace('.', ','));
                      // Remove trailing zeros for cleaner display (e.g., $72.80 → $72.8, $72.00 → $72)
                      formatted = formatted.replace(/\.00([^\d]|$)/, '$1').replace(/,00([^\d]|$)/, '$1');
                      formatted = formatted.replace(/(\.\d)0([^\d]|$)/, '$1$2').replace(/(,\d)0([^\d]|$)/, '$1$2');
                      return formatted;
                    };
                    // Helper to check if variant is hidden
                    window.isHiddenVariant = function (variantId) {
                      const vid = parseInt(variantId);
                      return window.hiddenVariantIds && window.hiddenVariantIds.includes(vid);
                    };
                    // Helper to get first non-hidden available variant
                    window.getFirstAvailableNonHiddenVariant = function () {
                      if (!window.productVariants) return null;
                      return window.productVariants.find(v => v.available && !window.isHiddenVariant(v.id));
                    };
                    (function () {
                      const submitButton = document.getElementById('ProductSubmitButton-template--17653238202535__main');
                      const buttonText = submitButton ? submitButton.querySelector('.button-text') : null;
                      const priceDisplay = submitButton ? submitButton.querySelector('.product_price_new') : null;
                      if (!submitButton || !buttonText || !priceDisplay) return;
                      // Store original price HTML
                      const originalPriceHTML = priceDisplay.innerHTML;
                      function updateButtonForVariant(variantId) {
                        let displayVariant = window.productVariants?.find(v => v.id == parseInt(variantId));
                        // If current variant is hidden, find first non-hidden available variant
                        if (window.isHiddenVariant && window.isHiddenVariant(variantId)) {
                          displayVariant = window.getFirstAvailableNonHiddenVariant();
                        }
                        const isQuarterly = window.isQuarterlyVariant && window.isQuarterlyVariant(variantId);
                        const isDoubleSubscription = window.isDoubleSubscriptionVariant && window.isDoubleSubscriptionVariant(variantId);
                        const isOneTime = window.isOneTimePurchaseVariant && window.isOneTimePurchaseVariant(variantId);
                        // All variants that are NOT one-time purchase are subscriptions
                        const isSubscription = !isOneTime;
                        console.log('[Buy Button] Variant update:', { variantId, isQuarterly, isDoubleSubscription, isOneTime, isSubscription });
                        if (isQuarterly && displayVariant) {
                          // Quarterly variant selected
                          submitButton.classList.add('quarterly-selected');
                          buttonText.textContent = 'START MY 90-DAY TRANSFORMATION PROGRAM';
                          // Calculate monthly price: divide by 3
                          const monthlyPrice = displayVariant.price / 3;
                          const formattedPrice = window.formatMoney(monthlyPrice);
                          priceDisplay.innerHTML = formattedPrice + '/mo';
                        } else if (displayVariant) {
                          // Normal variant selected
                          submitButton.classList.remove('quarterly-selected');
                          buttonText.textContent = 'Add to cart';
                          if (window.formatMoney && isSubscription) {
                            // Calculate monthly price based on subscription type
                            let monthlyPrice = displayVariant.price;
                            if (isDoubleSubscription) {
                              // Double subscription (60-day): price / 2 months
                              monthlyPrice = displayVariant.price / 2;
                            }
                            // NUTRITION KITCHEN PAGE: Apply additional 10% discount for 30-day variants
                            // (not quarterly or double subscription)
                            if (window.isNutritionKitchenPage && !isQuarterly && !isDoubleSubscription) {
                              monthlyPrice = Math.round(monthlyPrice * 0.9);
                            }
                            // Regular 30-day subscription: price is already monthly
                            const formattedPrice = window.formatMoney(monthlyPrice);
                            priceDisplay.innerHTML = formattedPrice + '/mo';
                          } else if (window.formatMoney) {
                            // One-time purchase: no /mo suffix
                            const formattedPrice = window.formatMoney(displayVariant.price);
                            priceDisplay.innerHTML = formattedPrice;
                          }
                        } else {
                          // Fallback to original
                          submitButton.classList.remove('quarterly-selected');
                          buttonText.textContent = 'Add to cart';
                          priceDisplay.innerHTML = originalPriceHTML;
                        }
                      }
                      // Listen for variant changes
                      // NOTE: Format per-serving price updates are handled by product-info.js to avoid race conditions
                      document.addEventListener('DOMContentLoaded', function () {
                        // CRITICAL: Initialize with correct non-hidden variant on page load
                        const variantIdInput = document.querySelector('.product-variant-id');
                        if (variantIdInput) {
                          const currentVariantId = parseInt(variantIdInput.value);
                          // If current variant is hidden, update to first non-hidden variant
                          if (window.isHiddenVariant && window.isHiddenVariant(currentVariantId)) {
                            const correctVariant = window.getFirstAvailableNonHiddenVariant();
                            if (correctVariant) {
                              console.log('[Buy Buttons] Updating hidden input from hidden variant', currentVariantId, 'to', correctVariant.id);
                              variantIdInput.value = correctVariant.id;
                              updateButtonForVariant(correctVariant.id);
                            }
                          }
                        }
                        const variantInputs = document.querySelectorAll('input[name*="Plan"], input[type="radio"][name*="option"]');
                        variantInputs.forEach(function (input) {
                          input.addEventListener('change', function () {
                            setTimeout(function () {
                              const variantIdInput = document.querySelector('.product-variant-id');
                              if (!variantIdInput) return;
                              updateButtonForVariant(variantIdInput.value);
                            }, 100);
                          });
                        });
                        // Also listen for the variant:change event that product-info.js fires
                        document.addEventListener('variant:change', function (e) {
                          if (e.detail && e.detail.variant && e.detail.variant.id) {
                            setTimeout(function () {
                              updateButtonForVariant(e.detail.variant.id);
                            }, 100);
                          }
                        });
                      });
                    })();

/* ============================================
   Script Block 60 of 88
   Source: lines ~4170
   Type: REGULAR
   
   ============================================ */


                  (function () {
                    // SHOW banner for quarterly (90-day) and double subscription (60-day) variants
                    // HIDE banner for regular 30-day subscription
                    function updateBfcmBanner() {
                      const banners = document.querySelectorAll('[data-bfcm-banner]');
                      const variantInput = document.querySelector('form[action*="/cart/add"] input[name="id"]');
                      if (!variantInput || !banners.length) return;
                      const variantId = variantInput.value;
                      const isQuarterly = window.isQuarterlyVariant && window.isQuarterlyVariant(variantId);
                      const isDoubleSubscription = window.isDoubleSubscriptionVariant && window.isDoubleSubscriptionVariant(variantId);
                      // SHOW banner for 90-day (quarterly) and 60-day (double subscription) variants
                      // HIDE banner for regular 30-day subscription
                      banners.forEach(banner => {
                        if (isQuarterly || isDoubleSubscription) {
                          // Show for quarterly and double subscription (Christmas offer variants)
                          banner.style.display = '';
                          banner.classList.remove('bfcm-hidden');
                        } else {
                          // Hide for regular 30-day subscription
                          banner.classList.add('bfcm-hidden');
                          setTimeout(() => {
                            if (banner.classList.contains('bfcm-hidden')) {
                              banner.style.display = 'none';
                            }
                          }, 300);
                        }
                      });
                    }
                    // Listen for variant changes
                    document.addEventListener('change', function (e) {
                      if (e.target.matches('input[name="id"], select[name="id"], input[type="radio"][name*="option"]')) {
                        setTimeout(updateBfcmBanner, 50);
                      }
                    });
                    // Also listen for custom variant change events
                    document.addEventListener('variant:changed', updateBfcmBanner);
                    // MutationObserver for variant input changes
                    const variantInput = document.querySelector('form[action*="/cart/add"] input[name="id"]');
                    if (variantInput) {
                      const observer = new MutationObserver(updateBfcmBanner);
                      observer.observe(variantInput, { attributes: true, attributeFilter: ['value'] });
                    }
                    // Initial check after DOM ready
                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', () => setTimeout(updateBfcmBanner, 100));
                    } else {
                      setTimeout(updateBfcmBanner, 100);
                    }
                  })();

/* ============================================
   Script Block 61 of 88
   Source: lines ~4361
   Type: MODULE
   Attributes: type="module"
   ============================================ */

// Module script - preserved as-is

                  // Swiper is now globally imported in theme.liquid
                  new Swiper('.Product_meta_real_reviews_video_slider', {
                    loop: false,
                    grabCursor: false,
                    spaceBetween: 12,
                    slidesPerGroup: 1,
                    slidesPerView: "auto",
                    watchSlidesProgress: true,
                    draggable: !0,
                    autoHeight: !1,
                    watchOverflow: !0,
                    threshold: 10,
                    mousewheel: {
                      forceToAxis: !0
                    }
                  });

/* ============================================
   Script Block 65 of 88
   Source: lines ~5832
   Type: REGULAR
   
   ============================================ */


        // Set variant IDs for Beckham Stack popup
        window.beckhamStackSettings = {
          essentialsVariants: "46166911811751, 46073779257511",
          longevityVariants: "46073779323047",
          enabled: true
        };
        // DEBUG: Log Beckham Stack popup initialization
        console.log('[Beckham DEBUG] Popup Liquid rendered:', {
          productHandle: 'essentials',
          showPopup: true,
          popupType: 'essentials',
          popupDisabled: false,
          settingsEnabled: true,
          essentialsVariants: "46166911811751, 46073779257511",
          longevityVariants: "46073779323047"
        });

/* ============================================
   Script Block 67 of 88
   Source: lines ~5851
   Type: REGULAR
   
   ============================================ */


        // Pass theme settings to JavaScript
        window.Shopify = window.Shopify || {};
        window.Shopify.theme = window.Shopify.theme || {};
        window.Shopify.theme.settings = window.Shopify.theme.settings || {};
        window.Shopify.theme.settings.beckham_stack_variant_ids = "46166911811751, 46073779257511, 46073779323047";
        window.Shopify.theme.settings.beckham_stack_popup_enable = true;

/* ============================================
   Script Block 68 of 88
   Source: lines ~6140
   Type: REGULAR
   
   ============================================ */


        document.addEventListener('DOMContentLoaded', function () {
          const staticReviewsSwiper = new Swiper('.static-reviews-swiper', {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 25,
            freeMode: true,
            speed: 8000,
            autoplay: {
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            breakpoints: {
              320: {
                spaceBetween: 15,
              },
              750: {
                spaceBetween: 20,
              },
            },
          });
        });

/* ============================================
   Script Block 69 of 88
   Source: lines ~7255
   Type: REGULAR
   
   ============================================ */


        document.addEventListener('DOMContentLoaded', function () {
          'use strict';
          const section = document.getElementById('organ-systems-section');
          if (!section) return;
          const toggle = section.querySelector('.organ-systems__toggle');
          const toggleBtns = section.querySelectorAll('.organ-systems__toggle-btn');
          const contents = section.querySelectorAll('.organ-systems__content');
          const cards = section.querySelectorAll('.organ-systems__card');
          const details = section.querySelectorAll('.organ-systems__detail-content');
          // PERFORMANCE: Pause/resume animations based on visibility
          let isVisible = false;
          function updateAnimationState() {
            if (document.hidden || !isVisible) {
              section.classList.add('is-paused');
              section.classList.remove('is-visible');
            } else {
              section.classList.remove('is-paused');
              section.classList.add('is-visible');
            }
          }
          // IntersectionObserver for visibility-based animation control
          if ('IntersectionObserver' in window) {
            const visibilityObserver = new IntersectionObserver(function (entries) {
              entries.forEach(function (entry) {
                isVisible = entry.isIntersecting;
                updateAnimationState();
              });
            }, {
              rootMargin: '50px',
              threshold: 0.1
            });
            visibilityObserver.observe(section);
          } else {
            // Fallback: always visible
            section.classList.add('is-visible');
          }
          // Handle tab visibility changes
          document.addEventListener('visibilitychange', updateAnimationState);
          // Product toggle functionality
          toggleBtns.forEach(btn => {
            btn.addEventListener('click', function () {
              const product = this.dataset.product;
              // Update toggle state
              toggleBtns.forEach(b => {
                b.classList.remove('organ-systems__toggle-btn--active');
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
              });
              this.classList.add('organ-systems__toggle-btn--active');
              this.setAttribute('aria-selected', 'true');
              this.setAttribute('tabindex', '0');
              // Update indicator position
              toggle.dataset.active = product;
              // Switch theme class for dynamic background colors
              section.classList.remove('organ-systems--essentials', 'organ-systems--longevity');
              section.classList.add('organ-systems--' + product);
              section.dataset.activeProduct = product;
              // Switch content panels
              contents.forEach(content => {
                const isActive = content.dataset.content === product;
                content.classList.toggle('organ-systems__content--active', isActive);
                content.hidden = !isActive;
              });
            });
          });
          // Card selection functionality with smooth transitions
          cards.forEach(card => {
            card.addEventListener('click', function () {
              const product = this.dataset.product;
              const index = this.dataset.index;
              // Update card states for this product
              cards.forEach(c => {
                if (c.dataset.product === product) {
                  const isActive = c.dataset.index === index;
                  c.classList.toggle('organ-systems__card--active', isActive);
                  c.setAttribute('aria-selected', isActive ? 'true' : 'false');
                }
              });
              // Update detail panel with staggered animation
              details.forEach(detail => {
                if (detail.dataset.product === product) {
                  const isActive = detail.dataset.detailIndex === index;
                  detail.classList.toggle('organ-systems__detail-content--active', isActive);
                }
              });
            });
            // Keyboard navigation
            card.addEventListener('keydown', function (e) {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
              }
            });
          });
        });

/* ============================================
   Script Block 70 of 88
   Source: lines ~8377
   Type: REGULAR
   
   ============================================ */


        document.addEventListener('DOMContentLoaded', function () {
          // Handle "see more" button clicks
          if (document.getElementById('Index_object_table_column_see_more')) {
            document.getElementById('Index_object_table_column_see_more').addEventListener('click', function () {
              const rows = document.querySelectorAll(
                '.Index_object_table_column_inneroverlay_innertable_innerright_innerloops_mainboxs_new',
              );
              rows.forEach((row) => row.classList.remove('hide'));
              const className = 'Index_object_table_column_inneroverlay_innertable_innerright_innercolumn_new';
              const elements = document.getElementsByClassName(className);
              for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('truncate');
              }
              this.style.display = 'none';
            });
          }
        });

/* ============================================
   Script Block 71 of 88
   Source: lines ~9496
   Type: REGULAR
   
   ============================================ */


        (function () {
          'use strict';
          // === EARLY BAILOUT - Zero cost on mobile/reduced motion ===
          var isMobile = window.innerWidth <= 749;
          var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (isMobile || prefersReducedMotion) return;
          // === CONFIGURATION ===
          var SCRIPTS = {
            three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
            vanta: 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.cells.min.js'
          };
          var THEMES = {
            essentials: { backgroundColor: 0xF5EAEA, color1: 0xA40011, color2: 0xFF9693 },
            longevity: { backgroundColor: 0xD7EDAF, color1: 0x8C0000, color2: 0xF29B45 }
          };
          // === STATE ===
          var vantaEffect = null;
          var currentTheme = 'essentials';
          var isVisible = true;
          var loadPromise = null;
          // === ULTRA-FAST SCRIPT LOADER ===
          // Uses script injection with cache-friendly headers
          function injectScript(src) {
            return new Promise(function (resolve, reject) {
              // Check if already loaded
              if (src.indexOf('three') > -1 && window.THREE) return resolve();
              if (src.indexOf('vanta') > -1 && window.VANTA) return resolve();
              var script = document.createElement('script');
              script.src = src;
              script.async = true;
              script.crossOrigin = 'anonymous';
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          }
          // === PARALLEL PREFETCH + SEQUENTIAL EXECUTION ===
          // Scripts are prefetched in parallel by browser, we just execute in order
          function loadAllScripts() {
            if (loadPromise) return loadPromise;
            loadPromise = injectScript(SCRIPTS.three)
              .then(function () { return injectScript(SCRIPTS.vanta); })
              .catch(function (e) {
                console.warn('[Vanta] Script load failed:', e);
                loadPromise = null;
              });
            return loadPromise;
          }
          // === OPTIMIZED VANTA INITIALIZATION ===
          function initVanta() {
            var container = document.getElementById('pillars-vanta-bg');
            var section = document.getElementById('pillars-health-section');
            if (!container || !window.VANTA || !window.THREE) {
              console.warn('[Vanta] Missing dependencies');
              return;
            }
            currentTheme = section && section.dataset.activeProduct || 'essentials';
            var theme = THEMES[currentTheme];
            try {
              // Create effect with performance-optimized settings
              vantaEffect = VANTA.CELLS({
                el: container,
                THREE: THREE,
                // Disable all input handling for max performance
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                // Optimized rendering
                minHeight: 200,
                minWidth: 200,
                scale: 0.7,           // Reduced for performance
                size: 0.4,            // Smaller cells = faster render
                speed: 0.8,           // Slower = smoother
                // Theme colors
                backgroundColor: theme.backgroundColor,
                color1: theme.color1,
                color2: theme.color2
              });
              // === CRITICAL PERFORMANCE OPTIMIZATIONS ===
              if (vantaEffect.renderer) {
                // Limit pixel ratio - huge performance gain on retina
                vantaEffect.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                // Enable power preference for better battery/performance
                vantaEffect.renderer.powerPreference = 'high-performance';
              }
              // === VISIBILITY-BASED RENDERING ===
              // Stop WebGL when not visible (saves GPU/battery)
              var visObserver = new IntersectionObserver(function (entries) {
                isVisible = entries[0].isIntersecting;
                toggleRendering();
              }, { threshold: 0 });
              visObserver.observe(section);
              // Pause on tab switch
              document.addEventListener('visibilitychange', toggleRendering);
              // === INSTANT FADE IN ===
              container.style.opacity = '1';
            } catch (e) {
              console.warn('[Vanta] Init failed:', e);
            }
          }
          // === RENDERING CONTROL ===
          function toggleRendering() {
            if (!vantaEffect || !vantaEffect.renderer) return;
            if (isVisible && !document.hidden) {
              // Resume rendering
              vantaEffect.renderer.setAnimationLoop(vantaEffect.onUpdate.bind(vantaEffect));
            } else {
              // Pause rendering completely
              vantaEffect.renderer.setAnimationLoop(null);
            }
          }
          // === THEME SWITCHING (for product toggle) ===
          window.__vantaSwitchTheme = function (theme) {
            if (!vantaEffect || currentTheme === theme || !THEMES[theme]) return;
            currentTheme = theme;
            try {
              vantaEffect.setOptions(THEMES[theme]);
            } catch (e) { }
          };
          // === INTERSECTION OBSERVER SETUP ===
          // Only load scripts when section is approaching viewport
          function setup() {
            var section = document.getElementById('pillars-health-section');
            if (!section) return;
            // Large rootMargin = start loading BEFORE user sees section
            var observer = new IntersectionObserver(function (entries) {
              if (entries[0].isIntersecting) {
                observer.disconnect();
                // Scripts already prefetched by browser, this is instant
                loadAllScripts().then(initVanta);
              }
            }, {
              rootMargin: '500px 0px',  // Start loading 500px before visible
              threshold: 0
            });
            observer.observe(section);
          }
          // === IMMEDIATE SETUP ===
          // Don't wait for DOMContentLoaded - section element exists in DOM already
          if (document.getElementById('pillars-health-section')) {
            setup();
          } else {
            document.addEventListener('DOMContentLoaded', setup);
          }
        })();

/* ============================================
   Script Block 72 of 88
   Source: lines ~9643
   Type: REGULAR
   
   ============================================ */


        (function () {
          'use strict';
          // Main UI initialization
          document.addEventListener('DOMContentLoaded', function () {
            const section = document.getElementById('pillars-health-section');
            if (!section) return;
            const toggle = section.querySelector('.pillars-health__toggle');
            const toggleBtns = section.querySelectorAll('.pillars-health__toggle-btn');
            const contents = section.querySelectorAll('.pillars-health__content');
            const navItems = section.querySelectorAll('.pillars-health__nav-item');
            const panels = section.querySelectorAll('.pillars-health__panel-content');
            // Product toggle functionality
            toggleBtns.forEach(btn => {
              btn.addEventListener('click', function () {
                const product = this.dataset.product;
                // Update toggle state
                toggleBtns.forEach(b => {
                  b.classList.remove('pillars-health__toggle-btn--active');
                  b.setAttribute('aria-selected', 'false');
                  b.setAttribute('tabindex', '-1');
                });
                this.classList.add('pillars-health__toggle-btn--active');
                this.setAttribute('aria-selected', 'true');
                this.setAttribute('tabindex', '0');
                // Update indicator position
                toggle.dataset.active = product;
                // Switch theme class for dynamic background colors
                section.classList.remove('pillars-health--essentials', 'pillars-health--longevity');
                section.classList.add('pillars-health--' + product);
                section.dataset.activeProduct = product;
                // Morph Vanta.js colors to match new theme
                if (window.__vantaSwitchTheme) window.__vantaSwitchTheme(product);
                // Switch content panels
                contents.forEach(content => {
                  const isActive = content.dataset.content === product;
                  content.classList.toggle('pillars-health__content--active', isActive);
                  content.hidden = !isActive;
                });
              });
            });
            // Pillar navigation functionality
            navItems.forEach(item => {
              item.addEventListener('click', function () {
                const product = this.dataset.product;
                const index = this.dataset.index;
                // Update nav item states for this product
                navItems.forEach(nav => {
                  if (nav.dataset.product === product) {
                    const isActive = nav.dataset.index === index;
                    nav.classList.toggle('pillars-health__nav-item--active', isActive);
                    nav.setAttribute('aria-selected', isActive ? 'true' : 'false');
                  }
                });
                // Update panel content
                panels.forEach(panel => {
                  if (panel.dataset.product === product) {
                    const isActive = panel.dataset.panelIndex === index;
                    panel.classList.toggle('pillars-health__panel-content--active', isActive);
                  }
                });
              });
              // Keyboard navigation
              item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.click();
                }
                // Arrow key navigation
                const product = this.dataset.product;
                const currentIndex = parseInt(this.dataset.index);
                const productNavItems = Array.from(navItems).filter(nav => nav.dataset.product === product);
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  const nextIndex = (currentIndex + 1) % productNavItems.length;
                  productNavItems[nextIndex].focus();
                  productNavItems[nextIndex].click();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prevIndex = (currentIndex - 1 + productNavItems.length) % productNavItems.length;
                  productNavItems[prevIndex].focus();
                  productNavItems[prevIndex].click();
                }
              });
            });
          });
        })();

/* ============================================
   Script Block 73 of 88
   Source: lines ~10239
   Type: MODULE
   Attributes: type="module"
   ============================================ */

// Module script - preserved as-is

        // Simple lazy loading optimization that keeps original video functionality
        (() => {
          'use strict';
          // Mobile detection
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          // Simple video optimization
          const optimizeVideos = () => {
            const lazyVideos = document.querySelectorAll('.Index_object_experts_list_main_new video[data-lazy-video]');
            if (lazyVideos.length === 0) return;
            const videoObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const video = entry.target;
                  // Enable autoplay when video comes into view (both mobile and desktop)
                  if (video.paused) {
                    video.autoplay = true;
                    video.play().catch(() => { });
                  }
                  video.classList.add('video-loaded');
                  videoObserver.unobserve(video);
                }
              });
            }, { rootMargin: '50px' });
            lazyVideos.forEach(video => videoObserver.observe(video));
          };
          // Initialize Swiper (keeping original functionality)
          const initSwiper = () => {
            if (typeof Swiper === 'undefined') {
              setTimeout(initSwiper, 100);
              return;
            }
            new Swiper('.Index_object_experts_list_slider', {
              loop: false,
              grabCursor: false,
              spaceBetween: 16,
              slidesPerGroup: 1,
              slidesPerView: "auto",
              watchSlidesProgress: true,
              draggable: true,
              autoHeight: false,
              watchOverflow: true,
              threshold: 10,
              mousewheel: {
                forceToAxis: true
              },
              observer: true,
              observeParents: true,
              on: {
                init: function () {
                  // Initialize video optimization after Swiper
                  setTimeout(optimizeVideos, 100);
                }
              }
            });
          };
          // Initialize
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSwiper);
          } else {
            initSwiper();
          }
        })();

/* ============================================
   Script Block 74 of 88
   Source: lines ~10508
   Type: MODULE
   Attributes: type="module"
   ============================================ */

// Module script - preserved as-is

        // Simple lazy loading optimization for real results videos
        (() => {
          'use strict';
          // Mobile detection
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          // Simple video optimization
          const optimizeVideos = () => {
            const lazyVideos = document.querySelectorAll('.Index_object_real_results_main_new_1 video[data-lazy-video]');
            if (lazyVideos.length === 0) return;
            const videoObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const video = entry.target;
                  // Enable autoplay when video comes into view (both mobile and desktop)
                  if (video.paused) {
                    video.autoplay = true;
                    video.play().catch(() => { });
                  }
                  video.classList.add('video-loaded');
                  videoObserver.unobserve(video);
                }
              });
            }, { rootMargin: '50px' });
            lazyVideos.forEach(video => videoObserver.observe(video));
          };
          // Initialize Swiper with video optimization and mobile pull-to-refresh fix
          const initSwiper = () => {
            if (typeof Swiper === 'undefined') {
              setTimeout(initSwiper, 100);
              return;
            }
            // Mobile detection for pull-to-refresh prevention
            const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
            new Swiper('.Index_object_real_results_main_new_1 .Index_object_real_results_slider', {
              loop: true,
              grabCursor: false,
              spaceBetween: 16,
              slidesPerGroup: 1,
              slidesPerView: 5.7,
              watchSlidesProgress: true,
              centeredSlides: true,
              draggable: true,
              autoHeight: false,
              watchOverflow: true,
              threshold: isMobile ? 15 : 10, // Higher threshold on mobile to prevent conflicts
              mousewheel: {
                forceToAxis: true
              },
              speed: 10000,
              allowTouchMove: true,
              disableOnInteraction: false,
              autoplay: {
                delay: isMobile ? 100 : 0, // Small delay on mobile to prevent refresh conflicts
                disableOnInteraction: false
              },
              observer: true,
              observeParents: true,
              breakpoints: {
                0: {
                  slidesPerView: "auto",
                },
                750: {
                  slidesPerView: "auto",
                },
                990: {
                  slidesPerView: "auto",
                },
                1200: {
                  slidesPerView: 4,
                },
                1440: {
                  slidesPerView: 4.3,
                },
                1600: {
                  slidesPerView: 4.7,
                },
                1900: {
                  slidesPerView: 5.7,
                }
              },
              on: {
                init: function () {
                  // Initialize video optimization after Swiper
                  setTimeout(optimizeVideos, 100);
                  // Apply mobile pull-to-refresh prevention
                  if (isMobile) {
                    const swiperContainer = this.el;
                    if (swiperContainer) {
                      swiperContainer.style.touchAction = 'pan-x';
                      swiperContainer.style.overscrollBehavior = 'none';
                      swiperContainer.style.overscrollBehaviorY = 'none';
                    }
                  }
                }
              }
            });
          };
          // Initialize
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSwiper);
          } else {
            initSwiper();
          }
        })();

/* ============================================
   Script Block 75 of 88
   Source: lines ~13574
   Type: MODULE
   Attributes: type="module"
   ============================================ */

// Module script - preserved as-is

              // Swiper is now globally imported in theme.liquid
              if ($(window).width() > 749) {
                new Swiper('.Index_collection_slider', {
                  loop: false,
                  grabCursor: false,
                  spaceBetween: 16,
                  slidesPerGroup: 1,
                  slidesPerView: 3,
                  watchSlidesProgress: true,
                  draggable: !0,
                  autoHeight: !1,
                  watchOverflow: !0,
                  threshold: 10,
                  mousewheel: {
                    forceToAxis: !0
                  },
                  observer: true,
                  observeParents: true,
                })
              }

/* ============================================
   Script Block 76 of 88
   Source: lines ~14371
   Type: REGULAR
   
   ============================================ */


    const hsaModal = document.querySelector('.hsa-modal');
    const hsaModalClose = document.querySelector('.hsa-modal__close');
    const backdrop = document.querySelector('.hsa-modal__backdrop');
    hsaModalClose.addEventListener('click', () => {
      hsaModal.classList.remove('hsa-modal--open');
    });
    backdrop.addEventListener('click', () => {
      hsaModal.classList.remove('hsa-modal--open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hsaModal.classList.remove('hsa-modal--open');
      }
    });

/* ============================================
   Script Block 78 of 88
   Source: lines ~14431
   Type: REGULAR
   
   ============================================ */


          document.addEventListener('DOMContentLoaded', function () {
            const dropdownSelected = document.getElementById('sticky-buy-selected');
            const dropdownOptions = document.getElementById('sticky-buy-options');
            const selectedTitle = dropdownSelected.querySelector('.dropdown-selected__title');
            // Ensure the selected option is not a hidden variant (format-aware check)
            const ensureVisibleSelection = () => {
              const currentTitle = selectedTitle.textContent.trim();
              const currentOption = dropdownOptions.querySelector(`.dropdown-option[data-title="${currentTitle}"]`);
              console.log('[Hidden Variants Dropdown] Format-aware check:', {
                title: currentTitle,
                option: currentOption,
                display: currentOption ? window.getComputedStyle(currentOption).display : 'N/A',
                allOptions: Array.from(dropdownOptions.querySelectorAll('.dropdown-option')).map(opt => ({
                  title: opt.dataset.title,
                  variantId: opt.dataset.variantId,
                  display: window.getComputedStyle(opt).display
                }))
              });
              if (currentOption && window.getComputedStyle(currentOption).display === 'none') {
                console.log('[Hidden Variants Dropdown] Current selection is hidden for this format, finding replacement...');
                // Current selection is hidden by format-aware CSS, find first visible option
                const visibleOptions = Array.from(dropdownOptions.querySelectorAll('.dropdown-option')).filter(
                  opt => window.getComputedStyle(opt).display !== 'none'
                );
                console.log('[Hidden Variants Dropdown] Visible options for current format:', visibleOptions.length);
                if (visibleOptions.length > 0) {
                  const firstVisible = visibleOptions[0];
                  const firstVisibleAltName = firstVisible.dataset.altName || firstVisible.dataset.title;
                  console.log('[Hidden Variants Dropdown] Selecting first visible:', firstVisibleAltName);
                  selectedTitle.textContent = firstVisibleAltName;
                  // Sync with main form
                  window.stickyDropdownSelecting = true;
                  const mainPlanInput = document.querySelector(
                    'product-info input[data-option-value-id="' + firstVisible.dataset.optionValueId + '"]'
                  );
                  if (mainPlanInput) {
                    mainPlanInput.nextElementSibling.click();
                  }
                  requestAnimationFrame(() => {
                    window.stickyDropdownSelecting = false;
                  });
                }
              }
            };
            // Region-based variant selection
            // Priority: ?highlight=30day > region-based selection
            // US/UK: Prefer quarterly variant (unless highlight=30day)
            // Rest of World (including HK): Prefer double subscription variant (unless highlight=30day)
            const isQuarterlyRegion = true;
            const isHighlight30dayMode = document.documentElement.classList.contains('highlight-30day-mode');
            // If highlight=30day mode, select regular 30-day subscription in dropdown and reorder options
            if (isHighlight30dayMode) {
              console.log('[Highlight Mode Dropdown] 30-day highlight mode - selecting regular subscription');
              // Reorder dropdown options: move 30-day to top
              const allOptions = Array.from(dropdownOptions.querySelectorAll('.dropdown-option'));
              const regularOptions = allOptions.filter(opt =>
                !opt.dataset.quarterly && !opt.dataset.doubleSubscription
              );
              const premiumOptions = allOptions.filter(opt =>
                opt.dataset.quarterly || opt.dataset.doubleSubscription
              );
              // Clear and re-append in new order (One Time Purchase is no longer in dropdown)
              dropdownOptions.innerHTML = '';
              regularOptions.forEach(opt => dropdownOptions.appendChild(opt));
              premiumOptions.forEach(opt => dropdownOptions.appendChild(opt));
              if (regularOptions.length > 0) {
                const regularOption = regularOptions[0];
                const regularAltName = regularOption.dataset.altName || regularOption.dataset.title;
                console.log('[Highlight Mode Dropdown] Setting 30-day as default:', regularAltName);
                selectedTitle.textContent = regularAltName;
                // Sync with main form - let main form handle the selection
                // Don't duplicate the selection logic here
              }
            } else if (isQuarterlyRegion) {
              // US/UK: Check if quarterly variant exists and should be selected
              const quarterlyOption = dropdownOptions.querySelector('.dropdown-option[data-quarterly="true"]');
              if (quarterlyOption) {
                const quarterlyAltName = quarterlyOption.dataset.altName || quarterlyOption.dataset.title;
                console.log('[Quarterly Variant Dropdown] Found quarterly variant, setting as default (US/UK):', quarterlyAltName);
                selectedTitle.textContent = quarterlyAltName;
                // Sync with main form to select quarterly variant
                window.stickyDropdownSelecting = true;
                const mainQuarterlyInput = document.querySelector(
                  'product-info input[data-quarterly-variant="true"]'
                );
                if (mainQuarterlyInput && !mainQuarterlyInput.checked) {
                  console.log('[Quarterly Variant Dropdown] Syncing quarterly selection to main form');
                  mainQuarterlyInput.checked = true;
                  mainQuarterlyInput.dispatchEvent(new Event('change', { bubbles: true }));
                  const label = mainQuarterlyInput.nextElementSibling;
                  if (label) {
                    label.click();
                  }
                }
                requestAnimationFrame(() => {
                  window.stickyDropdownSelecting = false;
                });
              } else {
                // Run on initialization - fallback to hidden variant logic
                console.log('[Hidden Variants Dropdown] Initializing sticky-buy with format-aware logic...');
                ensureVisibleSelection();
              }
            } else {
              // Rest of World: Check if double subscription variant exists and is VISIBLE (not hidden by CSS)
              const doubleSubOption = dropdownOptions.querySelector('.dropdown-option[data-double-subscription="true"]');
              const doubleSubIsVisible = doubleSubOption && window.getComputedStyle(doubleSubOption).display !== 'none';
              if (doubleSubIsVisible) {
                const doubleSubAltName = doubleSubOption.dataset.altName || doubleSubOption.dataset.title;
                console.log('[Double Sub Variant Dropdown] Found visible double subscription variant, setting as default (Rest of World):', doubleSubAltName);
                selectedTitle.textContent = doubleSubAltName;
                // Sync with main form to select double subscription variant
                window.stickyDropdownSelecting = true;
                const mainDoubleSubInput = document.querySelector(
                  'product-info input[data-double-subscription="true"]'
                );
                if (mainDoubleSubInput && !mainDoubleSubInput.checked) {
                  console.log('[Double Sub Variant Dropdown] Syncing double subscription selection to main form');
                  mainDoubleSubInput.checked = true;
                  mainDoubleSubInput.dispatchEvent(new Event('change', { bubbles: true }));
                  const label = mainDoubleSubInput.nextElementSibling;
                  if (label) {
                    label.click();
                  }
                }
                requestAnimationFrame(() => {
                  window.stickyDropdownSelecting = false;
                });
              } else {
                // Double subscription is hidden - select regular subscription instead
                console.log('[Double Sub Hidden Dropdown] Double subscription is hidden, selecting regular subscription (Rest of World)');
                // Find first visible regular subscription option (not quarterly, not double sub)
                const regularOptions = Array.from(dropdownOptions.querySelectorAll('.dropdown-option')).filter(opt =>
                  !opt.dataset.quarterly &&
                  !opt.dataset.doubleSubscription &&
                  window.getComputedStyle(opt).display !== 'none'
                );
                if (regularOptions.length > 0) {
                  const regularOption = regularOptions[0];
                  const regularAltName = regularOption.dataset.altName || regularOption.dataset.title;
                  console.log('[Double Sub Hidden Dropdown] Setting regular subscription as default:', regularAltName);
                  selectedTitle.textContent = regularAltName;
                  // Sync with main form to select regular subscription
                  window.stickyDropdownSelecting = true;
                  const mainRegularInput = document.querySelector(
                    'product-info input[data-option-value-id="' + regularOption.dataset.optionValueId + '"]'
                  );
                  if (mainRegularInput && !mainRegularInput.checked) {
                    console.log('[Double Sub Hidden Dropdown] Syncing regular subscription selection to main form');
                    mainRegularInput.checked = true;
                    mainRegularInput.dispatchEvent(new Event('change', { bubbles: true }));
                    const label = mainRegularInput.nextElementSibling;
                    if (label) {
                      label.click();
                    }
                  }
                  requestAnimationFrame(() => {
                    window.stickyDropdownSelecting = false;
                  });
                } else {
                  // Fallback to hidden variant logic
                  console.log('[Hidden Variants Dropdown] Initializing sticky-buy with format-aware logic...');
                  ensureVisibleSelection();
                }
              }
            }
            // Re-check when format changes in main product form
            document.addEventListener('change', (e) => {
              if (e.target.matches('input[type="radio"][name*="Format"]')) {
                console.log('[Hidden Variants Dropdown] Format changed, re-checking visibility...');
                setTimeout(ensureVisibleSelection, 50);
              }
            });
            dropdownSelected.addEventListener('click', function (event) {
              event.stopPropagation();
              const isVisible = dropdownOptions.style.display === 'block';
              dropdownOptions.style.display = isVisible ? 'none' : 'block';
              dropdownSelected.classList.toggle('open', !isVisible)
            });
            document.addEventListener('click', function (event) {
              if (!event.target.closest('#sticky-buy-dropdown')) {
                dropdownOptions.style.display = 'none';
                dropdownSelected.classList.remove('open');
              }
            });
            dropdownOptions.addEventListener('click', function (event) {
              const option = event.target.closest('.dropdown-option');
              if (!option) return;
              // Use alt name for display, keep original title for data matching
              const altName = option.dataset.altName || option.dataset.title;
              selectedTitle.textContent = altName;
              dropdownOptions.style.display = 'none';
              dropdownSelected.classList.remove('open');
              // Generic behavior: mirror selection to main form using option value id
              window.stickyDropdownSelecting = true;
              const mainPlanInput = document.querySelector(
                'product-info input[data-option-value-id="' + option.dataset.optionValueId + '"]'
              );
              if (mainPlanInput) {
                mainPlanInput.nextElementSibling.click();
                // Use requestAnimationFrame for smoother, faster updates
                requestAnimationFrame(() => {
                  if (typeof window.updateStickyButtonPricing === 'function') {
                    window.updateStickyButtonPricing();
                  }
                  requestAnimationFrame(() => {
                    window.stickyDropdownSelecting = false;
                  });
                });
              } else {
                requestAnimationFrame(() => {
                  window.stickyDropdownSelecting = false;
                });
              }
            });
            document.addEventListener('click', function (event) {
              if (!event.target.closest('#sticky-buy-dropdown')) {
                dropdownOptions.style.display = 'none';
              }
            });
          });

/* ============================================
   Script Block 79 of 88
   Source: lines ~14660
   Type: REGULAR
   
   ============================================ */


    document.addEventListener('DOMContentLoaded', function () {
      const productFormStickyContainer = document.querySelector('.product-buy-sticky-container');
      const stickyVariantDropdown = document.getElementById('sticky-buy-dropdown');
      const stickyBuyButton = productFormStickyContainer.querySelector('.product-buy-sticky__button');
      const stickySpinner = productFormStickyContainer.querySelector('.loading__spinner');
      const mainBuyButton = document.querySelector('product-info button[type="submit"]');
      const isPreorderProduct = stickyBuyButton?.dataset?.preorder === 'true';
      document.addEventListener('change', function (event) {
        if (event.target.matches('product-info input[type="radio"]')) {
          const input = event.target;
          if (input.name.includes('Format')) {
            // update sticky product title
            const selectedFormat = event.target.value;
            const productTitleDiv = productFormStickyContainer.querySelector('.product-title__variant');
            const productTitle = productTitleDiv.dataset.title;
            productTitleDiv.textContent = `(${selectedFormat})`;
          } else if (input.name.includes('Plan')) {
            // Handle plan changes
            console.log('[STICKY] Plan changed to:', input.value, 'from main form');
            // If this change came from the sticky dropdown, don't update again to avoid loops
            if (window.stickyDropdownSelecting) {
              console.log('[STICKY] Change triggered by sticky dropdown, skipping sync back');
              return;
            }
            // Sync sticky dropdown with main form selection
            syncStickyDropdownWithMainForm(input.value);
            updateDropdownTitle();
            updateButtonText();
            updateButtonAvailability();
          }
        }
      });
      // Additional listeners for main form variant changes (including label clicks)
      document.addEventListener('click', function (event) {
        // Handle clicks on variant option labels in the main form
        if (event.target.closest('product-info .product-form__input--plan label')) {
          const label = event.target.closest('label');
          const input = document.querySelector(`#${label.getAttribute('for')}`);
          if (input && input.name.includes('Plan')) {
            console.log('[STICKY] Label clicked in main form for:', input.value);
            // If this is not from sticky dropdown, sync the dropdown
            if (!window.stickyDropdownSelecting) {
              requestAnimationFrame(() => {
                syncStickyDropdownWithMainForm(input.value);
                updateButtonText();
                updateButtonAvailability();
              });
            }
          }
        }
        // No special-case logic for any plan
      });
      // Enhanced change listener for all variant changes with debouncing
      let updateTimeout;
      document.addEventListener('change', function (event) {
        if (event.target.matches('product-info .product-form__input--plan input[type="radio"]')) {
          console.log('[STICKY] Plan change detected:', event.target.value);
          // Debounce updates to prevent multiple rapid changes
          if (updateTimeout) {
            clearTimeout(updateTimeout);
          }
          updateTimeout = setTimeout(() => {
            updateDropdownTitle();
            updateButtonText();
            updateButtonAvailability();
          }, 100);
        }
      });
      // Enhanced mutation observer to catch dynamic changes
      if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function (mutations) {
          let shouldUpdate = false;
          mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
              const target = mutation.target;
              if (target.checked) shouldUpdate = true;
            }
          });
          if (shouldUpdate) {
            requestAnimationFrame(() => {
              updateDropdownTitle();
              updateButtonText();
              updateButtonAvailability();
            });
          }
        });
        // Observe the main product form for changes
        const productForm = document.querySelector('product-info');
        if (productForm) {
          observer.observe(productForm, {
            attributes: true,
            attributeFilter: ['checked'],
            subtree: true
          });
        }
      }
      subscribe(PUB_SUB_EVENTS.cartUpdate, function () {
        toggleButtonDisabled(false);
      });
      subscribe(PUB_SUB_EVENTS.variantChange, function (event) {
        updateDropdownTitle();
        updateButtonText();
        updateButtonAvailability();
      });
      function syncStickyDropdownWithMainForm(selectedValue) {
        console.log('[STICKY] Syncing sticky dropdown with main form selection:', selectedValue);
        const dropdownTitle = stickyVariantDropdown.querySelector('.dropdown-selected__title');
        const dropdownPricePerServing = stickyVariantDropdown.querySelector('.dropdown-selected__price-per-serving');
        if (!dropdownTitle) return;
        // Generic: mirror the selected plan and its per-serving text if present
        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        if (selectedPlanInput) {
          const planTitle = selectedPlanInput.nextElementSibling?.querySelector('.variant_name_new');
          const planPricePerServing = selectedPlanInput.nextElementSibling?.querySelector('.variant_servings_price_new');
          dropdownTitle.textContent = planTitle ? planTitle.textContent.trim() : selectedValue;
          if (dropdownPricePerServing) dropdownPricePerServing.textContent = planPricePerServing ? planPricePerServing.textContent.trim() : '';
        }
        console.log('[STICKY] Sticky dropdown synced with main form');
      }
      function updateDropdownTitle() {
        // Skip update if we're currently processing a sticky dropdown selection
        if (window.stickyDropdownSelecting) {
          console.log('[STICKY] Skipping dropdown title update due to ongoing sticky selection');
          return;
        }
        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        const dropdownTitle = stickyVariantDropdown.querySelector('.dropdown-selected__title');
        const dropdownPricePerServing = stickyVariantDropdown.querySelector('.dropdown-selected__price-per-serving');
        if (!selectedPlanInput || !dropdownTitle) return;
        console.log('[STICKY] Updating dropdown title for:', selectedPlanInput.value);
        // Handle all options uniformly
        const planTitle = selectedPlanInput.nextElementSibling.querySelector('.variant_name_new');
        const planPricePerServing = selectedPlanInput.nextElementSibling.querySelector('.variant_servings_price_new');
        if (planTitle) dropdownTitle.textContent = planTitle.textContent.trim();
        if (planPricePerServing && dropdownPricePerServing) dropdownPricePerServing.textContent = planPricePerServing.textContent.trim();
      }
      function updateButtonText() {
        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        if (!selectedPlanInput) return;
        // If we're currently processing a sticky dropdown selection, use cached pricing
        if (window.stickyDropdownSelecting) return;
        const variantId = selectedPlanInput.dataset.variantId;
        const isQuarterly = window.isQuarterlyVariant && window.isQuarterlyVariant(variantId);
        const isDoubleSubscription = window.isDoubleSubscriptionVariant && window.isDoubleSubscriptionVariant(variantId);
        const isOneTime = window.isOneTimePurchaseVariant && window.isOneTimePurchaseVariant(variantId);
        // All variants that are NOT one-time purchase are subscriptions
        const isSubscription = !isOneTime;
        // Get variant price from productVariants
        const variant = window.productVariants?.find(v => v.id == parseInt(variantId));
        if (!variant) return;
        const priceSpan = stickyBuyButton.querySelector('.button-text-price');
        if (!priceSpan) return;
        if (isSubscription && window.formatMoney) {
          // Calculate monthly price based on subscription type
          let monthlyPrice = variant.price;
          if (isQuarterly) {
            // Quarterly: price / 3
            monthlyPrice = variant.price / 3;
          } else if (isDoubleSubscription) {
            // Check for custom monthly cost metafield
            if (window.doubleSubscriptionMonthlyCosts && window.doubleSubscriptionMonthlyCosts[variantId]) {
              monthlyPrice = window.doubleSubscriptionMonthlyCosts[variantId] * 100;
            } else {
              monthlyPrice = variant.price / 2;
            }
          }
          // Regular 30-day subscription: price is already monthly
          const formattedPrice = window.formatMoney(monthlyPrice);
          priceSpan.textContent = ` - ${formattedPrice}/mo`;
        } else if (window.formatMoney) {
          // One-time purchase: no /mo suffix
          const formattedPrice = window.formatMoney(variant.price);
          priceSpan.textContent = ` - ${formattedPrice}`;
        }
      }
      function updateButtonAvailability() {
        const mainBuyButton = document.querySelector('product-info button[type="submit"]');
        const isDisabled = mainBuyButton && mainBuyButton.hasAttribute('disabled');
        const desktopText = stickyBuyButton.querySelector('.text-desktop');
        const mobileText = stickyBuyButton.querySelector('.text-mobile');
        if (isDisabled) {
          stickyBuyButton.setAttribute('disabled', 'disabled');
          // Check if main button has sold out or unavailable text
          const mainButtonText = mainBuyButton.querySelector('span').textContent.trim();
          const isUnavailable = mainButtonText.toLowerCase().includes('unavailable');
          const isSoldOut = mainButtonText.toLowerCase().includes('sold out');
          if (isUnavailable) {
            desktopText.innerHTML = window.variantStrings?.unavailable || 'Unavailable';
            mobileText.textContent = window.variantStrings?.unavailable || 'Unavailable';
          } else if (isSoldOut) {
            desktopText.innerHTML = window.variantStrings?.soldOut || 'Sold out';
            mobileText.textContent = window.variantStrings?.soldOut || 'Sold out';
          }
        } else {
          stickyBuyButton.removeAttribute('disabled');
          // Restore normal button text with calculated monthly price
          const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
          const variantId = selectedPlanInput?.dataset?.variantId;
          const isQuarterly = window.isQuarterlyVariant && window.isQuarterlyVariant(variantId);
          const isDoubleSubscription = window.isDoubleSubscriptionVariant && window.isDoubleSubscriptionVariant(variantId);
          const isOneTime = window.isOneTimePurchaseVariant && window.isOneTimePurchaseVariant(variantId);
          // All variants that are NOT one-time purchase are subscriptions
          const isSubscription = !isOneTime;
          // Get variant price from productVariants
          const variant = window.productVariants?.find(v => v.id == parseInt(variantId));
          let priceHtml = '';
          if (variant && window.formatMoney) {
            if (isSubscription) {
              // Calculate monthly price based on subscription type
              let monthlyPrice = variant.price;
              if (isQuarterly) {
                // Quarterly: price / 3
                monthlyPrice = variant.price / 3;
              } else if (isDoubleSubscription) {
                if (window.doubleSubscriptionMonthlyCosts && window.doubleSubscriptionMonthlyCosts[variantId]) {
                  monthlyPrice = window.doubleSubscriptionMonthlyCosts[variantId] * 100;
                } else {
                  monthlyPrice = variant.price / 2;
                }
              }
              const formattedPrice = window.formatMoney(monthlyPrice);
              priceHtml = ` <span class="button-text-price"> - ${formattedPrice}/mo</span>`;
            } else {
              // One-time purchase: no /mo suffix
              const formattedPrice = window.formatMoney(variant.price);
              priceHtml = ` <span class="button-text-price"> - ${formattedPrice}</span>`;
            }
          } else {
            priceHtml = '<span class="button-text-price"></span>';
          }
          if (isPreorderProduct) {
            desktopText.innerHTML = 'Pre-order' + priceHtml;
            mobileText.textContent = 'Pre-order';
          } else {
            desktopText.innerHTML = 'Add to cart' + priceHtml;
            mobileText.textContent = 'Add';
          }
        }
      }
      // Initialize and handle potential Double Subscription pre-selection
      function initializeStickyDropdown() {
        console.log('[STICKY] Initializing sticky dropdown synchronization');
        // Get the currently selected plan option
        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        if (selectedPlanInput) {
          console.log('[STICKY] Found pre-selected plan on initialization:', selectedPlanInput.value);
          // Sync sticky dropdown with the pre-selected option
          syncStickyDropdownWithMainForm(selectedPlanInput.value);
        }
        // Initialize Format variant title for essentials (prevent flicker)
        const selectedFormatInput = document.querySelector('product-info .product-form__input--format input:checked');
        const productTitleVariant = productFormStickyContainer.querySelector('.product-title__variant');
        if (selectedFormatInput && productTitleVariant) {
          productTitleVariant.textContent = `(${selectedFormatInput.value})`;
          console.log('[STICKY] Initialized Format variant title:', selectedFormatInput.value);
        }
        // Update all content SYNCHRONOUSLY before reveal
        updateDropdownTitle();
        updateButtonText();
        updateButtonAvailability();
        // Force multiple reflows to ensure everything is painted
        void productFormStickyContainer.offsetHeight;
        void productFormStickyContainer.offsetWidth;
        // Remove the hidden class and make visible
        productFormStickyContainer.classList.remove('product-buy-sticky--hidden');
        // Use triple RAF to ensure no flash
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              // Trigger CSS animation by adding class
              productFormStickyContainer.classList.add('initialized');
              console.log('[STICKY] Bar revealed');
            });
          });
        });
      }
      initializeStickyDropdown();
      // Set up mutation observer to watch for radio button state changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
            const target = mutation.target;
            if (target.type === 'radio' && target.name.includes('Plan') && target.checked) {
              console.log('[STICKY] Radio button state changed via mutation observer:', target.value);
              // Only sync if this wasn't triggered by sticky dropdown
              if (!window.stickyDropdownSelecting && !window.preventVariantRevert) {
                requestAnimationFrame(() => {
                  syncStickyDropdownWithMainForm(target.value);
                  updateButtonText();
                  updateButtonAvailability();
                });
              }
            }
          }
        });
      });
      // Start observing radio buttons in the main form
      const mainFormRadios = document.querySelectorAll('product-info input[type="radio"][name*="Plan"]');
      mainFormRadios.forEach(radio => {
        observer.observe(radio, { attributes: true, attributeFilter: ['checked'] });
      });
      console.log('[STICKY] Mutation observer set up for', mainFormRadios.length, 'radio buttons');
      // Expose function globally for coordination with main form
      window.updateStickyButtonPricing = function () {
        console.log('[STICKY] Manually triggered price update');
        // Force update dropdown title first to ensure consistency (unless prevented)
        if (!window.preventVariantRevert) {
          updateDropdownTitle();
        }
        // Then update button text and availability
        updateButtonText();
        updateButtonAvailability();
        console.log('[STICKY] Price update cycle complete');
      };
      function toggleButtonDisabled(show) {
        const stickyButton = productFormStickyContainer.querySelector('.product-buy-sticky__button');
        if (show) {
          stickyButton.classList.add('disabled');
        } else {
          stickyButton.classList.remove('disabled');
        }
      }
      stickyBuyButton.addEventListener('click', function (event) {
        // Don't proceed if button is disabled
        if (stickyBuyButton.hasAttribute('disabled')) {
          event.preventDefault();
          return;
        }
        toggleButtonDisabled(true);
        mainBuyButton.click();
      });
    });

/* ============================================
   Script Block 80 of 88
   Source: lines ~15277
   Type: REGULAR
   
   ============================================ */


          window.ALBSS = {
            event_key: '44e91083-5d1c-42e9-86c5-b3bd3aa7322b'
          };

/* ============================================
   Script Block 82 of 88
   Source: lines ~15291
   Type: REGULAR
   
   ============================================ */


    window.shopUrl = 'https://im8health.com';
    window.routes = {
      cart_add_url: '/cart/add',
      cart_change_url: '/cart/change',
      cart_update_url: '/cart/update',
      cart_url: '/cart',
      predictive_search_url: '/search/suggest',
    };
    window.cartStrings = {
      error: `There was an error while updating your cart. Please try again.`,
      quantityError: `You can only add [quantity] of this item to your cart.`,
    };
    window.variantStrings = {
      addToCart: `Add to cart`,
      soldOut: `Sold out`,
      unavailable: `Unavailable`,
      unavailable_with_option: `[value] - Unavailable`,
    };
    window.quickOrderListStrings = {
      itemsAdded: `[quantity] items added`,
      itemAdded: `[quantity] item added`,
      itemsRemoved: `[quantity] items removed`,
      itemRemoved: `[quantity] item removed`,
      viewCart: `View cart`,
      each: `[money]/ea`,
      min_error: `This item has a minimum of [min]`,
      max_error: `This item has a maximum of [max]`,
      step_error: `You can only add this item in increments of [step]`,
    };
    window.accessibilityStrings = {
      imageAvailable: `Image [index] is now available in gallery view`,
      shareSuccess: `Link copied to clipboard`,
      pauseSlideshow: `Pause slideshow`,
      playSlideshow: `Play slideshow`,
      recipientFormExpanded: `Gift card recipient form expanded`,
      recipientFormCollapsed: `Gift card recipient form collapsed`,
      countrySelectorSearchCount: `[count] countries/regions found`,
    };
    window.storeConstants = {
      standardEssentials: 'Forever Jar',
      travelEssentials: 'Single-Serve Sachets',
      oneTimePurchase: 'One Time Purchase',
      freeGiftType: 'welcome_kit',
      countryCode: 'NL',
    }

/* ============================================
   Script Block 87 of 88
   Source: lines ~15356
   Type: REGULAR
   
   ============================================ */


    // customer not signed in to Shopify, sign out of Skio
    for (const [key, value] of Object.entries(window.localStorage)) {
      if (key.includes('CognitoIdentityServiceProvider')) {
        if (key.includes('LastAuthUser')) {
          window.localStorage.removeItem(key);
        }
      }
      window.localStorage.removeItem('storefrontUserId');
    }
    // if(window.location.pathname.startsWith('/a/account/login')) {
    //   //customer got to the Skio Login; redirect to Shopify login
    //   window.location.href = '/account/login';
    // }

/* ============================================
   Script Block 88 of 88
   Source: lines ~15376
   Type: REGULAR
   
   ============================================ */


      console.log("[Alia app extension] v1.0.5");
      const BACKEND_URL = "https://backend.alia-prod.com";
      window.ALIA_SHOPIFY_EXTENSION_INFO = {
        customerID: "",
        country: "NL",
        market: "euro",
        language: "en"
      }
      if (document.readyState !== "loading") {
        initAlia();
      } else {
        document.addEventListener("DOMContentLoaded", () => initAlia(), { once: true });
      }
      async function initAlia() {
        if (window.Shopify.designMode) {
          console.log("[Alia app extension] Not showing in Shopify theme editor");
          return;
        }
        const url = BACKEND_URL + "/public/launcher.js?shop=im8store.myshopify.com";
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.head.appendChild(script);
      }


/* ============================================
   Inline Event Handlers (Converted)
   Generated: Auto-converted from inline onclick
   ============================================ */

// Navigation handlers for expert carousel slides
document.addEventListener('DOMContentLoaded', function() {
  // Handle onclick navigation converted from inline handlers
  
  var elem_expert_nav_1 = document.getElementById('expert-nav-1');
  if (elem_expert_nav_1) {
    elem_expert_nav_1.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/dr-james-dinic';
    });
  }
  
  var elem_expert_nav_2 = document.getElementById('expert-nav-2');
  if (elem_expert_nav_2) {
    elem_expert_nav_2.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/dramy';
    });
  }
  
  var elem_expert_nav_3 = document.getElementById('expert-nav-3');
  if (elem_expert_nav_3) {
    elem_expert_nav_3.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/mona-sharma';
    });
  }
  
  var elem_expert_nav_4 = document.getElementById('expert-nav-4');
  if (elem_expert_nav_4) {
    elem_expert_nav_4.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/elissa-goodman';
    });
  }
  
  var elem_expert_nav_5 = document.getElementById('expert-nav-5');
  if (elem_expert_nav_5) {
    elem_expert_nav_5.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/dr-bertha-b';
    });
  }
  
  var elem_expert_nav_6 = document.getElementById('expert-nav-6');
  if (elem_expert_nav_6) {
    elem_expert_nav_6.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/dr-jen';
    });
  }
  
  var elem_expert_nav_7 = document.getElementById('expert-nav-7');
  if (elem_expert_nav_7) {
    elem_expert_nav_7.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/tim-biohacker';
    });
  }
  
  var elem_expert_nav_8 = document.getElementById('expert-nav-8');
  if (elem_expert_nav_8) {
    elem_expert_nav_8.addEventListener('click', function() {
      location.href = 'https://im8health.com/pages/dr-robin-b';
    });
  }

});
