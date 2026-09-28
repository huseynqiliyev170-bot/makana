/**
 * In-memory mock of makana-main/backend/server.py — mirrors its routes,
 * shapes and error `detail` texts exactly, so the Next.js integration test
 * exercises the real proxy contract without a local MongoDB/Python setup.
 * Dev-only tool: node tests/mock-backend.mjs
 */
import { createServer } from "node:http";
import crypto from "node:crypto";

const PORT = Number(process.env.MOCK_PORT || 8000);
const ADMIN_EMAIL = "admin@makana.az";
const ADMIN_PASSWORD = "Makana2025!";
const JWT_SECRET = "mock-secret";

const state = {
  users: [{ email: ADMIN_EMAIL, password_hash: ADMIN_PASSWORD, role: "admin" }],
  categories: [
    { id: "c1", slug: "scarves", name: { az: "İpək Yaylıqlar", en: "Silk Scarves", ru: "Шёлковые платки" }, icon: "Y", order: 1, active: true, created_at: new Date().toISOString() },
    { id: "c2", slug: "candles", name: { az: "Şamlar", en: "Candles", ru: "Свечи" }, icon: "Ş", order: 3, active: true, created_at: new Date().toISOString() },
  ],
  products: [
    { id: "p1", category_slug: "scarves", name: { az: "Zili Quşu", en: "Zili Bird", ru: "Птица Зили" }, sub: { az: "", en: "", ru: "" }, tag: { az: "90x90", en: "90x90", ru: "90х90" }, image_url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d", images: ["https://images.unsplash.com/photo-1606760227091-3dd870d97f1d"], price: 75, currency: "AZN", order: 1, active: true, created_at: new Date().toISOString() },
    { id: "p2", category_slug: "candles", name: { az: "Makana Candle", en: "Makana Candle", ru: "Makana Candle" }, sub: { az: "", en: "", ru: "" }, tag: { az: "", en: "", ru: "" }, image_url: "https://res.cloudinary.com/dn2jro6kd/image/upload/v1778360488/o6diujuiai6pg78goqum.jpg", images: ["https://res.cloudinary.com/dn2jro6kd/image/upload/v1778360488/o6diujuiai6pg78goqum.jpg"], price: 55, currency: "AZN", order: 2, active: true, created_at: new Date().toISOString() },
  ],
  settings: { hero_image: "https://res.cloudinary.com/dn2jro6kd/image/upload/v1779456912/qyrn20qmsuus1xefm3h1.jpg", about_image: "", lifestyle_image: "", whatsapp: "994998007154", instagram: "makanabyruh" },
};

function b64url(buf) { return Buffer.from(buf).toString("base64url"); }
function signToken(email) {
  const payload = b64url(JSON.stringify({ sub: email, exp: Date.now() + 86400000, type: "access" }));
  const sig = crypto.createHmac("sha256", JWT_SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}
function verifyToken(token) {
  const [payload, sig] = String(token || "").split(".");
  if (!payload || !sig) return null;
  const expect = crypto.createHmac("sha256", JWT_SECRET).update(payload).digest("base64url");
  if (expect !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.exp < Date.now()) return null;
    return data.sub;
  } catch { return null; }
}

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) });
  res.end(body);
}
function fail(res, status, detail) { send(res, status, { detail }); }
async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString()); } catch { return null; }
}
function normalizeImages(p) {
  let imgs = Array.isArray(p.images) ? p.images.filter(Boolean) : p.image_url ? [p.image_url] : [];
  const url = p.image_url || imgs[0] || "";
  if (url && imgs[0] !== url) imgs = [url, ...imgs.filter((i) => i !== url)];
  p.images = imgs;
  p.image_url = imgs[0] || "";
  return p;
}
const slugify = (s) => (String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || crypto.randomUUID().slice(0, 8));
const anyText = (n) => (typeof n === "string" ? n.trim() : n && typeof n === "object" ? Object.values(n).some((v) => String(v || "").trim()) : false);
function withCounts(cat) {
  const { _id, ...rest } = cat;
  return { ...rest, product_count: state.products.filter((p) => p.category_slug === cat.slug).length };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;
  const auth = req.headers.authorization || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const email = verifyToken(bearer);
  const needAuth = () => { if (!email) { fail(res, 401, "Not authenticated"); return false; } return true; };
  const body = method === "GET" || method === "DELETE" ? {} : await readBody(req);
  if (body === null) return fail(res, 400, "invalid json");

  // ---- public ----
  if (method === "GET" && path === "/api/categories") {
    return send(res, 200, state.categories.filter((c) => c.active).sort((a, b) => a.order - b.order).map((c) => ({ ...c })));
  }
  if (method === "GET" && path === "/api/products") {
    const cat = url.searchParams.get("category");
    let items = state.products.filter((p) => p.active && (!cat || p.category_slug === cat));
    items = items.slice().sort((a, b) => a.order - b.order).map((p) => normalizeImages({ ...p }));
    return send(res, 200, items);
  }
  if (method === "GET" && path === "/api/settings") return send(res, 200, { ...state.settings });

  // ---- auth ----
  if (method === "POST" && path === "/api/auth/login") {
    const u = state.users.find((x) => x.email === String(body.email || "").trim().toLowerCase());
    if (!u || u.password_hash !== body.password) return fail(res, 401, "Email və ya şifrə yanlışdır");
    return send(res, 200, { access_token: signToken(u.email), user: { email: u.email, role: u.role } });
  }
  if (method === "GET" && path === "/api/auth/me") {
    if (!needAuth()) return;
    const u = state.users.find((x) => x.email === email);
    if (!u) return fail(res, 401, "User not found");
    return send(res, 200, { email: u.email, role: u.role });
  }
  if (method === "POST" && path === "/api/auth/password") {
    if (!needAuth()) return;
    if (String(body.next || "").length < 6) return fail(res, 400, "Yeni şifrə ən azı 6 simvol olmalıdır");
    const u = state.users.find((x) => x.email === email);
    if (!u || u.password_hash !== body.current) return fail(res, 400, "Cari şifrə yanlışdır");
    u.password_hash = body.next;
    return send(res, 200, { ok: true });
  }

  // ---- admin categories ----
  if (method === "GET" && path === "/api/admin/categories/all") {
    if (!needAuth()) return;
    return send(res, 200, state.categories.slice().sort((a, b) => a.order - b.order).map((c) => ({ ...c })));
  }
  if (method === "POST" && path === "/api/admin/categories") {
    if (!needAuth()) return;
    if (!anyText(body.name)) return fail(res, 400, "Kategoriya adı boş ola bilməz");
    const nm = typeof body.name === "object" ? body.name.en || body.name.az : body.name;
    const slug = String(body.slug || "").trim().toLowerCase() || slugify(nm);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return fail(res, 400, "Slug yalnız kiçik latın hərfi, rəqəm və defisdən ibarət ola bilər");
    if (state.categories.some((c) => c.slug === slug)) return fail(res, 400, "Bu slug artıq mövcuddur");
    const cat = { id: crypto.randomUUID(), slug, name: body.name, icon: body.icon || "", order: body.order || 0, active: body.active !== false, created_at: new Date().toISOString() };
    state.categories.push(cat);
    return send(res, 201, withCounts(cat));
  }
  const catMatch = path.match(/^\/api\/admin\/categories\/([^/]+)$/);
  if (catMatch && method === "PUT") {
    if (!needAuth()) return;
    const cat = state.categories.find((c) => c.id === decodeURIComponent(catMatch[1]));
    if (!cat) return fail(res, 404, "Tapılmadı");
    if (!anyText(body.name)) return fail(res, 400, "Kategoriya adı boş ola bilməz");
    const upd = { ...body };
    const newSlug = upd.slug ? String(upd.slug).trim().toLowerCase() : null;
    delete upd.slug;
    if (newSlug && newSlug !== cat.slug) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug)) return fail(res, 400, "Slug yalnız kiçik latın hərfi, rəqəm və defisdən ibarət ola bilər");
      if (state.categories.some((c) => c.slug === newSlug && c.id !== cat.id)) return fail(res, 400, "Bu slug artıq mövcuddur");
      for (const p of state.products) if (p.category_slug === cat.slug) p.category_slug = newSlug;
      cat.slug = newSlug;
    }
    Object.assign(cat, upd);
    return send(res, 200, withCounts(cat));
  }
  if (catMatch && method === "DELETE") {
    if (!needAuth()) return;
    const cat = state.categories.find((c) => c.id === decodeURIComponent(catMatch[1]));
    if (!cat) return fail(res, 404, "Tapılmadı");
    for (const p of state.products) if (p.category_slug === cat.slug) p.active = false;
    state.categories = state.categories.filter((c) => c.id !== cat.id);
    return send(res, 200, { ok: true });
  }

  // ---- admin products ----
  if (method === "GET" && path === "/api/admin/products/all") {
    if (!needAuth()) return;
    const cat = url.searchParams.get("category");
    const items = state.products.filter((p) => !cat || p.category_slug === cat).slice().sort((a, b) => a.order - b.order).map((p) => normalizeImages({ ...p }));
    return send(res, 200, items);
  }
  if (method === "POST" && path === "/api/admin/products") {
    if (!needAuth()) return;
    if (!state.categories.some((c) => c.slug === body.category_slug)) return fail(res, 400, "Kategoriya tapılmadı");
    if (!anyText(body.name)) return fail(res, 400, "Məhsul adı boş ola bilməz");
    const p = normalizeImages({ ...body, id: crypto.randomUUID(), created_at: new Date().toISOString(), active: body.active !== false });
    state.products.push(p);
    return send(res, 201, { ...p });
  }
  const prodMatch = path.match(/^\/api\/admin\/products\/([^/]+)$/);
  if (prodMatch && method === "PUT") {
    if (!needAuth()) return;
    const p = state.products.find((x) => x.id === decodeURIComponent(prodMatch[1]));
    if (!p) return fail(res, 404, "Tapılmadı");
    if (!state.categories.some((c) => c.slug === body.category_slug)) return fail(res, 400, "Kategoriya tapılmadı");
    if (!anyText(body.name)) return fail(res, 400, "Məhsul adı boş ola bilməz");
    normalizeImages(Object.assign(p, body));
    return send(res, 200, { ...p });
  }
  if (prodMatch && method === "DELETE") {
    if (!needAuth()) return;
    const before = state.products.length;
    state.products = state.products.filter((x) => x.id !== decodeURIComponent(prodMatch[1]));
    if (state.products.length === before) return fail(res, 404, "Tapılmadı");
    return send(res, 200, { ok: true });
  }

  // ---- admin settings ----
  if (method === "PUT" && path === "/api/admin/settings") {
    if (!needAuth()) return;
    for (const k of ["hero_image", "about_image", "lifestyle_image", "whatsapp", "instagram"]) {
      if (typeof body[k] === "string" && body[k] !== "") state.settings[k] = body[k];
    }
    return send(res, 200, { ...state.settings });
  }

  fail(res, 404, `no mock route: ${method} ${path}`);
});

server.listen(PORT, () => console.log(`mock backend on http://127.0.0.1:${PORT}`));
