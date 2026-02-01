import express from "express";
import bodyParser from "body-parser";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// =====================
// ✅ 1) MATERIAL зураг (дүүргэлтийн материал)
// =====================
const MATERIAL_IMAGE =
  "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625969441_889472167011856_3806361251418227227_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=xS4bInUXY1wQ7kNvwFgYVhP&_nc_oc=AdmpuEdfnjB5Camq3k_7m-KkzzB1rxkFn6lGo-TNp3yT2V2Lys91vKUzLZ6McvXmVNk&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=kIX5tbmjm8trIC_7ur4qgg&oh=00_Afuuo6MZjLZ-McwdY0YhkcaHgjRingrIcgtWCa_b6SWA5g&oe=6984B11D";

// =====================
// ✅ 2) COLOR зураг + 14 өнгө (page/page)
// =====================
const COLOR_IMAGE =
  "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625980601_889475330344873_1786653186884716607_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=jig5QG7vh24Q7kNvwFgZOO9&_nc_oc=AdnXqcTPTZIJvbRWd7YyrRwP-IdM-kxW8jM5VNtYF4_lIH5DNcCJivPOJvvwRCT6Gog&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=e9g3LKQ-BcHi7tqiP_uung&oh=00_AfvQuK_YyDzpSy2VQAtGAk6vvQm0mVp9jDEIb80RTbhXvA&oe=6984C7AB";

const COLORS = [
  "#1. Цэнхэр",
  "#2. Усан цэнхэр",
  "#3. Номин ногоон",
  "#4. Тод ногоон",
  "#5. Хар ногоон",
  "#6. Хар хөх",
  "#7. Нил ягаан",
  "#8. Ягаан",
  "#9. Улаан",
  "#11. Хар саарал",
  "#12. Цайвар саарал",
  "#13. Шар",
  "#14. Оранж",
  "#15. Carrot",
];

// =====================
// ✅ 3) ЗАГВАРУУД (5 ширхэг) — таны өгсөн мэдээлэл
// =====================
const PRODUCTS = [
  {
    id: "MAXDROP",
    name: "Maxdrop",
    price: 395000,
    desc: "1m диаметер, 1м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626138711_889471480345258_8818236547695529910_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=kAzbm-BL6FkQ7kNvwGcmoJU&_nc_oc=Adke5elqhVPKPt3lYzqdkAO0FRbZTEcLSt58qfpY-_nPRrL7ZuKCG8uuIWPhfjnf-hI&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=s9XFDa_mQdj4et5mzS3ubA&oh=00_AfvjeY7OId2Dg7F5Fmu8XfxfjzFxI9cfq13E-vZY7Lkdxg&oe=6984ADDD",
  },
  {
    id: "DROP",
    name: "Drop",
    price: 315000,
    desc: "0.8m диаметер, 0.8м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626795127_889469150345491_1102311214957007984_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=73-NETyqFCMQ7kNvwEvWqan&_nc_oc=AdkzQ03YhXwagIFbe7lhAPCGtX0t63ie-dgBENj6v3mipRA_JRg5qJtLHct8sUj9tC0&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=QsaaQzyI9CgrmBhNwpi23A&oh=00_AfvAJXXx3gU0v7WDUAr4oPbzi0zlUaL8OSvirZB1s4as4Q&oe=6984CA7C",
  },
  {
    id: "LONG",
    name: "Long",
    price: 370000,
    desc: "1m өргөн, 1.5м урттай бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/624620676_889469070345499_1589862224486377274_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Ee4vG2TqvAsQ7kNvwEPYMym&_nc_oc=AdlVIADjHOMIOjD04D2SUOjJhWDyQ7HAMvHBuDb3pC695wPkcr5u6PKjErA3y5VZehY&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=oZaXrXu0CvxiPsqipg5zyg&oh=00_AfvLYQnTNe01Tj86T0nyHGaEUA7-IHWU_YznxK7iA882HA&oe=6984C101",
  },
  {
    id: "SOFA",
    name: "Sofa",
    price: 420000,
    desc: "0.8m өргөн, 1.5м урттай бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/626373801_889469027012170_5478076493316185802_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=Rfcs0St-xwEQ7kNvwGI0vY1&_nc_oc=Adk7Rg86FoqsHt-K3tqD1quo4rwxPOutc0IbIQ7KkiF_k5PKSO9Su5FpfchomXMCNbg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=8U0SixS5iQwpl-5MC0fR_w&oh=00_Afs-VTutmHaKA2i9jwAAcCZphEShS4vPjgtL9iHK4SWEmw&oe=6984AFA0",
  },
  {
    id: "ROUND",
    name: "Round",
    price: 370000,
    desc: "1.5m диаметер, 0.4м өндөртэй бүх насныханд зориулсан",
    image:
      "https://scontent.fuln11-1.fna.fbcdn.net/v/t39.30808-6/625236736_889468923678847_3582025770422709221_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=bV7ric-FBnAQ7kNvwF4s0QI&_nc_oc=AdmAWOgqeKZmTvC2BBe9ATGP8SWcuHFsrtHmKl6xxHJsuP1qhvMJ5Qv7uBa1gyi-qPg&_nc_zt=23&_nc_ht=scontent.fuln11-1.fna&_nc_gid=iN5eBgcGFQg7g6VCGlOcMw&oh=00_Aftf7ON4DjqvrW1DdJg8zDMC8ifQ0Pwm_74SQDEoqG-vRA&oe=6984AABC",
  },
];

