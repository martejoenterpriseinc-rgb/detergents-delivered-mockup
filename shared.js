/* Detergents Delivered — shared JS */
(function () {
  "use strict";

  const CART_KEY = "dd_cart_v1";
  const DEMO_ZIPS = new Set([
    "60601", "60602", "60603", "60604", "60605",
    "75201", "75202", "75203", "75204", "75205",
    "77001", "77002", "77003", "77004", "77005",
    "10001", "10002", "10003", "90210", "94102"
  ]);

  const PRODUCTS = [
    {
      id: "tide-liquid-orig",
      name: "Tide Original Liquid Detergent",
      brand: "Tide",
      category: "liquid",
      scent: "Original",
      emoji: "🧴",
      tag: "Bestseller",
      description: "America's #1 detergent. Powerful stain removal in every wash with a classic fresh scent.",
      variants: [
        { id: "50oz", label: "50 oz (32 loads)", price: 11.99 },
        { id: "100oz", label: "100 oz (64 loads)", price: 19.99 },
        { id: "150oz", label: "150 oz (96 loads)", price: 27.99 }
      ]
    },
    {
      id: "tide-pods-spring",
      name: "Tide PODS Spring Meadow",
      brand: "Tide",
      category: "pods",
      scent: "Spring Meadow",
      emoji: "🫧",
      tag: "Popular",
      description: "Pre-measured PAC pods with detergent, stain remover, and brightener in one. No measuring, no mess.",
      variants: [
        { id: "16ct", label: "16 count", price: 9.49 },
        { id: "42ct", label: "42 count", price: 18.99 },
        { id: "81ct", label: "81 count", price: 29.99 }
      ]
    },
    {
      id: "persil-proclean",
      name: "Persil ProClean Liquid",
      brand: "Persil",
      category: "liquid",
      scent: "Fresh Scent",
      emoji: "💙",
      tag: null,
      description: "Deep clean technology that removes 40 tough stains. Trusted by European families for generations.",
      variants: [
        { id: "65oz", label: "65 oz (40 loads)", price: 13.49 },
        { id: "100oz", label: "100 oz (62 loads)", price: 18.99 }
      ]
    },
    {
      id: "armhammer-powder",
      name: "Arm & Hammer Clean Burst Powder",
      brand: "Arm & Hammer",
      category: "powder",
      scent: "Clean Burst",
      emoji: "📦",
      tag: "Value",
      description: "Baking soda powered cleaning that fights odors and leaves clothes fresh. Great value for large families.",
      variants: [
        { id: "50lb", label: "50 loads", price: 8.99 },
        { id: "120lb", label: "120 loads", price: 16.49 }
      ]
    },
    {
      id: "gain-flings",
      name: "Gain Flings Moonlight Breeze",
      brand: "Gain",
      category: "pods",
      scent: "Moonlight Breeze",
      emoji: "🌙",
      tag: null,
      description: "3-in-1 laundry pacs with Oxi Boost and Febreze. Irresistible scent that lasts for weeks.",
      variants: [
        { id: "25ct", label: "25 count", price: 11.99 },
        { id: "48ct", label: "48 count", price: 19.49 },
        { id: "112ct", label: "112 count", price: 34.99 }
      ]
    },
    {
      id: "downy-ultra",
      name: "Downy Ultra Softener April Fresh",
      brand: "Downy",
      category: "softener",
      scent: "April Fresh",
      emoji: "🌸",
      tag: null,
      description: "Leaves clothes soft, static-free, and smelling fresh. Concentrated formula lasts longer.",
      variants: [
        { id: "34oz", label: "34 oz (51 loads)", price: 7.99 },
        { id: "51oz", label: "51 oz (77 loads)", price: 10.99 },
        { id: "77oz", label: "77 oz (120 loads)", price: 14.99 }
      ]
    },
    {
      id: "downy-unstopables",
      name: "Downy Unstopables Scent Beads",
      brand: "Downy",
      category: "beads",
      scent: "Fresh",
      emoji: "✨",
      tag: "New",
      description: "In-wash scent boosters that keep fabrics smelling fresh for up to 12 weeks. Just toss in with detergent.",
      variants: [
        { id: "14oz", label: "14.8 oz", price: 9.99 },
        { id: "26oz", label: "26.5 oz", price: 15.99 }
      ]
    },
    {
      id: "method-lavender",
      name: "Method Lavender Liquid Detergent",
      brand: "Method",
      category: "liquid",
      scent: "Lavender",
      emoji: "🌿",
      tag: "Eco",
      description: "Plant-based formula in a stylish bottle. Tough on dirt, gentle on the planet. Hypoallergenic.",
      variants: [
        { id: "53oz", label: "53.5 oz (35 loads)", price: 12.99 },
        { id: "100oz", label: "100 oz (66 loads)", price: 21.99 }
      ]
    },
    {
      id: "dawn-platinum",
      name: "Dawn Platinum Dish Soap",
      brand: "Dawn",
      category: "dish",
      scent: "Refreshing Rain",
      emoji: "🍽️",
      tag: null,
      description: "3x more grease cleaning power. Cuts through stuck-on food. Also trusted for wildlife rescue.",
      variants: [
        { id: "16oz", label: "16.2 oz", price: 4.49 },
        { id: "24oz", label: "24 oz", price: 5.99 },
        { id: "56oz", label: "56 oz", price: 9.99 }
      ]
    },
    {
      id: "finish-quantum",
      name: "Finish Quantum Dishwasher Pods",
      brand: "Finish",
      category: "dish",
      scent: "Fresh",
      emoji: "🔆",
      tag: null,
      description: "Pre-soakers + scrubbers + glass protectors. Spotless dishes even in hard water.",
      variants: [
        { id: "20ct", label: "20 count", price: 8.99 },
        { id: "45ct", label: "45 count", price: 16.99 },
        { id: "82ct", label: "82 count", price: 26.99 }
      ]
    },
    {
      id: "all-free-clear",
      name: "all free clear Liquid Detergent",
      brand: "all",
      category: "liquid",
      scent: "Unscented",
      emoji: "🤍",
      tag: "Sensitive",
      description: "Dermatologist-recommended. Free of dyes and perfumes. Gentle enough for sensitive skin.",
      variants: [
        { id: "60oz", label: "60 oz (32 loads)", price: 10.49 },
        { id: "120oz", label: "120 oz (64 loads)", price: 17.99 }
      ]
    },
    {
      id: "snuggle-blue",
      name: "Snuggle Blue Sparkle Softener",
      brand: "Snuggle",
      category: "softener",
      scent: "Blue Sparkle",
      emoji: "🐻",
      tag: null,
      description: "Softness and lasting freshness your family will love. Affordable comfort in every load.",
      variants: [
        { id: "32oz", label: "32 oz", price: 3.99 },
        { id: "64oz", label: "64 oz", price: 6.49 }
      ]
    }
  ];

  function money(n) {
    return "$" + Number(n).toFixed(2);
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function cartCount() {
    return getCart().reduce((s, i) => s + i.qty, 0);
  }

  function cartSubtotal() {
    return getCart().reduce((s, i) => s + i.price * i.qty, 0);
  }

  function updateCartBadge() {
    const n = cartCount();
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = String(n);
      el.classList.toggle("show", n > 0);
    });
  }

  function addToCart(item) {
    const cart = getCart();
    const key = item.id + "::" + item.variantId;
    const existing = cart.find((c) => c.id + "::" + c.variantId === key);
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      cart.push({
        id: item.id,
        variantId: item.variantId,
        name: item.name,
        brand: item.brand,
        variantLabel: item.variantLabel,
        price: item.price,
        emoji: item.emoji,
        qty: item.qty || 1
      });
    }
    saveCart(cart);
    toast("Added to cart");
  }

  function setQty(id, variantId, qty) {
    let cart = getCart();
    cart = cart
      .map((c) => {
        if (c.id === id && c.variantId === variantId) {
          return { ...c, qty: Math.max(0, qty) };
        }
        return c;
      })
      .filter((c) => c.qty > 0);
    saveCart(cart);
  }

  function removeItem(id, variantId) {
    saveCart(getCart().filter((c) => !(c.id === id && c.variantId === variantId)));
    toast("Removed from cart");
  }

  function clearCart() {
    saveCart([]);
  }

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function checkZip(zip) {
    const z = String(zip || "").trim();
    if (!/^\d{5}$/.test(z)) return { ok: false, msg: "Enter a valid 5-digit ZIP code." };
    if (DEMO_ZIPS.has(z)) {
      return { ok: true, msg: "Great news — we deliver to " + z + "! Same-day and next-day options available." };
    }
    return {
      ok: false,
      msg: "We're not in " + z + " yet. Try a demo ZIP like 60601, 75201, or 77001 — or check back soon as we expand."
    };
  }

  function productCardHTML(p) {
    const price = p.variants[0].price;
    const tag = p.tag ? `<span class="badge-tag">${p.tag}</span>` : "";
    return `
      <article class="product-card" data-brand="${p.brand}" data-category="${p.category}">
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="thumb" aria-label="${p.name}">
          ${tag}
          <span aria-hidden="true">${p.emoji}</span>
        </a>
        <div class="body">
          <div class="brand">${p.brand}</div>
          <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
          <div class="meta">${p.scent} · ${p.category}</div>
          <div class="price-row">
            <div class="price">${money(price)} <small>from</small></div>
            <a class="btn btn-primary btn-sm" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
          </div>
        </div>
      </article>`;
  }

  function logoSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 56" role="img" aria-label="Detergents Delivered" height="40">
  <defs>
    <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <circle cx="28" cy="28" r="24" fill="url(#lg)"/>
  <path d="M18 30c0-6 4-12 10-14 2 4 4 8 4 12 0 4-2 8-4 10-6-2-10-5-10-8z" fill="#fff" opacity=".95"/>
  <path d="M28 16c6 2 10 8 10 14s-4 10-10 12c2-4 4-8 4-12s-2-8-4-14z" fill="#e0f2fe" opacity=".9"/>
  <path d="M42 22h10l-2 4h8l-14 16 3-8h-7z" fill="#fbbf24"/>
  <text x="62" y="24" font-family="system-ui,Segoe UI,sans-serif" font-size="16" font-weight="700" fill="#0f172a">Detergents</text>
  <text x="62" y="42" font-family="system-ui,Segoe UI,sans-serif" font-size="16" font-weight="600" fill="#0284c7">Delivered</text>
