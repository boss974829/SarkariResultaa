import { boardById, formatDate, linksFor, related } from "@/lib/catalog";
import { translate, type Lang } from "@/lib/translate";
import type { Notice, Row } from "@/data/types";

const PAY = {
  en: ["Debit card", "Credit card", "Internet banking", "IMPS", "UPI"],
  hi: ["डेबिट कार्ड", "क्रेडिट कार्ड", "इंटरनेट बैंकिंग", "आईएमपीएस", "यूपीआई"],
};

const DEFAULT_STEP = "Read the dates and eligibility on this page as a summary only.";

export type VacancyRow = { post: string; count: string; eligibility: string };

export function noticeDetail(notice: Notice, lang: Lang = "en") {
  const board = boardById(notice.boardId);
  const name = board?.short ?? "The board";
  const site = board?.url ?? "";
  const loc = (text: string) => translate(lang, text);
  const dates = notice.dates.map((row) => ({ label: loc(row.label), value: loc(row.value) }));
  if (!notice.dates.some((row) => /post|update/i.test(row.label))) {
    dates.unshift({ label: loc("Post date"), value: formatDate(notice.postDate, lang) });
  }
  dates.push({
    label: loc("Confirm"),
    value: lang === "hi" ? `ऊपर की किसी भी तिथि पर काम करने से पहले ${name} जाँचें` : `Check ${name} before you act on any date above`,
  });

  const fees: Row[] =
    notice.fees.length > 0
      ? notice.fees.map((row) => ({ label: loc(row.label), value: loc(row.value) }))
      : [
          {
            label: lang === "hi" ? "इस पृष्ठ पर शुल्क" : "Fee on this page",
            value: loc("Not collected here. The original notice on the official website states the fee."),
          },
        ];

  const showPay = notice.category === "latest-job" || notice.category === "admission" || notice.fees.length > 0;
  const age: Row[] =
    notice.age.length > 0
      ? notice.age.map((row) => ({ label: loc(row.label), value: loc(row.value) }))
      : [{ label: loc("Age limit"), value: loc("Fixed in the original notification. Use the as-on date printed there.") }];

  const steps = notice.howToApply[0] === DEFAULT_STEP ? stepsFor(notice, name, lang) : notice.howToApply.map((step) => loc(step));
  const selection =
    notice.selection.length > 0
      ? notice.selection.map((step) => loc(step))
      : [loc("See the official notification for the stages that apply to this post.")];

  return {
    board,
    dates,
    fees,
    pay: showPay ? PAY[lang] : [],
    ageTitle: notice.ageAsOn
      ? lang === "hi"
        ? `आयु सीमा, तिथि ${loc(notice.ageAsOn)}`
        : `Age limit as on ${notice.ageAsOn}`
      : lang === "hi"
        ? "आयु सीमा"
        : "Age limit",
    age,
    total: notice.posts
      ? lang === "hi"
        ? `${notice.posts.toLocaleString("en-IN")} पद`
        : `${notice.posts.toLocaleString("en-IN")} posts`
      : loc("See the official notice"),
    vacancies: vacancyRows(notice, lang),
    stepsTitle: stepsTitle(notice, lang),
    steps,
    selection,
    links: linksFor(notice).map((link) => ({ ...link, label: loc(link.label) })),
    zones: (notice.zones ?? []).map((zone) => ({ ...zone, name: loc(zone.name) })),
    also: related(notice, 1)[0],
    faqs: faqs(notice, name, site, lang),
  };
}

function vacancyRows(notice: Notice, lang: Lang): VacancyRow[] {
  const loc = (text: string) => translate(lang, text);
  const count = notice.posts ? notice.posts.toLocaleString("en-IN") : loc("See notice");
  const fallback = notice.qualifications[0]?.value ?? "Printed in the official notification.";
  if (notice.vacancies.length > 0) {
    return notice.vacancies.map((row, index) => ({
      post: loc(row.label),
      count: loc(row.value),
      eligibility: loc(notice.qualifications[index]?.value ?? fallback),
    }));
  }
  if (notice.qualifications.length > 0) {
    return notice.qualifications.map((row) => ({
      post: loc(row.label),
      count,
      eligibility: loc(row.value),
    }));
  }
  return [{ post: loc(notice.headline), count, eligibility: loc(fallback) }];
}