// =====================
// Session (RAM)
// =====================
const sessions = new Map();

// 🔐 Verify
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.sendStatus(403);
});

// 📩 Incoming
app.post("/webhook", (req, res) => {
  const body = req.body;
  if (body.object !== "page") return res.sendStatus(404);

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const sender = event.sender?.id;
      if (!sender) continue;

      if (event.postback) handlePostback(sender, event.postback.payload);
      if (event.message && event.message.text) handleText(sender, event.message.text);
    }
  }

  return res.status(200).send("EVENT_RECEIVED");
});

// =====================
// INTRO: 2 товч
// =====================
function sendIntro(sender) {
  sendButtons(sender, "👋 Сайн байна уу!\nДоорх сонголтоос сонгоно уу 👇", [
    { title: "🧵 Дүүргэлтийн материал", payload: "SHOW_MATERIAL" },
    { title: "🛍 Загварын сонголт", payload: "SHOW_TEMPLATES" },
  ]);
}

// =====================
// Материал зураг
// =====================
function sendMaterial(sender) {
  sendImage(sender, MATERIAL_IMAGE);
  sendButtons(sender, "Дүүргэлтийн материал ✅", [
    { title: "🛍 Загварын сонголт", payload: "SHOW_TEMPLATES" },
    { title: "🔙 Буцах", payload: "BACK_INTRO" },
  ]);
}