</svg>`;
  }

  function currentPage() {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    return path === "" ? "index.html" : path;
  }

  function navLink(href, label) {
    const active = currentPage() === href ? " active" : "";
    return `<a href="${href}" class="${active.trim()}">${label}</a>`;
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = `
      <div class="topbar">
        Free delivery on orders $35+ · <a href="delivery.html">Check your ZIP</a>
      </div>
      <div class="site-header">
        <div class="container nav">
          <a class="logo" href="index.html">${logoSVG()}</a>
          <ul class="nav-links">
            <li>${navLink("shop.html", "Shop")}</li>
            <li>${navLink("delivery.html", "Delivery")}</li>
            <li>${navLink("faq.html", "FAQ")}</li>
            <li>${navLink("contact.html", "Contact")}</li>
          </ul>
          <div class="nav-actions">
            <a class="icon-btn" href="account.html" aria-label="Account" title="Account">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>
            </a>
            <a class="icon-btn" href="cart.html" aria-label="Cart" title="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 3H2"/></svg>
              <span class="cart-badge">0</span>
            </a>
            <button class="menu-toggle" type="button" aria-label="Menu" id="menu-toggle"><span></span></button>
          </div>
        </div>
        <div class="mobile-nav container" id="mobile-nav">
          ${navLink("index.html", "Home")}
          ${navLink("shop.html", "Shop")}
          ${navLink("delivery.html", "Delivery Areas")}
          ${navLink("account.html", "Account")}
          ${navLink("faq.html", "FAQ")}
          ${navLink("contact.html", "Contact")}
          ${navLink("cart.html", "Cart")}
        </div>
      </div>`;
    const toggle = document.getElementById("menu-toggle");
    const mobile = document.getElementById("mobile-nav");
    if (toggle && mobile) {
      toggle.addEventListener("click", () => mobile.classList.toggle("open"));
    }
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="logo" href="index.html" style="margin-bottom:1rem;display:inline-block;filter:brightness(1.2)">${logoSVG()}</a>
            <p>Household essentials delivered to your door. Clean, convenient, and always on time.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="shop.html">All products</a>
            <a href="shop.html?category=liquid">Liquid detergent</a>
            <a href="shop.html?category=pods">Pods &amp; pacs</a>
            <a href="shop.html?category=dish">Dish care</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="delivery.html">Delivery areas</a>
            <a href="faq.html">FAQ</a>
            <a href="contact.html">Contact us</a>
            <a href="refunds.html">Refunds</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="terms.html">Terms of service</a>
            <a href="privacy.html">Privacy policy</a>
            <a href="refunds.html">Refund policy</a>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© 2026 Detergents Delivered. UI mockup preview — not the production app.</span>
          <span>Preview for detergentsdelivered.com</span>
        </div>
      </footer>`;
  }

  window.DD = {
    PRODUCTS,
    DEMO_ZIPS,
    money,
    getCart,
    saveCart,
    cartCount,
    cartSubtotal,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    findProduct,
    toast,
    checkZip,
    productCardHTML,
    updateCartBadge
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    updateCartBadge();
  });
})();