function stepsTitle(notice: Notice, lang: Lang): string {
  if (lang === "hi") {
    if (notice.category === "result") return `${translate(lang, notice.headline)} कैसे देखें और डाउनलोड करें`;
    if (notice.category === "admit-card") return `${translate(lang, notice.headline)} कैसे डाउनलोड करें`;
    if (notice.category === "answer-key") return "उत्तर कुंजी कैसे डाउनलोड करें";
    if (notice.category === "syllabus") return "पाठ्यक्रम कैसे पढ़ें";
    if (notice.category === "certificate") return "प्रमाण पत्र कैसे डाउनलोड करें";
    if (notice.category === "admission") return "आवेदन या सुधार कैसे करें";
    if (notice.category === "important") return "इस नोट का उपयोग कैसे करें";
    return `${translate(lang, notice.headline)} कैसे भरें`;
  }
  if (notice.category === "result") return `How to check and download ${notice.headline}`;
  if (notice.category === "admit-card") return `How to download ${notice.headline}`;
  if (notice.category === "answer-key") return "How to download the answer key";
  if (notice.category === "syllabus") return "How to read the syllabus";
  if (notice.category === "certificate") return "How to download the certificate";
  if (notice.category === "admission") return "How to apply or correct the form";
  if (notice.category === "important") return "How to use this note";
  return `How to fill ${notice.headline}`;
}

function stepsFor(notice: Notice, name: string, lang: Lang): string[] {
  if (lang === "hi") {
    if (notice.category === "result") {
      return [
        `${name} की आधिकारिक वेबसाइट खोलें।`,
        "उस साइट पर परिणाम या सीईएन खण्ड खोलें।",
        "इस परीक्षा की परिणाम पीडीएफ या स्कोर-कार्ड लॉगिन खोजें।",
        "रोल नंबर खोजें, या पंजीकरण संख्या और जन्म तिथि से लॉग इन करें।",
        "पीडीएफ डाउनलोड करें। एक क्षेत्र की सूची दूसरे क्षेत्र के लिए मान्य नहीं।",
      ];
    }
    if (notice.category === "admit-card") {
      return [
        `${name} की आधिकारिक वेबसाइट खोलें।`,
        "इस परीक्षा का एडमिट कार्ड या सिटी लिंक खोलें।",
        "पंजीकरण संख्या और पासवर्ड से लॉग इन करें, या पृष्ठ जन्म तिथि माँगे तो वही भरें।",
        "पाली, केंद्र का पता और फोटो निर्देश पहले पृष्ठ पर पढ़ें।",
        "पीडीएफ डाउनलोड करें और कार्ड पर लिखा पहचान पत्र ले जाएँ।",
      ];
    }
    if (notice.category === "answer-key") {
      return [
        `${name} की आधिकारिक वेबसाइट खोलें।`,
        "इस परीक्षा की उत्तर कुंजी का लिंक खोलें।",
        "कुंजी अभ्यर्थी पोर्टल पर हो तो लॉग इन करें।",
        "प्रश्न आईडी अपनी रिस्पॉन्स शीट से मिलाएँ।",
        "आपत्ति शुल्क केवल उसी आधिकारिक पोर्टल पर, खिड़की बंद होने से पहले दें।",
      ];
    }
    if (notice.category === "syllabus") {
      return [
        `${name} की आधिकारिक सूचना खोलें।`,
        "उस पीडीएफ की परीक्षा योजना पढ़ें, किसी तीसरे सार को नहीं।",
        "विषय, अंक और ऋणात्मक अंकन नोट करें।",
        "पाठ्यक्रम अनुलग्नक उसी सूचना से डाउनलोड करें।",
      ];
    }
    if (notice.category === "certificate") {
      return [
        `${name} वेबसाइट पर प्रमाण पत्र लिंक खोलें।`,
        "रोल नंबर या पंजीकरण संख्या से लॉग इन करें।",
        "ई-प्रमाण पत्र पीडीएफ डाउनलोड करें।",
        "दस्तावेज़ सत्यापन में बोर्ड यही फ़ाइल माँगते हैं। एक प्रति रखें।",
      ];
    }
    if (notice.category === "important") {
      return [
        "इस नोट को कैलेंडर या चेतावनी मानें, फॉर्म नहीं।",
        `महीने या तिथि पर भरोसा करने से पहले ${name} वेबसाइट खोलें।`,
        "शुल्क देने से पहले परीक्षा सूचना का इंतज़ार करें।",
      ];
    }
    return [
      `${name} की आधिकारिक वेबसाइट खोलें। SarkariResultaa फॉर्म नहीं रखता।`,
      "अधिसूचना पीडीएफ पढ़ें, जिसमें पात्रता और आयु की तिथि हो।",
      "आवेदन ऑनलाइन पर क्लिक करके फॉर्म उसी साइट पर भरें।",
      "सूचना की अंतिम तिथि से पहले शुल्क ऑनलाइन दें।",
      "पुष्टि पृष्ठ सहेजें। यह डेस्क कभी भुगतान नहीं माँगती।",
    ];
  }
  if (notice.category === "result") {
    return [
      `Open the official website of ${name}.`,
      "Open the Result or CEN section on that site.",
      "Find this exam’s result PDF or the score-card login.",
      "Search your roll number, or log in with the registration number and date of birth.",
      "Download the PDF. A list on one regional site is not valid for another region.",
    ];
  }
  if (notice.category === "admit-card") {
    return [
      `Open the official website of ${name}.`,
      "Open the admit card or city-intimation link for this exam.",
      "Log in with the registration number and password, or the date of birth if that is what the page asks.",
      "Check the shift, centre address, and photo instruction on the first page.",
      "Download the PDF and carry the identity proof named on it.",
    ];
  }
  if (notice.category === "answer-key") {
    return [
      `Open the official website of ${name}.`,
      "Open the answer-key link for this exam.",
      "Log in if the key is behind the candidate portal.",
      "Match the question IDs with your response sheet.",
      "Pay a challenge fee only on that official portal, and only before the window closes.",
    ];
  }
  if (notice.category === "syllabus") {
    return [
      `Open the official notice of ${name}.`,
      "Read the scheme of examination in that PDF, not a third-party summary.",
      "Note the subjects, marks, and negative marking.",
      "Download the syllabus annexure from the same notice.",
    ];
  }
  if (notice.category === "certificate") {
    return [
      `Open the certificate link on the ${name} website.`,
      "Log in with the roll number or registration number.",
      "Download the e-certificate PDF.",
      "Boards ask for this file at document verification. Keep a copy.",
    ];
  }
  if (notice.category === "important") {
    return [
      "Read this note as a calendar or a warning, not as a form.",
      `Open the ${name} website before you rely on a month or a date.`,
      "Wait for the exam notice before you pay any fee.",
    ];
  }
  return [
    `Open the official website of ${name}. SarkariResultaa does not host the form.`,
    "Read the notification PDF, including eligibility and the as-on date for age.",
    "Click Apply Online and fill the form on that site.",
    "Pay the fee online before the last date printed on the notice.",
    "Save the confirmation page. This desk never asks for a payment.",
  ];
}

