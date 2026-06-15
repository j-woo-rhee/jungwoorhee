/* =====================================================================
   SITE CONTENT — this is the only file you edit to update the website.
   Newest entries first. After editing, just redeploy (or refresh locally).

   PUBLICATION fields:
     img        thumbnail path, e.g. "images/mypaper.png"
     venue      e.g. "CHI 2026"
     oral       true = blue accent badge (oral/award), false = plain
     title      paper title
     authors    HTML string; wrap your name in <b>…</b> to bold it
     firstAuthor true if you are (co-)first author (used by the filter)
     pdf        URL or "files/mypaper.pdf"  — leave "" to hide the [PDF] button
     doi        DOI URL                     — leave "" to hide the [DOI] button

   NEWS fields:
     date   "YYYY.MM"
     html   the text; you may include <b>…</b> or <a href="…">…</a>
     isNew  true to show the blue NEW badge (optional; drop it on old items)
   ===================================================================== */

const PUBLICATIONS = [
  {
    img: "images/chi2026-wireyourway.png",
    venue: "CHI 2026",
    oral: false,
    title: "Wire Your Way: Hardware-Contextualized Guidance and In-situ Tests for Personalized Circuit Prototyping",
    authors: "Punn Lertjaturaphat*, <b>Jungwoo Rhee*</b>, Jaewon You, Andrea Bianchi",
    firstAuthor: true,
    pdf: "",
    doi: ""
  },
  {
    img: "images/chi2026-gazeandspeech.png",
    venue: "CHI 2026",
    oral: false,
    title: "Gaze and Speech in Multimodal Human-Computer Interaction: A Scoping Review",
    authors: "Anam Ahmad Khan, Florian Weidner, <b>Jungwoo Rhee</b>, Yasmeen Abdrabou, Andrea Bianchi, Eduardo Velloso, Hans Gellersen, Joshua Newn",
    firstAuthor: false,
    pdf: "",
    doi: ""
  }
];

const NEWS = [
  { date: "2026.01", html: "Papers accepted to CHI 2026: <b>Wire Your Way</b> &amp; <b>Gaze and Speech in Multimodal Human-Computer Interaction</b>.", isNew: true },
  { date: "2025.09", html: "Assistant to PC and Student Volunteer for UIST 2025 in Busan, Korea." },
  { date: "2025.09", html: "Started PhD student at KAIST in Daejeon, Korea." },
  { date: "2025.04", html: "Student Volunteer for CHI 2025 in Yokohama, Japan." },
  { date: "2025.03", html: "Workshop paper accepted to CHI 2025: Scaling Distributed Collaboration in Mixed Reality." },
  { date: "2025.02", html: "Attending HCI Korea 2025 in Gangwon, Korea." },
  { date: "2024.10", html: "Attending UIST 2024 in Pittsburgh, US." },
  { date: "2024.06", html: "Defended master's thesis: Supporting designers to create environmentally responsible XR UIs." },
  { date: "2024.01", html: "Paper accepted to present at HCI Korea 2024: How designers manage digital assets." }
];
