import type { Lang } from "./types";

export interface TestimonialItem {
  t: string;
  n: string;
  c: string;
}

export interface Dictionary {
  "brand.sub": string;
  "nav.about": string;
  "nav.coll": string;
  "nav.shop": string;
  "nav.gallery": string;
  "nav.contact": string;
  "nav.cta": string;
  "hero.kick": string;
  "hero.l1": string;
  "hero.l2": string;
  "hero.l3": string;
  "hero.desc": string;
  "hero.cta1": string;
  "hero.cta2": string;
  "hero.scroll": string;
  "marq": string[];
  "about.tag": string;
  "about.title": string;
  "about.p1": string;
  "about.p2": string;
  "about.quote": string;
  "about.author": string;
  "about.founded": string;
  "about.s1": string;
  "about.s2": string;
  "about.s3": string;
  "about.cta": string;
  "about.more": string;
  "ab.kick": string;
  "ab.title": string;
  "ab.lead": string;
  "ab.story": string[];
  "ab.sign": string;
  "ab.welcome": string;
  "ab.alt": string;
  "coll.tag": string;
  "coll.title": string;
  "coll.lead": string;
  "coll.count": string;
  "shop.tag": string;
  "shop.title": string;
  "shop.lead": string;
  "shop.search": string;
  "shop.all": string;
  "shop.count": string;
  "shop.more": string;
  "shop.empty": string;
  "shop.empty2": string;
  "shop.reset": string;
  "shop.tab.all": string;
  "sort.default": string;
  "sort.asc": string;
  "sort.desc": string;
  "sort.new": string;
  "nav.search": string;
  "search.ph": string;
  "search.popular": string;
  "search.results": string;
  "search.none": string;
  "search.all": string;
  "search.hint": string;
  "sp.title": string;
  "sp.sub": string;
  "sp.home": string;
  "sp.filters": string;
  "sp.category": string;
  "sp.price": string;
  "sp.clear": string;
  "sp.apply": string;
  "sp.any": string;
  "ft.title": string;
  "ft.sub": string;
  "ft.cta": string;
  "gal.tag": string;
  "gal.title": string;
  "gal.lead": string;
  "testi.tag": string;
  "testi.title": string;
  "testi.lead": string;
  "testi": TestimonialItem[];
  "ig.tag": string;
  "ig.title": string;
  "ig.cta": string;
  "ct.tag": string;
  "ct.title": string;
  "ct.desc": string;
  "ct.loc": string;
  "ct.loc2": string;
  "ct.ship": string;
  "ct.ship2": string;
  "form.title": string;
  "form.sub": string;
  "form.name": string;
  "form.phone": string;
  "form.product": string;
  "form.msg": string;
  "form.send": string;
  "form.note": string;
  "form.any": string;
  "form.other": string;
  "chips": string[];
  "foot.desc": string;
  "foot.menu": string;
  "foot.cats": string;
  "foot.contact": string;
  "foot.hours": string;
  "foot.txt": string;
  "wa.order": string;
  "wa.short": string;
  "lb.incl": string;
  "lb.ask": string;
  "lb.close": string;
  "lb.prev": string;
  "lb.next": string;
  "mg.hint": string;
  "lb.b": string[];
  "toast.open": string;
  "toast.fill": string;
  "cur.view": string;
  "cur.wa": string;
  "cur.ig": string;
  "cur.zoom": string;
  "wa.intro": string;
  "wa.name": string;
  "wa.phone": string;
  "wa.product": string;
  "wa.msg": string;
}

