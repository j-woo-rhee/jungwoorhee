/* =====================================================================
   SITE CONTENT — this is the only file you edit to update the website.
   Newest entries first. After editing, just redeploy (or refresh locally).

   PUBLICATION fields:
     img        thumbnail path, e.g. "images/mypaper.png" ("" = no thumbnail)
     venue      e.g. "CHI 2026"
     type       "paper" | "poster" | "workshop"  (drives the filter tabs)
     oral       true = blue venue badge (you gave an oral presentation)
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
    type: "paper",
    oral: true,
    award: "Honorable Mention",
    title: "Wire Your Way: Hardware-Contextualized Guidance and In-situ Tests for Personalized Circuit Prototyping",
    abstract: "The increasing popularity of microcontroller platforms like Arduino enables diverse end-user developers to participate in circuit prototyping. Traditionally, follow-along tutorials serve as an essential learning method for makers, and several prior toolkits leveraged this format. However, our formative study (N=12) shows that makers have unique preferences regarding how they construct their circuits and idiosyncratic ways to assess and debug problems, which contrasts with the step-by-step instructional nature of tutorials. To address this mismatch, we present a prototyping platform that supports personalized circuit construction and debugging, using an augmented breadboard that is circuit-aware and supports on-the-fly hardware reconfiguration via contextualized guidance and in-situ circuit validation.",
    authors: "Punn Lertjaturaphat*, <b>Jungwoo Rhee*</b>, Jaewon You, Andrea Bianchi",
    firstAuthor: true,
    pdf: "https://dl.acm.org/doi/pdf/10.1145/3772318.3791371",
    doi: "https://doi.org/10.1145/3772318.3791371"
  },
  {
    img: "images/chi2026-gazeandspeech.png",
    venue: "CHI 2026",
    type: "paper",
    oral: true,
    title: "Gaze and Speech in Multimodal Human-Computer Interaction: A Scoping Review",
    abstract: "Multimodal interaction has long promised to make interfaces more intuitive by combining complementary inputs. Among these, gaze and speech form a compelling pairing: gaze provides rapid spatial grounding, while speech conveys rich semantic information. Yet despite decades of exploration, the research remains fragmented. This scoping review examines 103 studies published between 1991 and 2025, organised into explicit (users intentionally provide gaze and speech) and implicit (systems leverage users' natural behaviours) interaction. Across both, we identify recurring ways of combining gaze and speech to resolve ambiguity, ground references, and support adaptivity, and contribute a synthesis to guide future multimodal interface design.",
    authors: "Anam Ahmad Khan, Florian Weidner, <b>Jungwoo Rhee</b>, Yasmeen Abdrabou, Andrea Bianchi, Eduardo Velloso, Hans Gellersen, Joshua Newn",
    firstAuthor: false,
    pdf: "https://dl.acm.org/doi/pdf/10.1145/3772318.3791662",
    doi: "https://doi.org/10.1145/3772318.3791662"
  },
  {
    img: "images/chiea26-oneisnotenough.png",
    venue: "CHI 2026 Poster",
    type: "poster",
    oral: true,
    title: "One Is Not Enough: How People Use Multiple AI Models in Everyday Life",
    abstract: "People increasingly use multiple Multimodal Large Language Models (MLLMs) concurrently, selecting each based on its perceived strengths. This cross-platform practice creates coordination challenges: adapting prompts to different interfaces, calibrating trust against inconsistent behaviors, and navigating separate conversation histories. Prior HCI research focused on single-agent interactions, leaving multi-MLLM orchestration underexplored. Through a diary study and semi-structured interviews (N=10), we examine how individuals organize work across competing AI systems. We find that users construct shifting primary and secondary hierarchies among models and develop personalized switching patterns triggered by task, effort, latency, and output credibility — insights that inform tools supporting people to coordinate multiple models.",
    authors: "Seunghwa Pyo*, Donggun Lee*, <b>Jungwoo Rhee*</b>, Soobin Park, Youn-kyung Lim",
    firstAuthor: true,
    pdf: "https://dl.acm.org/doi/pdf/10.1145/3772363.3798682",
    doi: "https://doi.org/10.1145/3772363.3798682"
  },
  {
    img: "",
    venue: "CHI 2026 Workshop",
    type: "workshop",
    oral: false,
    title: "Deepening, Redirecting, Expanding: A Design Space for Generative Interfaces with Qualitative Inquiry",
    abstract: "Current AI-mediated interviewing tools support only a narrow subset of the transformations qualitative researchers rely on: many can deepen a topic with follow-up probes, but inside static chat interfaces that resist topic pivots. This position paper argues that generative UI for qualitative research should treat epistemic goal evolution as a first-class design primitive. I characterize three recurring transformation patterns during interviews — deepening, redirecting, and expanding — and propose transformation grammars specifying how an interview interface should reconfigure in response to each. This framing positions genUI as a collaborative thinking environment whose structure co-evolves with the researcher's developing interpretation.",
    authors: "<b>Jungwoo Rhee</b>",
    firstAuthor: true,
    pdf: "https://genuimeetshci.github.io/chi26-workshop/proposals/design_space_genui_qualitative_inquiry_chi26_workshop.pdf",
    doi: ""
  },
  {
    img: "",
    venue: "CHI 2025 Workshop",
    type: "workshop",
    oral: false,
    title: "Passive Observation and Asynchronous Feedback to Mitigate Meeting Fatigue",
    abstract: "Recent research suggests incorporating asynchronous elements in MR collaboration, letting participants engage at flexible times to reduce pressure and cognitive strain. This paper proposes a hybrid MR system supporting passive observation and asynchronous feedback: users can quietly observe live VR meetings from non-VR devices (e.g., desktop or smartphone), later review recorded sessions, and provide structured textual feedback without pressure for immediate responses. By combining real-time passive attendance with asynchronous input, the approach addresses meeting fatigue and enhances inclusivity, particularly benefiting introverted users or those unable to participate actively in synchronous meetings.",
    authors: "<b>Jungwoo Rhee</b>",
    firstAuthor: true,
    pdf: "https://blendedrealities.jensemil.dk/wp-content/uploads/2025/04/CHI_2025_W12_sub10_JungwooRhee.pdf",
    doi: ""
  },
  {
    img: "",
    venue: "HCI Korea 2024",
    type: "paper",
    oral: false,
    title: "How Professionals Use Visual Asset Management: An Exploration through Interviews",
    abstract: "Visual Asset Management (VAM) is imperative for designers facing challenges in organization and productivity. This paper explores the VAM landscape and its challenges through user interviews and literature analysis. We propose three design opportunities — Visual Roadmap History, Streamlined Collaboration Tools, and Efficient Capacity Management — offering practical solutions for designers, with implications for the broader design process and for bridging gaps in visual asset management workflows and communication.",
    authors: "<b>Jungwoo Rhee</b>, Andrea Bianchi",
    firstAuthor: true,
    pdf: "",
    doi: ""
  }
];

const NEWS = [
  { date: "2026.06", html: "Visiting <a href='https://www.kth.se/' target='_blank' rel='noopener'>KTH Royal Institute of Technology</a> in Stockholm, Sweden for a workshop on our joint grant project.", isNew: true },
  { date: "2026.04", html: "<b>Wire Your Way</b> received a Best Paper <b>Honorable Mention</b> (top ~5%) at CHI 2026." },
  { date: "2026.04", html: "Attended CHI 2026 in Barcelona, Spain — presented 2 papers and 1 poster, and joined 1 workshop." },
  { date: "2026.02", html: "Workshop paper accepted to the <a href='https://genuimeetshci.github.io/chi26-workshop/' target='_blank' rel='noopener'>Generative UI workshop</a> at CHI 2026: <a href='https://genuimeetshci.github.io/chi26-workshop/proposals/design_space_genui_qualitative_inquiry_chi26_workshop.pdf' target='_blank' rel='noopener'>Deepening, Redirecting, Expanding</a>." },
  { date: "2026.02", html: "Poster accepted to CHI 2026: <a href='https://doi.org/10.1145/3772363.3798682' target='_blank' rel='noopener'>One Is Not Enough: How People Use Multiple AI Models in Everyday Life</a>." },
  { date: "2026.01", html: "Two papers accepted to CHI 2026: <a href='https://doi.org/10.1145/3772318.3791371' target='_blank' rel='noopener'>Wire Your Way</a> &amp; <a href='https://doi.org/10.1145/3772318.3791662' target='_blank' rel='noopener'>Gaze and Speech in Multimodal Human-Computer Interaction</a>." },
  { date: "2026.01", html: "Attending HCI Korea 2026 in Gangwon, Korea." },
  { date: "2025.09", html: "Assistant to PC and Student Volunteer for <a href='https://uist.acm.org/2025/organizers/' target='_blank' rel='noopener'>UIST 2025</a> in Busan, Korea." },
  { date: "2025.09", html: "Started my PhD at KAIST in Daejeon, Korea." },
  { date: "2025.04", html: "Student Volunteer for CHI 2025 in Yokohama, Japan." },
  { date: "2025.03", html: "Workshop paper accepted to the <a href='https://blendedrealities.jensemil.dk/' target='_blank' rel='noopener'>Scaling Distributed Collaboration in Mixed Reality</a> workshop at CHI 2025: <a href='https://blendedrealities.jensemil.dk/wp-content/uploads/2025/04/CHI_2025_W12_sub10_JungwooRhee.pdf' target='_blank' rel='noopener'>Passive Observation and Asynchronous Feedback to Mitigate Meeting Fatigue</a>." },
  { date: "2025.02", html: "Attending HCI Korea 2025 in Gangwon, Korea." },
  { date: "2024.10", html: "Attending UIST 2024 in Pittsburgh, US." },
  { date: "2024.06", html: "Defended master's thesis: Supporting designers to create environmentally responsible XR UIs." },
  { date: "2024.01", html: "Paper presented at HCI Korea 2024: How Professionals Use Visual Asset Management: An Exploration through Interviews." }
];
