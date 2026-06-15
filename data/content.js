/* =====================================================================
   SITE CONTENT — this is the only file you edit to update the website.
   Newest entries first. After editing, just redeploy (or refresh locally).

   PUBLICATION fields:
     img        thumbnail path, e.g. "images/mypaper.png" ("" = no thumbnail)
     venue      e.g. "CHI 2026"
     oral       true = blue accent badge (oral/award), false = plain
     title      paper title
     authors    HTML string; wrap your name in <b>…</b> to bold it
     firstAuthor true if you are (co-)first author (used by the filter)
     pdf        URL or "files/mypaper.pdf"  — leave "" to hide the [PDF] button
     doi        DOI URL                     — leave "" to hide the [DOI] button

   NEWS fields:
     date   "YYYY.MM"
     html   the text; you may include <b>…</b> or
            <a href='…' target='_blank' rel='noopener'>links</a>
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
    doi: "https://dl.acm.org/doi/abs/10.1145/3772318.3791371"
  },
  {
    img: "images/chi2026-gazeandspeech.png",
    venue: "CHI 2026",
    oral: false,
    title: "Gaze and Speech in Multimodal Human-Computer Interaction: A Scoping Review",
    authors: "Anam Ahmad Khan, Florian Weidner, <b>Jungwoo Rhee</b>, Yasmeen Abdrabou, Andrea Bianchi, Eduardo Velloso, Hans Gellersen, Joshua Newn",
    firstAuthor: false,
    pdf: "",
    doi: "https://dl.acm.org/doi/abs/10.1145/3772318.3791662"
  },
  {
    img: "",
    venue: "CHI 2026 LBW",
    oral: false,
    title: "One Is Not Enough: How People Use Multiple AI Models in Everyday Life",
    authors: "Seunghwa Pyo*, Donggun Lee*, <b>Jungwoo Rhee*</b>, Soobin Park, Youn-kyung Lim",
    firstAuthor: true,
    pdf: "",
    doi: "https://dl.acm.org/doi/abs/10.1145/3772363.3798682"
  },
  {
    img: "",
    venue: "CHI 2026 Workshop",
    oral: false,
    title: "Deepening, Redirecting, Expanding: A Design Space for Generative Interfaces with Qualitative Inquiry",
    authors: "<b>Jungwoo Rhee</b>",
    firstAuthor: true,
    pdf: "https://genuimeetshci.github.io/chi26-workshop/proposals/design_space_genui_qualitative_inquiry_chi26_workshop.pdf",
    doi: ""
  },
  {
    img: "",
    venue: "CHI 2025 Workshop",
    oral: false,
    title: "Passive Observation and Asynchronous Feedback to Mitigate Meeting Fatigue",
    authors: "<b>Jungwoo Rhee</b>",
    firstAuthor: true,
    pdf: "https://blendedrealities.jensemil.dk/wp-content/uploads/2025/04/CHI_2025_W12_sub10_JungwooRhee.pdf",
    doi: ""
  },
  {
    img: "",
    venue: "HCI Korea 2024",
    oral: false,
    title: "How Professionals Use Visual Asset Management: An Exploration through Interviews",
    authors: "<b>Jungwoo Rhee</b>, Andrea Bianchi",
    firstAuthor: true,
    pdf: "",
    doi: ""
  }
];

const NEWS = [
  { date: "2026.06", html: "Visiting <a href='https://www.kth.se/' target='_blank' rel='noopener'>KTH Royal Institute of Technology</a> in Stockholm, Sweden for a workshop on our joint grant project.", isNew: true },
  { date: "2026.04", html: "Attended CHI 2026 in Barcelona, Spain — presented 2 papers and 1 poster, and joined 1 workshop." },
  { date: "2026.02", html: "Workshop paper accepted to the <a href='https://genuimeetshci.github.io/chi26-workshop/' target='_blank' rel='noopener'>Generative UI workshop</a> at CHI 2026: <a href='https://genuimeetshci.github.io/chi26-workshop/proposals/design_space_genui_qualitative_inquiry_chi26_workshop.pdf' target='_blank' rel='noopener'>Deepening, Redirecting, Expanding</a>." },
  { date: "2026.02", html: "Poster (Late-Breaking Work) accepted to CHI 2026: <a href='https://dl.acm.org/doi/abs/10.1145/3772363.3798682' target='_blank' rel='noopener'>One Is Not Enough: How People Use Multiple AI Models in Everyday Life</a>." },
  { date: "2026.01", html: "Two papers accepted to CHI 2026: <a href='https://dl.acm.org/doi/abs/10.1145/3772318.3791371' target='_blank' rel='noopener'>Wire Your Way</a> &amp; <a href='https://dl.acm.org/doi/abs/10.1145/3772318.3791662' target='_blank' rel='noopener'>Gaze and Speech in Multimodal Human-Computer Interaction</a>." },
  { date: "2026.01", html: "Attending HCI Korea 2026 in Korea." },
  { date: "2025.09", html: "Assistant to PC and Student Volunteer for <a href='https://uist.acm.org/2025/organizers/' target='_blank' rel='noopener'>UIST 2025</a> in Busan, Korea." },
  { date: "2025.09", html: "Started my PhD at KAIST in Daejeon, Korea." },
  { date: "2025.04", html: "Student Volunteer for CHI 2025 in Yokohama, Japan." },
  { date: "2025.03", html: "Workshop paper accepted to the <a href='https://blendedrealities.jensemil.dk/' target='_blank' rel='noopener'>Blending Realities for Interaction across Distributed Group Environments</a> workshop at CHI 2025: <a href='https://blendedrealities.jensemil.dk/wp-content/uploads/2025/04/CHI_2025_W12_sub10_JungwooRhee.pdf' target='_blank' rel='noopener'>Passive Observation and Asynchronous Feedback to Mitigate Meeting Fatigue</a>." },
  { date: "2025.02", html: "Attending HCI Korea 2025 in Gangwon, Korea." },
  { date: "2024.10", html: "Attending UIST 2024 in Pittsburgh, US." },
  { date: "2024.06", html: "Defended master's thesis: Supporting designers to create environmentally responsible XR UIs." },
  { date: "2024.01", html: "Paper presented at HCI Korea 2024: How Professionals Use Visual Asset Management: An Exploration through Interviews." }
];