function faqs(notice: Notice, name: string, site: string, lang: Lang): { q: string; a: string }[] {
  if (lang === "hi") {
    const kind =
      notice.category === "result"
        ? "परिणाम"
        : notice.category === "admit-card"
          ? "एडमिट कार्ड"
          : notice.category === "answer-key"
            ? "उत्तर कुंजी"
            : notice.category === "latest-job"
              ? "आवेदन"
              : "अपडेट";
    return [
      { q: `यह ${kind} कौन जारी करता है?`, a: `${name} इसे आधिकारिक वेबसाइट पर जारी करता है। SarkariResultaa केवल पढ़ने का सार रखता है।` },
      { q: "आधिकारिक वेबसाइट कौन सी है?", a: site ? `${site} उपयोग करें। किसी अन्य पते पर शुल्क न दें।` : "नीचे की तालिका का आधिकारिक लिंक उपयोग करें।" },
      { q: "क्या SarkariResultaa पर आवेदन या भुगतान हो सकता है?", a: "नहीं। यह डेस्क फॉर्म, शुल्क या दस्तावेज़ स्वीकार नहीं करती।" },
      { q: `${kind} कैसे खोलें?`, a: "इस पृष्ठ के चरणों के बाद आधिकारिक लिंक खोलें। डाउनलोड फ़ाइल में अपना नाम और रोल नंबर मिलाएँ।" },
    ];
  }
  const kind =
    notice.category === "result"
      ? "result"
      : notice.category === "admit-card"
        ? "admit card"
        : notice.category === "answer-key"
          ? "answer key"
          : notice.category === "latest-job"
            ? "application"
            : "update";
  return [
    { q: `Who publishes this ${kind}?`, a: `${name} publishes it on the official website. SarkariResultaa only keeps a reading summary.` },
    { q: "What is the official website?", a: site ? `Use ${site}. Do not pay a fee on any other address.` : "Use the official link in the table below." },
    { q: "Can I apply or pay on SarkariResultaa?", a: "No. This desk does not accept forms, fees, or documents." },
    { q: `How do I open the ${kind}?`, a: "Follow the steps on this page, then use the official link. Match your name and roll number on the file you download." },
  ];
}