export const dictionaries: Record<Lang, Dictionary> = {
  az: {
    "brand.sub": "by Ruh · Bakı",
    "nav.about": "Haqqımızda",
    "nav.coll": "Kolleksiyalar",
    "nav.shop": "Mağaza",
    "nav.gallery": "Qalereya",
    "nav.contact": "Əlaqə",
    "nav.cta": "Sifariş Et",
    "hero.kick": "Bakı, Azərbaycan · Əl işi kolleksiyalar",
    "hero.l1": "İpəkdə",
    "hero.l2": "<em>irsin</em> izi,",
    "hero.l3": "ruhda sənət",
    "hero.desc": "Əl işi ipək yaylıqlar, təbii soya mumundan şamlar, home diffuzorlar və xüsusi qablaşdırılmış gift boxlar. Hər parça Azərbaycan motivlərindən doğulur və tək nüsxədir.",
    "hero.cta1": "Kolleksiyaya Bax",
    "hero.cta2": "WhatsApp ilə Sifariş",
    "hero.scroll": "Aşağı sürüşdür",
    "marq": [
      "İpək Yaylıqlar",
      "Twilli Kolleksiyası",
      "Signature Şamlar",
      "Home Diffuzorlar",
      "Gift Boxlar",
      "Kişi Boyunluq & Ciblik",
      "Otaq Ətri",
      "Bakı, Azərbaycan",
      "Where Art Meets Heritage"
    ],
    "about.tag": "Bizim haqqımızda",
    "about.title": "Ruhdan doğulan<br><em>sənət</em>",
    "about.p1": "Makana by Ruh — Bakının qəlbindən doğulan autentik brenddir. Hər məhsulumuz Nigarın daxili vizyonunu Azərbaycanın zəngin mədəni irsinin ilhamı ilə birləşdirir.",
    "about.p2": "İpək yaylıqlardan şamlara, tvilli kolleksiyasından gift boxlara qədər — hər parça bir hekayə daşıyır və əl ilə tamamlanır.",
    "about.quote": "\"Hər bir cizgidə bir hekayə var.\"",
    "about.author": "Nigar — Founder & Creative Director",
    "about.founded": "Qurulub",
    "about.s1": "Müştəri",
    "about.s2": "Unikal Dizayn",
    "about.s3": "İl Təcrübə",
    "about.cta": "Kolleksiyaları Kəşf Et",
    "about.more": "Bütün hekayəni oxu",
    "ab.kick": "Yaradıcı",
    "ab.title": "Nigar<br><em>Əhmədova</em>",
    "ab.lead":
      "Mən Nigar Əhmədova, Makana by Ruh brendinin yaradıcısıyam.",
    "ab.story": [
      "Hər şey kiçik bir başlanğıcdan — saf maraq və əl işi sənətinə olan sevgidən doğan, zərif işıq saçan bir şamdan başladı. Öz əllərimlə hazırladığım ilk şam böyük bir hekayənin başlanğıcı olduğunu düşündürmürdü. Lakin o kiçik toxunuşun gizli qatında artıq böyük bir gələcəyin qığılcımı yaşayırdı.",
      "Zaman keçdikcə bu maraq daha böyük bir arzunun təməlini qoydu. Araşdırdım, öyrəndim, sınaqdan keçirdim və addım-addım öz üslubumu, baxışımı və yaradıcılıq dilimi formalaşdırdım.",
      "Beləliklə, Makana by Ruh yarandı — estetika, məna və ruhun bir araya gəldiyi xüsusi bir məkan.",
      "Mənim üçün hər bir məhsul — istər əl işi, zərif şəkildə işıq saçan bir şam, istərsə də ənənəvi motivləri özündə daşıyan axıcı ipək yaylıq — sadəcə bir əşya deyil. Hər biri hisslərin, zərifliyin və istiliyin ifadəsidir. Hər yaylıqda incəlik, hər şamda isə canlı bir duyğu var.",
      "Əllərinlə nəsə yaratmağın özünəməxsus bir sehri var. Bu, sözsüz bir dialoqdur — düşüncələrimin, ilhamımın və detallara olan sevgimin bir-birinə qarışdığı bir prosesdir.",
      "İstəyirəm ki, mənim yaratdığım hər bir gözəlliyə toxunduğunuz anda onun içindəki canlı ruhu, istiliyi və məhz sizin üçün düşünülən hər bir detalın arxasındakı səmimi qayğını dərindən hiss edəsiniz."
    ],
    "ab.sign": "Makana by Ruh — Ruhumun imzası.",
    "ab.welcome": "Mənim dünyama xoş gəlmisiniz.",
    "ab.alt": "Nigar Əhmədova — Makana by Ruh brendinin yaradıcısı",
    "coll.tag": "Kolleksiyalar",
    "coll.title": "Hər kateqoriya —<br><em>ayrı bir dünya</em>",
    "coll.lead": "İpək yaylıqlardan ətirli şamlara qədər altı fərqli xətt. Kartı seç və bütün məhsulları mağazada gör.",
    "coll.count": "məhsul",
    "shop.tag": "Mağaza",
    "shop.title": "Bütün <em>məhsullar</em>",
    "shop.lead": "Şəkilə toxun — böyük qalereyada bax. Sifariş birbaşa WhatsApp üzərindən gedir, ödəniş və çatdırılmanı bir dəqiqədə dəqiqləşdiririk.",
    "shop.search": "Məhsul axtar...",
    "shop.all": "Bütün məhsullar",
    "shop.count": "{n} məhsul",
    "shop.more": "Daha çox göstər",
    "shop.empty": "Heç nə tapılmadı",
    "shop.empty2": "Başqa söz və ya kateqoriya ilə yoxlayın.",
    "shop.reset": "Filtri təmizlə",
    "shop.tab.all": "Hamısı",
    "sort.default": "Sıralama",
    "sort.asc": "Ucuzdan bahaya",
    "sort.desc": "Bahadan ucuza",
    "sort.new": "Yenilər",
    "nav.search": "Axtarış",
    "search.ph": "Nə axtarırsınız?",
    "search.popular": "Populyar bölmələr",
    "search.results": "Nəticələr",
    "search.none": "Heç nə tapılmadı",
    "search.all": "Bütün nəticələr",
    "search.hint": "↑↓ seçim · Enter aç · Esc bağla",
    "sp.title": "Mağaza",
    "sp.sub": "Bütün kolleksiyalar bir yerdə",
    "sp.home": "Ana səhifə",
    "sp.filters": "Filtrlər",
    "sp.category": "Kateqoriya",
    "sp.price": "Qiymət",
    "sp.clear": "Təmizlə",
    "sp.apply": "Nəticələri göstər",
    "sp.any": "İstənilən",
    "ft.title": "Seçilmiş <em>parçalar</em>",
    "ft.sub": "Emalatxanadan sakit bir seçmə — ipək, mum və hədiyyə dəstləri. Hər parça tək nüsxədir.",
    "ft.cta": "Bütün mağazaya bax",
    "gal.tag": "Qalereya",
    "gal.title": "Detallarda<br><em>gözəllik</em>",
    "gal.lead": "Toxuma, naxış və işıq. Kolleksiyalardan seçilmiş kadrlar — hər hansı birinə toxunaraq böyütmüş halda görə bilərsən.",
    "testi.tag": "Müştəri Rəyi",
    "testi.title": "Sizdən <em>gələnlər</em>",
    "testi.lead": "Bakıdan İstanbula, Dubaydan Londona — Makana parçaları dünyanın müxtəlif şəhərlərində öz evini tapır.",
    "testi": [
      {
        "t": "Yaylığım gəldi, açdım — ağladım. Bu qədər gözəl bir şeyi həyatımda heç almamışdım. Hər tikişdə sevgi hiss olunur.",
        "n": "Aynur M.",
        "c": "Bakı"
      },
      {
        "t": "Şamın ətri o qədər unikaldır ki, hər yandıranda özümü başqa bir dünyada hiss edirəm. Makana mənim favoritimdir.",
        "n": "Leyla H.",
        "c": "İstanbul"
      },
      {
        "t": "Gift box aldım dostuma hədiyyə — o qədər gözəl qablaşdırılmışdı ki, açmağa ürək eləmədik. Keyfiyyət inanılmazdır.",
        "n": "Səbinə K.",
        "c": "Dubai"
      }
    ],
    "ig.tag": "Instagram",
    "ig.title": "@makanabyruh",
    "ig.cta": "İzlə",
    "ct.tag": "Əlaqə",
    "ct.title": "Bizimlə <em>əlaqə</em><br>saxlayın",
    "ct.desc": "Sifariş vermək, məhsullar haqqında məlumat almaq və ya sadəcə salam demək üçün bizimlə əlaqə saxlayın. Adətən 15 dəqiqə içində cavab veririk.",
    "ct.loc": "Bakı, Azərbaycan",
    "ct.loc2": "Ünvan",
    "ct.ship": "Bakı üzrə pulsuz · xaricə göndəriş",
    "ct.ship2": "Çatdırılma",
    "form.title": "Sifariş formu",
    "form.sub": "Formu doldur — mesaj birbaşa WhatsApp-a göndərilsin.",
    "form.name": "Adınız",
    "form.phone": "Telefon / WhatsApp",
    "form.product": "Maraqlandığınız məhsul",
    "form.msg": "Mesajınız",
    "form.send": "WhatsApp ilə Göndər",
    "form.note": "Məlumatlarınız yalnız sifarişin rəsmiləşdirilməsi üçün istifadə olunur.",
    "form.any": "Ümumi sorğu",
    "form.other": "Digər / sual",
    "chips": [
      "Yeni kolleksiya",
      "Şam ətrləri",
      "Gift box",
      "Çatdırılma",
      "Toptan sifariş"
    ],
    "foot.desc": "Sənətin irslə qovuşduğu yer. Bakıda əl ilə hazırlanmış ipək yaylıqlar, şamlar və gift boxlar.",
    "foot.menu": "Menyu",
    "foot.cats": "Kateqoriyalar",
    "foot.contact": "Əlaqə",
    "foot.hours": "Hər gün 10:00 – 21:00",
    "foot.txt": "© 2026 Makana by Ruh · Bakı, Azərbaycan · Sənətin irslə qovuşduğu yer",
    "wa.order": "WhatsApp ilə Sifariş",
    "wa.short": "SİFARİŞ",
    "lb.incl": "Qablaşdırma daxildir",
    "lb.ask": "Sual Ver",
    "lb.close": "Bağla",
    "lb.prev": "Əvvəlki foto",
    "lb.next": "Növbəti foto",
    "mg.hint": "Sürüşdür · Bağlamaq üçün aşağı çək",
    "lb.b": [
      "Tək nüsxə",
      "Əl işi",
      "Hədiyyə qutusu"
    ],
    "toast.open": "WhatsApp açılır...",
    "toast.fill": "Zəhmət olmasa adınızı yazın",
    "cur.view": "Bax",
    "cur.wa": "Sifariş",
    "cur.ig": "Instagram",
    "cur.zoom": "Böyüt",
    "wa.intro": "Salam! Saytdan müraciət edirəm",
    "wa.name": "Ad",
    "wa.phone": "Telefon",
    "wa.product": "Məhsul",
    "wa.msg": "Mesaj"
  },
  en: {
    "brand.sub": "by Ruh · Baku",
    "nav.about": "About",
    "nav.coll": "Collections",
    "nav.shop": "Shop",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.cta": "Order Now",
    "hero.kick": "Baku, Azerbaijan · Handcrafted collections",
    "hero.l1": "Heritage",
    "hero.l2": "woven in <em>silk</em>,",
    "hero.l3": "art in the soul",
    "hero.desc": "Handcrafted silk scarves, candles of natural soy wax, home diffusers and beautifully packaged gift boxes. Every piece is born from Azerbaijani motifs and made in a single copy.",
    "hero.cta1": "View Collection",
    "hero.cta2": "Order via WhatsApp",
    "hero.scroll": "Scroll down",
    "marq": [
      "Silk Scarves",
      "Twilly Collection",
      "Signature Candles",
      "Home Diffusers",
      "Gift Boxes",
      "Men's Neckwear & Pocket Squares",
      "Room Fragrance",
      "Baku, Azerbaijan",
      "Where Art Meets Heritage"
    ],
    "about.tag": "About us",
    "about.title": "Art born<br>from <em>the soul</em>",
    "about.p1": "Makana by Ruh — an authentic brand born from the heart of Baku. Every product blends Nigar's artistic vision with the inspiration of Azerbaijan's rich cultural heritage.",
    "about.p2": "From silk scarves to candles, from the twilly line to gift boxes — every piece carries a story and is finished by hand.",
    "about.quote": "\"There's a story in every stitch.\"",
    "about.author": "Nigar — Founder & Creative Director",
    "about.founded": "Founded",
    "about.s1": "Customers",
    "about.s2": "Unique Designs",
    "about.s3": "Years Experience",
    "about.cta": "Explore the Collections",
    "about.more": "Read the full story",
    "ab.kick": "The maker",
    "ab.title": "Nigar<br><em>Ahmadova</em>",
    "ab.lead":
      "I am Nigar Ahmadova, the founder of Makana by Ruh.",
    "ab.story": [
      "It all began small — with a candle that gave off a delicate light, born of pure curiosity and a love for handmade craft. The first candle I made with my own hands did not feel like the beginning of a larger story. Yet hidden in that small gesture there already lived the spark of a great future.",
      "Over time that curiosity laid the foundation of a larger ambition. I researched, learned, tested, and step by step formed my own style, my own vision, my own creative language.",
      "And so Makana by Ruh came into being — a particular space where aesthetics, meaning and soul meet.",
      "For me every piece — whether a hand-poured candle giving off a gentle light, or a flowing silk scarf carrying traditional motifs — is more than an object. Each one is an expression of feeling, of refinement, of warmth. In every scarf there is delicacy; in every candle there is a living emotion.",
      "There is a distinct magic in making something with your own hands. It is a wordless dialogue — a process in which my thoughts, my inspiration and my love of detail blend into one another.",
      "My wish is that the moment you touch any beauty I have created, you feel deeply the living soul inside it, its warmth, and the sincere care behind every detail considered especially for you."
    ],
    "ab.sign": "Makana by Ruh — the signature of my soul.",
    "ab.welcome": "Welcome to my world.",
    "ab.alt": "Nigar Ahmadova — founder of Makana by Ruh",
    "coll.tag": "Collections",
    "coll.title": "Every category —<br><em>a world of its own</em>",
    "coll.lead": "Six distinct lines, from silk scarves to scented candles. Pick a card and see all its products in the shop.",
    "coll.count": "products",
    "shop.tag": "Shop",
    "shop.title": "All <em>products</em>",
    "shop.lead": "Tap a photo to open the full gallery. Orders go straight through WhatsApp — payment and delivery settled in a minute.",
    "shop.search": "Search products...",
    "shop.all": "All products",
    "shop.count": "{n} products",
    "shop.more": "Show more",
    "shop.empty": "Nothing found",
    "shop.empty2": "Try another keyword or category.",
    "shop.reset": "Clear filters",
    "shop.tab.all": "All",
    "sort.default": "Sort by",
    "sort.asc": "Price: low to high",
    "sort.desc": "Price: high to low",
    "sort.new": "Newest",
    "nav.search": "Search",
    "search.ph": "What are you looking for?",
    "search.popular": "Popular sections",
    "search.results": "Results",
    "search.none": "Nothing found",
    "search.all": "View all results",
    "search.hint": "↑↓ navigate · Enter open · Esc close",
    "sp.title": "Shop",
    "sp.sub": "Every collection in one place",
    "sp.home": "Home",
    "sp.filters": "Filters",
    "sp.category": "Category",
    "sp.price": "Price",
    "sp.clear": "Clear",
    "sp.apply": "Show results",
    "sp.any": "Any",
    "ft.title": "Featured <em>pieces</em>",
    "ft.sub": "A quiet selection from the atelier — silk, wax and gift sets, each in a single copy.",
    "ft.cta": "View the full shop",
    "gal.tag": "Gallery",
    "gal.title": "Beauty in<br>the <em>details</em>",
    "gal.lead": "Texture, pattern and light. Frames selected from our collections — tap any of them to view enlarged.",
    "testi.tag": "Customer Reviews",
    "testi.title": "What <em>they say</em>",
    "testi.lead": "From Baku to Istanbul, Dubai and London — Makana pieces find their home in cities around the world.",
    "testi": [
      {
        "t": "My scarf arrived, I opened it — I cried. I had never bought anything so beautiful. Love is felt in every stitch.",
        "n": "Aynur M.",
        "c": "Baku"
      },
      {
        "t": "The scent of the candle is so unique that every time I light it, I feel transported to another world. Makana is my favorite.",
        "n": "Leyla H.",
        "c": "Istanbul"
      },
      {
        "t": "I bought a gift box for a friend — it was so beautifully packaged we didn't want to open it. The quality is incredible.",
        "n": "Sabina K.",
        "c": "Dubai"
      }
    ],
    "ig.tag": "Instagram",
    "ig.title": "@makanabyruh",
    "ig.cta": "Follow",
    "ct.tag": "Contact",
    "ct.title": "Get in <em>touch</em><br>with us",
    "ct.desc": "Reach out to place an order, ask about our products, or just to say hello. We usually reply within 15 minutes.",
    "ct.loc": "Baku, Azerbaijan",
    "ct.loc2": "Address",
    "ct.ship": "Free in Baku · international shipping",
    "ct.ship2": "Delivery",
    "form.title": "Order form",
    "form.sub": "Fill in the form — the message goes straight to WhatsApp.",
    "form.name": "Your name",
    "form.phone": "Phone / WhatsApp",
    "form.product": "Product of interest",
    "form.msg": "Your message",
    "form.send": "Send via WhatsApp",
    "form.note": "Your details are used only to process the order.",
    "form.any": "General inquiry",
    "form.other": "Other / question",
    "chips": [
      "New collection",
      "Candle scents",
      "Gift box",
      "Delivery",
      "Wholesale"
    ],
    "foot.desc": "Where art meets heritage. Silk scarves, candles and gift boxes handmade in Baku.",
    "foot.menu": "Menu",
    "foot.cats": "Categories",
    "foot.contact": "Contact",
    "foot.hours": "Every day 10:00 – 21:00",
    "foot.txt": "© 2026 Makana by Ruh · Baku, Azerbaijan · Where Art Meets Heritage",
    "wa.order": "Order via WhatsApp",
    "wa.short": "ORDER",
    "lb.incl": "Packaging included",
    "lb.ask": "Ask a Question",
    "lb.close": "Close",
    "lb.prev": "Previous photo",
    "lb.next": "Next photo",
    "mg.hint": "Swipe · pull down to close",
    "lb.b": [
      "One of a kind",
      "Handmade",
      "Gift box"
    ],
    "toast.open": "Opening WhatsApp...",
    "toast.fill": "Please enter your name",
    "cur.view": "View",
    "cur.wa": "Order",
    "cur.ig": "Instagram",
    "cur.zoom": "Zoom",
    "wa.intro": "Hello! Inquiry from the website",
    "wa.name": "Name",
    "wa.phone": "Phone",
    "wa.product": "Product",
    "wa.msg": "Message"
  },
  ru: {
    "brand.sub": "by Ruh · Баку",
    "nav.about": "О нас",
    "nav.coll": "Коллекции",
    "nav.shop": "Магазин",
    "nav.gallery": "Галерея",
    "nav.contact": "Контакты",
    "nav.cta": "Заказать",
    "hero.kick": "Баку, Азербайджан · Ручные коллекции",
    "hero.l1": "Наследие",
    "hero.l2": "в <em>шёлке</em>,",
    "hero.l3": "искусство в душе",
    "hero.desc": "Шёлковые платки ручной работы, свечи из натурального соевого воска, диффузоры для дома и подарочные наборы в особой упаковке. Каждая вещь рождена из азербайджанских мотивов и существует в единственном экземпляре.",
    "hero.cta1": "Смотреть коллекцию",
    "hero.cta2": "Заказать в WhatsApp",
    "hero.scroll": "Листайте вниз",
    "marq": [
      "Шёлковые платки",
      "Коллекция Twilly",
      "Авторские свечи",
      "Диффузоры для дома",
      "Подарочные наборы",
      "Мужские шейные платки и паше",
      "Аромат для дома",
      "Баку, Азербайджан",
      "Where Art Meets Heritage"
    ],
    "about.tag": "О нас",
    "about.title": "Искусство,<br>рождённое <em>из души</em>",
    "about.p1": "Makana by Ruh — аутентичный бренд, рождённый в сердце Баку. Каждое изделие сочетает художественное видение Нигяр с богатым культурным наследием Азербайджана.",
    "about.p2": "От шёлковых платков до свечей, от коллекции twilly до подарочных наборов — каждая вещь несёт свою историю и завершается вручную.",
    "about.quote": "«В каждом стежке — своя история.»",
    "about.author": "Нигяр — основатель и креативный директор",
    "about.founded": "Основан",
    "about.s1": "Клиентов",
    "about.s2": "Уникальных дизайнов",
    "about.s3": "Лет опыта",
    "about.cta": "Открыть коллекции",
    "about.more": "Прочитать всю историю",
    "ab.kick": "Мастер",
    "ab.title": "Нигяр<br><em>Ахмедова</em>",
    "ab.lead":
      "Меня зовут Нигяр Ахмедова, я основатель бренда Makana by Ruh.",
    "ab.story": [
      "Всё началось с малого — со свечи, излучающей нежный свет, рождённой из чистого любопытства и любви к ремеслу ручной работы. Первая свеча, сделанная моими собственными руками, вовсе не казалась началом большой истории. Но в глубине этого маленького жеста уже жила искра большого будущего.",
      "Со временем это любопытство заложило основу гораздо большего стремления. Я исследовала, училась, пробовала и шаг за шагом формировала собственный стиль, собственный взгляд, собственный творческий язык.",
      "Так родился Makana by Ruh — особенное пространство, в котором встречаются эстетика, смысл и душа.",
      "Для меня каждое изделие — будь то свеча ручной работы с нежным светом или струящийся шёлковый платок с традиционными мотивами — это больше, чем вещь. Каждое из них — выражение чувства, утончённости и тепла. В каждом платке есть тонкость, в каждой свече — живая эмоция.",
      "В том, чтобы создавать что-то своими руками, есть особое волшебство. Это безмолвный диалог — процесс, в котором мои мысли, вдохновение и любовь к деталям переплетаются воедино.",
      "Я хочу, чтобы в тот момент, когда вы прикасаетесь к любой созданной мной красоте, вы глубоко почувствовали живую душу внутри неё, её тепло и искреннюю заботу, стоящую за каждой деталью, продуманной именно для вас."
    ],
    "ab.sign": "Makana by Ruh — подпись моей души.",
    "ab.welcome": "Добро пожаловать в мой мир.",
    "ab.alt": "Нигяр Ахмедова — основатель Makana by Ruh",
    "coll.tag": "Коллекции",
    "coll.title": "Каждая категория —<br><em>отдельный мир</em>",
    "coll.lead": "Шести направлений: от шёлковых платков до ароматических свечей. Выберите карточку и посмотрите все товары в магазине.",
    "coll.count": "товаров",
    "shop.tag": "Магазин",
    "shop.title": "Все <em>товары</em>",
    "shop.lead": "Нажмите на фото — откроется полная галерея. Заказ идёт напрямую через WhatsApp, оплату и доставку уточняем за минуту.",
    "shop.search": "Поиск товаров...",
    "shop.all": "Все товары",
    "shop.count": "{n} товаров",
    "shop.more": "Показать ещё",
    "shop.empty": "Ничего не найдено",
    "shop.empty2": "Попробуйте другое слово или категорию.",
    "shop.reset": "Сбросить фильтры",
    "shop.tab.all": "Все",
    "sort.default": "Сортировка",
    "sort.asc": "Сначала дешёвые",
    "sort.desc": "Сначала дорогие",
    "sort.new": "Новинки",
    "nav.search": "Поиск",
    "search.ph": "Что вы ищете?",
    "search.popular": "Популярные разделы",
    "search.results": "Результаты",
    "search.none": "Ничего не найдено",
    "search.all": "Все результаты",
    "search.hint": "↑↓ выбор · Enter открыть · Esc закрыть",
    "sp.title": "Магазин",
    "sp.sub": "Все коллекции в одном месте",
    "sp.home": "Главная",
    "sp.filters": "Фильтры",
    "sp.category": "Категория",
    "sp.price": "Цена",
    "sp.clear": "Сбросить",
    "sp.apply": "Показать результаты",
    "sp.any": "Любая",
    "ft.title": "Избранные <em>вещи</em>",
    "ft.sub": "Тихая выборка из ателье — шёлк, воск и подарочные наборы, каждый в единственном экземпляре.",
    "ft.cta": "Открыть весь магазин",
    "gal.tag": "Галерея",
    "gal.title": "Красота<br>в <em>деталях</em>",
    "gal.lead": "Фактура, узор и свет. Кадры из наших коллекций — нажмите на любой, чтобы рассмотреть крупнее.",
    "testi.tag": "Отзывы клиентов",
    "testi.title": "Что <em>говорят</em>",
    "testi.lead": "Из Баку в Стамбул, Дубай и Лондон — вещи Makana находят свой дом в разных городах мира.",
    "testi": [
      {
        "t": "Мой платок пришёл, я открыла — расплакалась. В жизни не покупала ничего настолько красивого. В каждом стежке чувствуется любовь.",
        "n": "Айнур М.",
        "c": "Баку"
      },
      {
        "t": "Аромат свечи настолько уникален, что каждый раз при зажигании я чувствую себя в другом мире. Makana — мой фаворит.",
        "n": "Лейла Х.",
        "c": "Стамбул"
      },
      {
        "t": "Купила подарочный набор подруге — упаковано так красиво, что не хотелось открывать. Качество невероятное.",
        "n": "Сабина К.",
        "c": "Дубай"
      }
    ],
    "ig.tag": "Instagram",
    "ig.title": "@makanabyruh",
    "ig.cta": "Подписаться",
    "ct.tag": "Контакты",
    "ct.title": "Свяжитесь <em>с нами</em>",
    "ct.desc": "Напишите нам, чтобы оформить заказ, узнать о товарах или просто поздороваться. Обычно отвечаем в течение 15 минут.",
    "ct.loc": "Баку, Азербайджан",
    "ct.loc2": "Адрес",
    "ct.ship": "Бесплатно по Баку · отправка за рубеж",
    "ct.ship2": "Доставка",
    "form.title": "Форма заказа",
    "form.sub": "Заполните форму — сообщение уйдёт прямо в WhatsApp.",
    "form.name": "Ваше имя",
    "form.phone": "Телефон / WhatsApp",
    "form.product": "Интересующий товар",
    "form.msg": "Ваше сообщение",
    "form.send": "Отправить в WhatsApp",
    "form.note": "Ваши данные используются только для оформления заказа.",
    "form.any": "Общий запрос",
    "form.other": "Другое / вопрос",
    "chips": [
      "Новая коллекция",
      "Ароматы свечей",
      "Подарочный набор",
      "Доставка",
      "Оптовый заказ"
    ],
    "foot.desc": "Где искусство встречается с наследием. Шёлковые платки, свечи и подарочные наборы ручной работы из Баку.",
    "foot.menu": "Меню",
    "foot.cats": "Категории",
    "foot.contact": "Контакты",
    "foot.hours": "Ежедневно 10:00 – 21:00",
    "foot.txt": "© 2026 Makana by Ruh · Баку, Азербайджан · Где искусство встречается с наследием",
    "wa.order": "Заказать в WhatsApp",
    "wa.short": "ЗАКАЗ",
    "lb.incl": "Упаковка включена",
    "lb.ask": "Задать вопрос",
    "lb.close": "Закрыть",
    "lb.prev": "Предыдущее фото",
    "lb.next": "Следующее фото",
    "mg.hint": "Листайте · потяните вниз, чтобы закрыть",
    "lb.b": [
      "Единственный экземпляр",
      "Ручная работа",
      "Подарочная коробка"
    ],
    "toast.open": "Открываем WhatsApp...",
    "toast.fill": "Пожалуйста, укажите имя",
    "cur.view": "Смотреть",
    "cur.wa": "Заказ",
    "cur.ig": "Instagram",
    "cur.zoom": "Открыть",
    "wa.intro": "Здравствуйте! Заявка с сайта",
    "wa.name": "Имя",
    "wa.phone": "Телефон",
    "wa.product": "Товар",
    "wa.msg": "Сообщение"
  },
};

export const LANGS: Lang[] = ["az", "en", "ru"];

export const LANG_LABEL: Record<Lang, string> = { az: "AZ", en: "EN", ru: "RU" };

export function detectLang(raw: string | null | undefined): Lang {
  const code = (raw || "").slice(0, 2).toLowerCase();
  return (["az", "en", "ru"] as const).includes(code as Lang) ? (code as Lang) : "az";
}