// =====================
// Загварууд (carousel) — card бүр дээр "Өнгөний сонголт" товч байна
// =====================
function sendTemplates(sender) {
  const elements = PRODUCTS.slice(0, 10).map((p) => ({
    title: `${p.name} – ${format₮(p.price)}`,
    image_url: p.image,
    subtitle: p.desc || " ",
    buttons: [
      { type: "postback", title: "🎨 Өнгөний сонголт", payload: `SHOW_COLORS_${p.id}_0` },
      { type: "postback", title: "🛒 Сонгох", payload: `PICK_${p.id}` },
    ],
  }));

  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "template",
            payload: { template_type: "generic", elements },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

// =====================
// Өнгө: зураг + page/page (button template max 3)
// =====================
function sendColorIntro(sender, productId, pageIndex = 0) {
  const s = sessions.get(sender) || {};
  s.step = "choose_color";
  s.productId = productId;
  sessions.set(sender, s);

  sendImage(sender, COLOR_IMAGE);
  sendColorPage(sender, productId, pageIndex);
}

function sendColorPage(sender, productId, pageIndex = 0) {
  const pageSize = 3;
  const start = pageIndex * pageSize;
  const slice = COLORS.slice(start, start + pageSize);

  const hasPrev = pageIndex > 0;
  const hasNext = start + pageSize < COLORS.length;

  // default: 3 өнгө
  let buttons = slice.map((c) => ({
    title: c,
    payload: `COLOR_${productId}_${encodeURIComponent(c)}`,
  }));

  // Хэрвээ prev+next зэрэг хэрэгтэй бол: 1 өнгө + prev + next
  if (hasPrev && hasNext) {
    buttons = [
      { title: slice[0], payload: `COLOR_${productId}_${encodeURIComponent(slice[0])}` },
      { title: "⬅️ Өмнөх", payload: `SHOW_COLORS_${productId}_${pageIndex - 1}` },
      { title: "➡️ Дараагийн", payload: `SHOW_COLORS_${productId}_${pageIndex + 1}` },
    ];
  } else if (hasNext && buttons.length === 3) {
    // 2 өнгө + next
    buttons = [
      { title: slice[0], payload: `COLOR_${productId}_${encodeURIComponent(slice[0])}` },
      { title: slice[1], payload: `COLOR_${productId}_${encodeURIComponent(slice[1])}` },
      { title: "➡️ Дараагийн", payload: `SHOW_COLORS_${productId}_${pageIndex + 1}` },
    ];
  } else if (hasPrev && buttons.length === 3) {
    // 2 өнгө + prev
    buttons = [
      { title: slice[0], payload: `COLOR_${productId}_${encodeURIComponent(slice[0])}` },
      { title: slice[1], payload: `COLOR_${productId}_${encodeURIComponent(slice[1])}` },
      { title: "⬅️ Өмнөх", payload: `SHOW_COLORS_${productId}_${pageIndex - 1}` },
    ];
  } else {
    // төгсгөл хэсэг: үлдсэн өнгө + буцах
    if (hasPrev && buttons.length < 3) {
      buttons.push({ title: "⬅️ Өмнөх", payload: `SHOW_COLORS_${productId}_${pageIndex - 1}` });
    }
    if (buttons.length < 3) buttons.push({ title: "🔙 Загварууд", payload: "SHOW_TEMPLATES" });
  }

  sendButtons(sender, "🎨 Өнгөө сонгоно уу:", buttons);
}

// =====================
// Захиалах товч
// =====================
function sendOrderButton(sender, s) {
  const p = PRODUCTS.find((x) => x.id === s.productId);
  if (!p) return sendText(sender, "Загвар олдсонгүй. Дахин эхэлье.");

  sendButtons(
    sender,
    `✅ Сонголт:\n${p.name}\nӨнгө: ${s.color}\nҮнэ: ${format₮(p.price)}\n\nЗахиалгаа үргэлжлүүлэх үү?`,
    [
      { title: "🛒 Захиалах", payload: "ORDER_NOW" },
      { title: "🔙 Загварууд", payload: "SHOW_TEMPLATES" },
      { title: "🏠 Эхлэл", payload: "BACK_INTRO" },
    ].slice(0, 3)
  );
}

// =====================
// POSTBACK handler
// =====================
function handlePostback(sender, payload) {
  if (payload === "GET_STARTED") {
    sessions.delete(sender);
    sendText(sender, "Манай онлайн дэлгүүрт тавтай морил 😊");
    sendIntro(sender);
    return;
  }

  if (payload === "BACK_INTRO") {
    sessions.delete(sender);
    sendIntro(sender);
    return;
  }

  if (payload === "SHOW_MATERIAL") {
    sessions.set(sender, { step: "intro" });
    sendMaterial(sender);
    return;
  }

  if (payload === "SHOW_TEMPLATES") {
    sessions.set(sender, { step: "choose_template" });
    sendTemplates(sender);
    return;
  }

  // Өнгөний сонголт paging
  if (payload.startsWith("SHOW_COLORS_")) {
    const parts = payload.split("_"); // SHOW, COLORS, productId, pageIndex
    const productId = parts[2];
    const pageIndex = parseInt(parts[3] || "0", 10);

    if (pageIndex === 0) sendColorIntro(sender, productId, 0);
    else sendColorPage(sender, productId, pageIndex);

    return;
  }

  // Загвар сонгосон (өнгө сонголт руу шууд оруулна)
  if (payload.startsWith("PICK_")) {
    const productId = payload.replace("PICK_", "");
    sessions.set(sender, { step: "choose_color", productId });
    sendColorIntro(sender, productId, 0);
    return;
  }

  // Өнгө сонгосон
  if (payload.startsWith("COLOR_")) {
    const parts = payload.split("_");
    const productId = parts[1];
    const color = decodeURIComponent(parts.slice(2).join("_")) || "Стандарт";

    const s = sessions.get(sender) || {};
    s.step = "ready_to_order";
    s.productId = productId;
    s.color = color;
    sessions.set(sender, s);

    sendOrderButton(sender, s);
    return;
  }

  // Захиалах
  if (payload === "ORDER_NOW") {
    const s = sessions.get(sender);
    if (!s?.productId || !s?.color) {
      sendText(sender, "Эхлээд загвар болон өнгөө сонгоно уу.");
      return sendIntro(sender);
    }
    s.step = "ask_phone";
    sessions.set(sender, s);
    sendText(sender, "📞 Захиалга баталгаажуулахын тулд холбоо барих дугаараа илгээгээрэй.");
    return;
  }

  // Баталгаажуулах
  if (payload === "CONFIRM_ORDER") {
    const s = sessions.get(sender);
    if (!s?.finalOrder) {
      sendText(sender, "Захиалга олдсонгүй. Дахин эхэлье.");
      sessions.delete(sender);
      return sendIntro(sender);
    }

    sendText(sender, `🆕 #ORDER_NEW\n\n${s.finalOrder}\n\nБид удахгүй холбогдоно 🙏`);
    sessions.set(sender, { step: "waiting_admin_done" });
    return;
  }

  // Цуцлах
  if (payload === "CANCEL_ORDER") {
    sessions.delete(sender);
    sendText(sender, "❌ Захиалгыг цуцаллаа.");
    sendIntro(sender);
    return;
  }
}

// =====================
// TEXT handler
// =====================
function handleText(sender, textRaw) {
  const text = (textRaw || "").trim();
  const lower = text.toLowerCase();

  // DONE tag (админ тухайн чат дээр бичээд дуусгана)
  if (lower === "done" || lower === "дууслаа" || lower === "#order_done") {
    sendText(sender, "✅ #ORDER_DONE\nТаны захиалга амжилттай дууслаа 🙏");
    sessions.delete(sender);
    return;
  }

  const s = sessions.get(sender);

  // session байхгүй бол intro
  if (!s) return sendIntro(sender);

  // Утас авах
  if (s.step === "ask_phone") {
    s.phone = text;
    s.step = "ask_address";
    sessions.set(sender, s);
    return sendText(sender, "📦 Хүргүүлэх хаягаа (дүүрэг/хороо/байр, дэлгэрэнгүй) илгээгээрэй.");
  }

  // Хаяг авах -> confirm
  if (s.step === "ask_address") {
    s.address = text;

    const p = PRODUCTS.find((x) => x.id === s.productId);
    if (!p) {
      sessions.delete(sender);
      sendText(sender, "Загвар олдсонгүй. Дахин эхэлье.");
      return sendIntro(sender);
    }

    const summary =
      "🧾 Захиалгын мэдээлэл\n\n" +
      `• Загвар: ${p.name}\n` +
      `• Өнгө: ${s.color}\n` +
      `• Үнэ: ${format₮(p.price)}\n\n` +
      `☎️ Утас: ${s.phone}\n` +
      `📦 Хаяг: ${s.address}\n\n` +
      "Зөв бол Баталгаажуулах дээр дарна уу.";

    s.finalOrder = summary;
    s.step = "confirm";
    sessions.set(sender, s);

    return sendButtons(sender, summary, [
      { title: "✅ Баталгаажуулах", payload: "CONFIRM_ORDER" },
      { title: "❌ Цуцлах", payload: "CANCEL_ORDER" },
      { title: "🏠 Эхлэл", payload: "BACK_INTRO" },
    ]);
  }

  // default
  return sendIntro(sender);
}

// =====================
// Helpers
// =====================
function sendText(sender, text) {
  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: { recipient: { id: sender }, message: { text } },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function sendImage(sender, imageUrl) {
  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "image",
            payload: { url: imageUrl, is_reusable: true },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function sendButtons(sender, text, buttons) {
  request(
    {
      uri: "https://graph.facebook.com/v19.0/me/messages",
      qs: { access_token: process.env.PAGE_TOKEN },
      method: "POST",
      json: {
        recipient: { id: sender },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text,
              buttons: buttons.slice(0, 3),
            },
          },
        },
      },
    },
    (err, resp, body) => {
      if (err) console.error("SEND ERR:", err);
      if (body?.error) console.error("FB API ERR:", body.error);
    }
  );
}

function format₮(n) {
  return `${Number(n).toLocaleString("mn-MN")}₮`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Bot running on port", PORT));
