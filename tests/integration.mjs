/**
 * End-to-end smoke test against the built Next.js server. Verifies the real
 * wiring: storefront SSR reads the backend, /api/* is rewritten to the
 * backend, and the static admin panel (public/admin.html) is served and can
 * drive the API through the proxy with a Bearer token — exactly how admin.html
 * does it in the browser. Point NEXT_URL at a running server. Dev-only.
 */
const NEXT = process.env.NEXT_URL || "http://127.0.0.1:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@makana.az";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Makana2025!";

let pass = 0, fail = 0;
const fails = [];
function check(name, cond, extra) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; fails.push(name); console.log(`  ✗ ${name}${extra ? ` — ${extra}` : ""}`); }
}

let TOKEN = "";
async function call(path, { method = "GET", body, token = true, raw = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token && TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`${NEXT}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = raw ? await res.text() : await res.json().catch(() => null);
  return { status: res.status, data };
}

console.log("\n— Storefront (SSR from backend via proxy) —");
{
  const home = await call("/", { raw: true, token: false });
  check("GET / returns 200", home.status === 200, `got ${home.status}`);
  check("home renders a backend product", /Makana Candle|Zili Bird/.test(home.data), "no product found");
  const shop = await call("/shop", { raw: true, token: false });
  check("GET /shop returns 200", shop.status === 200, `got ${shop.status}`);
  check("shop renders a product", /Makana Candle|Zili Bird/.test(shop.data), "no product found");
}

console.log("\n— Public API proxied through Next —");
{
  const cats = await call("/api/categories", { token: false });
  check("GET /api/categories via :3000 → proxied to backend", cats.status === 200 && Array.isArray(cats.data), `status ${cats.status}`);
  const prods = await call("/api/products", { token: false });
  check("GET /api/products via :3000 → proxied", prods.status === 200 && Array.isArray(prods.data), `status ${prods.status}`);
  const settings = await call("/api/settings", { token: false });
  check("GET /api/settings via :3000 → proxied", settings.status === 200 && settings.data?.whatsapp, JSON.stringify(settings.data));
}

console.log("\n— Static admin panel is served —");
{
  const a1 = await call("/admin.html", { raw: true, token: false });
  check("GET /admin.html → 200", a1.status === 200, `got ${a1.status}`);
  check("admin.html is the Makana admin page", /Makana by Ruh — Admin|MAKANA/.test(a1.data) && /li-email/.test(a1.data), "not the admin page");
  const a2 = await call("/admin", { raw: true, token: false });
  check("GET /admin → serves admin.html", a2.status === 200 && /li-email/.test(a2.data), `got ${a2.status}`);
}

console.log("\n— Admin auth through the proxy (like admin.html) —");
{
  const bad = await call("/api/auth/login", { method: "POST", token: false, body: { email: ADMIN_EMAIL, password: "nope" } });
  check("wrong password → 401 with detail", bad.status === 401 && !!bad.data?.detail, JSON.stringify(bad.data));
  const ok = await call("/api/auth/login", { method: "POST", token: false, body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD } });
  check("correct login → access_token", ok.status === 200 && !!ok.data?.access_token, JSON.stringify(ok.data));
  TOKEN = ok.data?.access_token || "";
  const me = await call("/api/auth/me");
  check("GET /api/auth/me with Bearer → email", me.status === 200 && me.data?.email === ADMIN_EMAIL, JSON.stringify(me.data));
}

console.log("\n— Admin reads (proxied, authenticated) —");
{
  const all = await call("/api/admin/categories/all");
  check("GET /api/admin/categories/all → array", all.status === 200 && Array.isArray(all.data), `status ${all.status}`);
  const allP = await call("/api/admin/products/all");
  check("GET /api/admin/products/all → array", allP.status === 200 && Array.isArray(allP.data) && allP.data.length >= 2, `len ${allP.data?.length}`);
  const noAuth = await call("/api/admin/products/all", { token: false });
  check("admin endpoint without token → 401", noAuth.status === 401, `got ${noAuth.status}`);
}

console.log("\n— Admin CRUD (PUT contract, like admin.html) —");
let createdCatId = null, createdProdId = null;
{
  const cat = await call("/api/admin/categories", { method: "POST", body: { slug: "test-cat", name: { az: "Test", en: "Test", ru: "Тест" }, icon: "T", order: 99, active: true } });
  check("POST category → 201 with id", cat.status === 201 && !!cat.data?.id, JSON.stringify(cat.data));
  createdCatId = cat.data?.id;

  const dup = await call("/api/admin/categories", { method: "POST", body: { slug: "test-cat", name: { az: "x", en: "x", ru: "x" } } });
  check("duplicate slug → 400 with detail", dup.status === 400 && !!dup.data?.detail, JSON.stringify(dup.data));

  if (createdCatId) {
    const upd = await call(`/api/admin/categories/${createdCatId}`, { method: "PUT", body: { name: { az: "Test2", en: "Test2", ru: "Тест2" }, slug: "test-cat", icon: "T", order: 99, active: true } });
    check("PUT category → 200", upd.status === 200 && !!upd.data?.id, JSON.stringify(upd.data));
  }

  const prod = await call("/api/admin/products", { method: "POST", body: { category_slug: "test-cat", name: { az: "Yeni", en: "New", ru: "Новый" }, sub: {}, tag: {}, images: ["https://res.cloudinary.com/x/y.jpg"], image_url: "https://res.cloudinary.com/x/y.jpg", price: 10, order: 5, active: true } });
  check("POST product → 201 with id", prod.status === 201 && !!prod.data?.id, JSON.stringify(prod.data));
  createdProdId = prod.data?.id;
  check("created product normalizes images", prod.data?.images?.[0] === "https://res.cloudinary.com/x/y.jpg", JSON.stringify(prod.data?.images));

  if (createdProdId) {
    const put = await call(`/api/admin/products/${createdProdId}`, { method: "PUT", body: { category_slug: "test-cat", name: { az: "Yeni", en: "New", ru: "Новый" }, sub: {}, tag: {}, images: ["https://res.cloudinary.com/x/y.jpg"], image_url: "https://res.cloudinary.com/x/y.jpg", price: 12, order: 5, active: false } });
    check("PUT product → 200 & active:false applied", put.status === 200 && put.data?.active === false, JSON.stringify(put.data));
    const del = await call(`/api/admin/products/${createdProdId}`, { method: "DELETE" });
    check("DELETE product → 200 ok", del.status === 200 && del.data?.ok === true, JSON.stringify(del.data));
  }

  if (createdCatId) {
    const del = await call(`/api/admin/categories/${createdCatId}`, { method: "DELETE" });
    check("DELETE test category → 200 ok", del.status === 200 && del.data?.ok === true, JSON.stringify(del.data));
  }
}

console.log("\n— Settings update (proxied) —");
{
  const put = await call("/api/admin/settings", { method: "PUT", body: { whatsapp: "994000000000" } });
  check("PUT /api/admin/settings → updated whatsapp", put.status === 200 && put.data?.whatsapp === "994000000000", JSON.stringify(put.data));
}

console.log("\n— Password change (proxied) —");
{
  const wrong = await call("/api/auth/password", { method: "POST", body: { current: "bad", next: "newpass1" } });
  check("wrong current → 400 with detail", wrong.status === 400 && !!wrong.data?.detail, JSON.stringify(wrong.data));
  const short = await call("/api/auth/password", { method: "POST", body: { current: ADMIN_PASSWORD, next: "123" } });
  check("too short → 400 with detail", short.status === 400 && !!short.data?.detail, JSON.stringify(short.data));
}

console.log(`\n=== ${pass} passed, ${fail} failed ===`);
if (fail) { console.log("Failed:\n" + fails.map((f) => "  - " + f).join("\n")); process.exit(1); }
