/* Detergents Delivered — shared JS */
(function () {
  "use strict";

  const CART_KEY = "dd_cart_v1";
  // Demo ZIPs in currently served Chicagoland counties (McHenry, Kane, Cook examples) — not entire counties
  const DEMO_ZIPS = new Set([
    // McHenry County area
    "60050", "60051",
    // Kane County area
    "60120", "60123", "60174",
    // Cook County area
    "60601", "60602", "60603", "60604", "60605",
    "60016", "60018"
  ]);

  const PRODUCTS = [
    {
      id: "liquid-fresh-64",
      name: "Liquid Detergent · Fresh · 64 oz",
      type: "Liquid Detergent",
      category: "laundry",
      form: "Liquid",
      scent: "Fresh",
      emoji: "🧴",
      tag: "Bestseller",
      description: "Everyday liquid detergent with a clean fresh scent. Strong on stains, gentle on fabrics.",
      variants: [
        { id: "64oz", label: "64 oz (32 loads)", price: 11.99 },
        { id: "100oz", label: "100 oz (64 loads)", price: 19.99 },
        { id: "150oz", label: "150 oz (96 loads)", price: 27.99 }
      ]
    },
    {
      id: "liquid-lavender-100",
      name: "Liquid Detergent · Lavender · 100 oz",
      type: "Liquid Detergent",
      category: "laundry",
      form: "Liquid",
      scent: "Lavender",
      emoji: "🌿",
      tag: "Eco",
      description: "Plant-based liquid detergent with a calming lavender scent. Tough on dirt, gentle on skin.",
      variants: [
        { id: "64oz", label: "64 oz (35 loads)", price: 12.99 },
        { id: "100oz", label: "100 oz (66 loads)", price: 21.99 }
      ]
    },
    {
      id: "liquid-freeclear-60",
      name: "Liquid Detergent · Free & Clear · 60 oz",
      type: "Liquid Detergent",
      category: "laundry",
      form: "Liquid",
      scent: "Free & Clear",
      emoji: "🤍",
      tag: "Sensitive",
      description: "Dye-free and perfume-free liquid detergent. Formulated for sensitive skin.",
      variants: [
        { id: "60oz", label: "60 oz (32 loads)", price: 10.49 },
        { id: "120oz", label: "120 oz (64 loads)", price: 17.99 }
      ]
    },
    {
      id: "pods-freeclear-42",
      name: "Laundry Pods · Free & Clear · 42 ct",
      type: "Laundry Pods",
      category: "laundry",
      form: "Pods",
      scent: "Free & Clear",
      emoji: "🫧",
      tag: "Popular",
      description: "Pre-measured laundry pods with no dyes or heavy fragrances. Drop in and wash — no measuring.",
      variants: [
        { id: "16ct", label: "16 count", price: 9.49 },
        { id: "42ct", label: "42 count", price: 18.99 },
        { id: "81ct", label: "81 count", price: 29.99 }
      ]
    },
    {
      id: "pods-spring-48",
      name: "Laundry Pods · Spring · 48 ct",
      type: "Laundry Pods",
      category: "laundry",
      form: "Pods",
      scent: "Spring",
      emoji: "🌸",
      tag: null,
      description: "3-in-1 laundry pods with detergent, brightener, and a light spring scent that lasts.",
      variants: [
        { id: "25ct", label: "25 count", price: 11.99 },
        { id: "48ct", label: "48 count", price: 19.49 },
        { id: "112ct", label: "112 count", price: 34.99 }
      ]
    },
    {
      id: "powder-original-93",
      name: "Powder Detergent · Original · 93 oz",
      type: "Powder Detergent",
      category: "laundry",
      form: "Powder",
      scent: "Original",
      emoji: "📦",
      tag: "Value",
      description: "Classic powder detergent with baking-soda odor control. Great value for large households.",
      variants: [
        { id: "50oz", label: "50 oz (50 loads)", price: 8.99 },
        { id: "93oz", label: "93 oz (93 loads)", price: 16.49 }
      ]
    },
    {
      id: "softener-spring-50",
      name: "Fabric Softener · Spring · 50 oz",
      type: "Fabric Softener",
      category: "laundry",
      form: "Softener",
      scent: "Spring",
      emoji: "💧",
      tag: null,
      description: "Liquid fabric softener that leaves clothes soft, static-free, and lightly scented.",
      variants: [
        { id: "34oz", label: "34 oz (51 loads)", price: 7.99 },
        { id: "50oz", label: "50 oz (77 loads)", price: 10.99 },
        { id: "77oz", label: "77 oz (120 loads)", price: 14.99 }
      ]
    },
    {
      id: "softener-cleanlinen-64",
      name: "Fabric Softener · Clean Linen · 64 oz",
      type: "Fabric Softener",
      category: "laundry",
      form: "Softener",
      scent: "Clean Linen",
      emoji: "🧺",
      tag: null,
      description: "Affordable fabric softener with a clean linen scent for everyday loads.",
      variants: [
        { id: "32oz", label: "32 oz", price: 3.99 },
        { id: "64oz", label: "64 oz", price: 6.49 }
      ]
    },
    {
      id: "beads-cleanlinen-18",
      name: "Scent Beads · Clean Linen · 18 oz",
      type: "Scent Beads",
      category: "laundry",
      form: "Beads",
      scent: "Clean Linen",
      emoji: "✨",
      tag: "New",
      description: "In-wash scent beads that keep fabrics smelling fresh for weeks. Toss in with your detergent.",
      variants: [
        { id: "18oz", label: "18 oz", price: 9.99 },
        { id: "26oz", label: "26 oz", price: 15.99 }
      ]
    },
    {
      id: "beads-fresh-14",
      name: "Scent Beads · Fresh · 14 oz",
      type: "Scent Beads",
      category: "laundry",
      form: "Beads",
      scent: "Fresh",
      emoji: "🌙",
      tag: null,
      description: "Scent-boosting beads with a crisp fresh fragrance. Use with any detergent.",
      variants: [
        { id: "14oz", label: "14 oz", price: 8.99 },
        { id: "26oz", label: "26 oz", price: 14.99 }
      ]
    },
    {
      id: "dish-citrus-28",
      name: "Dish Detergent · Citrus · 28 oz",
      type: "Dish Detergent",
      category: "dish",
      form: "Liquid",
      scent: "Citrus",
      emoji: "🍽️",
      tag: null,
      description: "Grease-cutting dish detergent with a bright citrus scent. Concentrated formula for hand washing.",
      variants: [
        { id: "16oz", label: "16 oz", price: 4.49 },
        { id: "28oz", label: "28 oz", price: 5.99 },
        { id: "56oz", label: "56 oz", price: 9.99 }
      ]
    },
    {
      id: "dishwasher-fresh-45",
      name: "Dishwasher Pods · Fresh · 45 ct",
      type: "Dishwasher Pods",
      category: "dish",
      form: "Pods",
      scent: "Fresh",
      emoji: "🔆",
      tag: null,
      description: "All-in-one dishwasher pods for spotless plates and glasses — even in hard water.",
      variants: [
        { id: "20ct", label: "20 count", price: 8.99 },
        { id: "45ct", label: "45 count", price: 16.99 },
        { id: "82ct", label: "82 count", price: 26.99 }
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
        type: item.type,
        form: item.form,
        scent: item.scent,
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
      return {
        ok: true,
        msg: "Good news — we deliver to " + z + ". We serve select counties in the Chicagoland area (currently McHenry, Kane & Cook examples). Weekly scheduled windows set by the business (e.g. Tue/Thu) — not same-day or on-demand."
      };
    }
    return {
      ok: false,
      msg: "We don’t deliver to " + z + ". We serve select counties in the Chicagoland area — currently McHenry, Kane & Cook as active examples (expandable). Weekly scheduled routes — not same-day or on-demand. Try a demo ZIP like 60050, 60120, or 60601."
    };
  }

  function productCardHTML(p) {
    const price = p.variants[0].price;
    const tag = p.tag ? `<span class="badge-tag">${p.tag}</span>` : "";
    return `
      <article class="product-card" data-type="${p.type}" data-category="${p.category}" data-form="${p.form}" data-scent="${p.scent}">
        <a href="product.html?id=${encodeURIComponent(p.id)}" class="thumb" aria-label="${p.name}">
          ${tag}
          <span aria-hidden="true">${p.emoji}</span>
        </a>
        <div class="body">
          <div class="brand">${p.type} · ${p.form}</div>
          <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
          <div class="meta">${p.scent} · ${p.category}</div>
          <div class="price-row">
            <div class="price">${money(price)} <small>from</small></div>
            <a class="btn btn-primary btn-sm" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
          </div>
        </div>
      </article>`;
  }

  function logoMark() {
    return `<img src="logo.png" alt="Detergents Delivered" width="105" height="44" decoding="async" />`;
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
        Select Chicagoland counties · Weekly scheduled routes · Windows set by business (e.g. Tue/Thu) · Not same-day · <a href="delivery.html">Check your ZIP</a>
      </div>
      <div class="site-header">
        <div class="container nav">
          <a class="logo" href="index.html">${logoMark()}</a>
          <ul class="nav-links">
            <li>${navLink("shop.html", "Shop")}</li>
            <li>${navLink("delivery.html", "Delivery")}</li>
            <li>${navLink("faq.html", "FAQ")}</li>
            <li>${navLink("contact.html", "Contact")}</li>
          </ul>
          <div class="nav-actions">
            <a class="btn btn-primary btn-sm nav-signin" href="sign-in.html">Sign in</a>
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
          <a href="sign-in.html" class="mobile-signin">Sign in</a>
          ${navLink("account.html", "Account")}
          ${navLink("faq.html", "FAQ")}
          ${navLink("contact.html", "Contact")}
          ${navLink("cart.html", "Cart")}
          ${navLink("admin.html", "Admin (demo)")}
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
            <a class="logo logo-footer" href="index.html">${logoMark()}</a>
            <p>We serve select counties in the Chicagoland area — currently McHenry, Kane &amp; Cook as examples. Weekly scheduled windows set by the business (e.g. Tue/Thu) — not same-day or on-demand.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="shop.html">All products</a>
            <a href="shop.html?category=laundry">Laundry</a>
            <a href="shop.html?type=Liquid%20Detergent">Liquid detergent</a>
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
            <h4>Account</h4>
            <a href="sign-in.html">Sign in</a>
            <a href="account.html">Account</a>
            <a href="admin.html">Admin</a>
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
