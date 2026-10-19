import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, Menu, Phone, Siren, X,
} from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";

// -----------------------------------------------------------------------------
// CONTENT. Facts come from Angelo & Sons Doors and More's current site
// (angeloandsonsdenver.com: home, about-us, reviews, service-areas, gallery),
// checked 2026-10-19. Photos and the logo are hotlinked from that site.
// No founding year is stated: the site says both "since 1976" and "Since 2009".
// -----------------------------------------------------------------------------

const COMPANY = "Angelo & Sons Doors and More";
const SHORT = "Angelo & Sons";
const ABBR = "asd";
const PHONE = "7202773690";
const PHONE_DISPLAY = "(720) 277-3690";
const EMERGENCY = "7202987585";
const EMERGENCY_DISPLAY = "(720) 298-7585";
const EMAIL = "sales@angeloandsonsdenver.com";
const ADDRESS = "11801 E 33rd Ave, Unit D";
const CITY = "Aurora, CO 80010";
const MAPS_QUERY = "Angelo & Sons Doors and More, 11801 E 33rd Ave Unit D, Aurora, CO 80010";
const GOOGLE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const BBB_URL = "https://www.bbb.org/us/co/aurora/profile/doors/angelo-sons-doors-more-inc-1296-90172211";
const BBB_REVIEWS_URL = `${BBB_URL}/customer-reviews`;
const BBB_BADGE = "https://seal-alaskaoregonwesternwashington.bbb.org/customer-reviews/badge-7-Angelo-Sons-Doors-More-Inc-90172211.png";
const COC_URL = "https://www.chamberofcommerce.com/business-directory/colorado/aurora/window-installation-service/2007017779-angelo-sons-doors-more?source=memberwebsite";
const COC_BADGE = "https://coc.codes/images/badge/2007017779";
const FACEBOOK_URL = "https://www.facebook.com/people/Angelo-Sons-Doors-More/61589075888595/";
const END_DATE = "2026-11-23T23:59:59-07:00";

const UP = "https://angeloandsonsdenver.com/wp-content/uploads";
const LOGO = `${UP}/2025/01/cropped-logo-3.png`;
const PHOTOS = {
  hero: `${UP}/2025/03/After-Residential-Door-scaled.jpg`,
  trucks: `${UP}/2025/03/company-Trucks-scaled.jpg`,
  family: `${UP}/2025/07/Mentz-Vasquez-Quintana2023-135-1-1280x1920.jpg`,
  doors: `${UP}/2024/12/Doors1.jpg`,
  shower: `${UP}/2025/05/IMG_5658-scaled.jpg`,
  storefront: `${UP}/2026/09/Storefront-Pictures.jpg`,
  glassWall: `${UP}/2025/03/IMG_3988-scaled.jpg`,
  windows: `${UP}/2025/05/104OfficeWindows20250513_083721.jpeg`,
  garage: `${UP}/2024/12/0718161130_resized.jpg`,
};

// Their own line from the current homepage hero.
const TAGLINE = "If you can see or walk through it, Angelo's will replace or renew it!";

// Each "opening" is one of the four service families on their menu.
const OPENINGS = [
  {
    id: "showers", no: "01", kind: "shower", title: "Glass showers",
    line: "Frameless and framed glass enclosures, designed for your bathroom and installed by the family.",
    items: ["Glass shower design & installation", "Glass shower repair & replacement"],
    photo: PHOTOS.shower,
  },
  {
    id: "residential", no: "02", kind: "entry", title: "Residential doors",
    line: "Front doors with curb appeal, patio doors that glide, and garage doors that close tight.",
    items: ["Exterior & entry doors", "Fiberglass doors", "Patio doors", "Garage doors"],
    photo: PHOTOS.doors,
  },
  {
    id: "commercial", no: "03", kind: "steel", title: "Commercial doors",
    line: "Steel, storefront and overhead doors for shops, offices and warehouses, including damage replacements.",
    items: ["Steel doors", "Storefront doors", "Commercial garage doors"],
    photo: PHOTOS.storefront,
  },
  {
    id: "windows", no: "04", kind: "window", title: "Windows & glass walls",
    line: "Vinyl replacement windows for homes, storefront glazing, and glass partitions for offices.",
    items: ["Vinyl windows", "Commercial storefront windows", "Glass walls & partitions"],
    photo: PHOTOS.windows,
  },
];
const SERVICE_OPTIONS = ["Not sure yet", ...OPENINGS.flatMap((o) => o.items), "Emergency repair"];

// Project photos from their homepage and gallery.
const GALLERY = [
  { src: PHOTOS.hero, label: "Entry door", tag: "Residential" },
  { src: PHOTOS.glassWall, label: "Glass walls & doors", tag: "Commercial" },
  { src: `${UP}/2024/12/10-1.jpg`, label: "Glass shower", tag: "Showers" },
  { src: PHOTOS.storefront, label: "Storefront", tag: "Commercial" },
  { src: `${UP}/2024/12/326-1-768x1024.jpg`, label: "Shower enclosure", tag: "Showers" },
  { src: PHOTOS.garage, label: "Garage door", tag: "Residential" },
  { src: `${UP}/2024/12/208.jpg`, label: "Project", tag: "Gallery" },
  { src: PHOTOS.windows, label: "Office windows", tag: "Windows" },
];

// Verbatim client testimonials from the angeloandsonsdenver.com homepage.
const REVIEWS = [
  { name: "Abel Garcia", text: "I tried looking up YouTube videos and things went terribly wrong for me so I had to ignore my ego and reach out for help. The owners came out and did this job themselves. This was a 10/10 experience. I am super stoked to have used their service as it was pretty quick and painless." },
  { name: "Denver Vapor", text: "This company did a great job. We had a car ram the door on our storefront, and Angelo and sons replaced our door with a better metal door. They were fast, competent, and communicated with us during the whole process. Highly recommend this company for commercial door installation. Thanks Angela!" },
  { name: "Drew Page", text: "Angelo & Sons were excellent to work with in replacing our back door. Very fair pricing, they were able to get a door much quicker than several other companies we quoted, and they did a great job in replacing the framing and installing the new door. Excellent communication and super nice people to do business with." },
  { name: "Devon Sisneros", text: "This crew is amazing. We had a few projects done and we couldn’t be more proud of the work that was completed. Everyone who has seen the changes has made positive comments and we are so grateful for the flexibility of the crew when making last minute adjustments." },
  { name: "Cal Wilkens", text: "Did a wonderful job replacing my back and front doors. Great at communicating and easy to work with, highly recommend." },
  { name: "Lisa d", text: "What a great family owned business. They were kind, professional and really know what they are doing. They were very fair in pricing as well. Highly recommend" },
];

const AREAS = [
  "Applewood", "Aurora", "Broomfield", "Centennial", "Commerce City", "Englewood", "Federal Heights", "Glendale", "Golden",
  "Greenwood Village", "Henderson", "Highlands Ranch", "Littleton", "Northglenn", "Thornton", "Welby", "Westminster", "Wheat Ridge",
];

const NAV = [["Services", "#openings"], ["Family", "#family"], ["Projects", "#projects"], ["Reviews", "#reviews"], ["Visit", "#visit"]];

// -----------------------------------------------------------------------------
// MOTIFS: door slabs, glass panes and a brass keyhole.
// -----------------------------------------------------------------------------

function Keyhole({ size = 18, className = "" }) {
  return (
    <svg className={`keyhole ${className}`} width={size} height={size * 1.5} viewBox="0 0 20 30" aria-hidden="true">
      <circle cx="10" cy="9" r="7" fill="currentColor" />
      <path d="M6 12h8l2.5 16h-13z" fill="currentColor" />
    </svg>
  );
}

// A small elevation drawing of each opening type, drawn like a door schedule.
function Elevation({ kind }) {
  const frame = { fill: "none", stroke: "currentColor", strokeWidth: 2.2 };
  const thin = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 };
  return (
    <svg className="elevation" viewBox="0 0 80 120" aria-hidden="true">
      <rect x="6" y="4" width="68" height="112" {...frame} />
      {kind === "entry" && (<>
        <rect x="14" y="12" width="52" height="96" {...thin} />
        <rect x="20" y="18" width="40" height="36" className="pane" />
        <rect x="20" y="62" width="17" height="38" {...thin} /><rect x="43" y="62" width="17" height="38" {...thin} />
        <circle cx="59" cy="60" r="2.6" fill="var(--brass)" stroke="none" />
      </>)}
      {kind === "shower" && (<>
        <rect x="12" y="10" width="56" height="100" className="pane" />
        <line x1="40" y1="10" x2="40" y2="110" {...thin} />
        <path d="M18 24 l12 -8 M18 34 l18 -12" {...thin} opacity=".6" />
        <rect x="44" y="52" width="3" height="20" rx="1.5" fill="var(--brass)" stroke="none" />
      </>)}
      {kind === "steel" && (<>
        <rect x="14" y="12" width="52" height="96" {...thin} />
        <rect x="22" y="22" width="12" height="28" className="pane" />
        <line x1="20" y1="66" x2="60" y2="66" stroke="var(--brass)" strokeWidth="3" />
        {[30, 44, 58, 72, 86, 100].map((y) => <line key={y} x1="14" y1={y} x2="66" y2={y} {...thin} opacity=".25" />)}
      </>)}
      {kind === "window" && (<>
        <rect x="12" y="10" width="56" height="100" className="pane" />
        <line x1="40" y1="10" x2="40" y2="110" {...frame} />
        <line x1="12" y1="60" x2="68" y2="60" {...frame} />
        <path d="M18 22 l12 -8 M48 72 l14 -9" {...thin} opacity=".6" />
      </>)}
    </svg>
  );
}

// The hero "threshold": their own finished entry door set inside a drawn frame.
function Threshold() {
  return (
    <div className="threshold">
      <div className="threshold-casing">
        <div className="threshold-transom"><span>{SHORT}</span></div>
        <div className="threshold-opening">
          <img src={PHOTOS.hero} alt="A residential entry door installed by Angelo & Sons" loading="eager" />
          <div className="threshold-door" aria-hidden="true">
            <i /><i /><i /><i />
            <span className="threshold-knob" />
          </div>
        </div>
      </div>
      <div className="threshold-step" aria-hidden="true" />
      <div className="threshold-plate">
        <Keyhole size={12} />
        <div><small>Family owned</small><strong>Owners on the job</strong></div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SECTIONS
// -----------------------------------------------------------------------------

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="emergency-bar">
        <div className="wrap emergency-inner">
          <span><Siren size={15} /> Broken door or glass? Emergency service line</span>
          <a href={`tel:${EMERGENCY}`}>{EMERGENCY_DISPLAY}</a>
        </div>
      </div>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label={`${COMPANY} home`}>
          <span className="logo-plate"><img src={LOGO} alt={COMPANY} /></span>
          <span className="brand-word"><strong>{SHORT}</strong><small>Doors and More · Aurora, CO</small></span>
        </a>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
          {NAV.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#estimate" onClick={() => setOpen(false)}>Schedule an estimate</a>
          <a className="nav-phone" href={`tel:${PHONE}`} onClick={() => setOpen(false)}><Phone size={16} /> {PHONE_DISPLAY}</a>
        </nav>
        <a className="header-phone" href={`tel:${PHONE}`}><Phone size={16} />{PHONE_DISPLAY}</a>
        <a className="btn btn-brass header-cta" href="#estimate">Get an estimate</a>
        <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glass" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="label">Doors · Windows · Glass showers · Glass walls</span>
          <h1>If you can see it or walk through it, <em>we’ll replace it or renew it.</em></h1>
          <p>{SHORT} is a family-owned door, window and glass company in Aurora, serving homes and businesses across the Denver metro. The family runs the business and often does the install themselves.</p>
          <div className="hero-actions">
            <a className="btn btn-brass" href="#estimate">Schedule an estimate <ArrowRight size={18} /></a>
            <a className="btn btn-ghost" href={`tel:${PHONE}`}><Phone size={17} /> {PHONE_DISPLAY}</a>
          </div>
          <ul className="hero-facts">
            <li><b>A+</b> BBB rating</li>
            <li><b>18</b> metro cities served</li>
            <li><b><Siren size={24} /></b> <a href={`tel:${EMERGENCY}`}>Emergency service</a></li>
          </ul>
        </div>
        <Threshold />
      </div>
    </section>
  );
}

function Openings() {
  return (
    <section className="section openings" id="openings">
      <div className="wrap">
        <div className="head">
          <span className="label">Door schedule</span>
          <h2>Choose your opening.</h2>
          <p>Four kinds of openings, one crew. Pick the one you're thinking about and we'll set up an estimate.</p>
        </div>
        <div className="opening-row">
          {OPENINGS.map((o) => (
            <article className={`opening opening-${o.kind}`} key={o.id} id={o.id}>
              <div className="opening-photo">
                <img src={o.photo} alt="" loading="lazy" />
                <Elevation kind={o.kind} />
                <span className="opening-no">{o.no}</span>
              </div>
              <div className="opening-body">
                <h3>{o.title}</h3>
                <p>{o.line}</p>
                <ul>{o.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a className="opening-go" href="#estimate" data-service={o.items[0]}>Get an estimate <ArrowRight size={16} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Family() {
  return (
    <section className="section family" id="family">
      <div className="wrap family-inner">
        <div className="family-photos">
          <figure className="family-main"><img src={PHOTOS.family} alt="The Angelo & Sons family" loading="lazy" /></figure>
          <figure className="family-trucks"><img src={PHOTOS.trucks} alt="Angelo & Sons work trucks" loading="lazy" /></figure>
        </div>
        <div className="family-copy">
          <span className="label light">Family owned and operated</span>
          <h2>The name on the truck <em>is the family at your door.</em></h2>
          <p>Angelo Mentz has been in the door business for decades, alongside his wife Linda. Today their daughter Angela runs {SHORT}, and the family still treats every opening like it's going on their own house.</p>
          <ul className="family-values">
            <li><Keyhole size={11} /><span><b>Honest pricing.</b> A clear estimate before anything is ordered.</span></li>
            <li><Keyhole size={11} /><span><b>Steady communication.</b> You know when the door arrives and when the crew shows up.</span></li>
            <li><Keyhole size={11} /><span><b>Sourced to fit.</b> A network of suppliers means the right door or window, for whatever size job.</span></li>
          </ul>
          <blockquote className="family-quote">“The owners came out and did this job themselves.”<cite>Abel Garcia, client testimonial</cite></blockquote>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="wrap">
        <div className="head head-row">
          <div>
            <span className="label">Recent projects</span>
            <h2>A wall of glass, <em>doors and steel.</em></h2>
          </div>
          <p>Real installs from the {SHORT} crew, from bathroom glass to storefronts.</p>
        </div>
        <div className="partition">
          {GALLERY.map((g, i) => (
            <figure className={`pane-cell cell-${i}`} key={g.src + i}>
              <img src={g.src} alt={`${g.label} by ${SHORT}`} loading="lazy" />
              <figcaption><span>{g.tag}</span>{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <div className="head head-row">
          <div>
            <span className="label">In their words</span>
            <h2>Clients who walked <em>through our doors.</em></h2>
          </div>
          <p className="reviews-source">Client testimonials as published on angeloandsonsdenver.com.</p>
        </div>
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <figure className="review" key={r.name}>
              <Keyhole size={14} className="review-mark" />
              <blockquote>{r.text}</blockquote>
              <figcaption>{r.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="badge-shelf">
          <a className="badge badge-bbb" href={BBB_URL} target="_blank" rel="noopener noreferrer">
            <span className="badge-grade">A+</span>
            <span><small>Better Business Bureau</small><strong>A+ rated</strong></span>
          </a>
          <a className="badge badge-img" href={BBB_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <img src={BBB_BADGE} alt="BBB Customer Reviews" loading="lazy" />
            <span><small>BBB</small><strong>Customer reviews</strong></span>
          </a>
          <a className="badge badge-img" href={COC_URL} target="_blank" rel="noopener noreferrer">
            <img src={COC_BADGE} alt="Chamber of Commerce member" loading="lazy" />
            <span><small>Chamber of Commerce</small><strong>Member listing</strong></span>
          </a>
          <a className="badge badge-google" href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">
            <span><small>Google</small><strong>See our reviews on Google</strong></span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function EstimateForm() {
  const blank = { name: "", phone: "", email: "", address: "", service: "", timing: "", notes: "", website: "" };
  const [form, setForm] = useState(blank);
  const [type, setType] = useState("Home");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const payload = { ...form, notes: `[${type}] ${form.notes}`.trim() };
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="form done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? "This is where Angelo & Sons gets your request." : "Request received."}</h3>
        <p>{status === "demo"
          ? `In this concept preview, requests aren't sent anywhere. On the live site they'd arrive at ${EMAIL} with everything needed to call you back.`
          : `Thanks, ${form.name.split(" ")[0]}. We'll call to set up your estimate.`}</p>
        <button type="button" className="btn btn-steel" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-toggle" role="group" aria-label="Property type">
        {["Home", "Business"].map((t) => (
          <button type="button" key={t} className={type === t ? "on" : ""} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>
        ))}
      </div>
      <div className="form-row">
        <label>Name *<input value={form.name} onChange={update("name")} required maxLength={160} autoComplete="name" /></label>
        <label>Phone *<input type="tel" value={form.phone} onChange={update("phone")} required maxLength={40} autoComplete="tel" /></label>
      </div>
      <div className="form-row">
        <label>Email<input type="email" value={form.email} onChange={update("email")} maxLength={254} autoComplete="email" /></label>
        <label>Project address<input value={form.address} onChange={update("address")} maxLength={200} autoComplete="street-address" placeholder="Street, city" /></label>
      </div>
      <div className="form-row">
        <label>What needs work?<select value={form.service} onChange={update("service")}><option value="">Choose one…</option>{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select></label>
        <label>Timing<select value={form.timing} onChange={update("timing")}><option value="">Choose…</option><option>As soon as possible</option><option>Within a month</option><option>1–3 months</option><option>Just planning</option></select></label>
      </div>
      <label>Tell us about it<textarea rows={4} maxLength={3000} value={form.notes} onChange={update("notes")} placeholder="Door or window size, damage, style you have in mind…" /></label>
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn btn-brass full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request my estimate"} <ArrowUpRight size={18} /></button>
      <p className="form-note">Something broken right now? Call the emergency line, <a href={`tel:${EMERGENCY}`}>{EMERGENCY_DISPLAY}</a>.</p>
    </form>
  );
}

function Estimate() {
  return (
    <section className="section estimate" id="estimate">
      <div className="wrap estimate-inner">
        <div className="estimate-copy">
          <span className="label">Schedule an estimate</span>
          <h2>Tell us about the opening. <em>We'll come measure.</em></h2>
          <ol className="steps">
            <li><b>Send a request</b><span>Or call. A few details and a photo help.</span></li>
            <li><b>We measure and quote</b><span>An honest price before anything is ordered.</span></li>
            <li><b>The family installs</b><span>Clean, on schedule, and checked before we leave.</span></li>
          </ol>
          <div className="contact-lines">
            <a href={`tel:${PHONE}`}><Phone size={18} /><span><small>Main line</small>{PHONE_DISPLAY}</span></a>
            <a href={`tel:${EMERGENCY}`} className="is-urgent"><Siren size={18} /><span><small>Emergency service</small>{EMERGENCY_DISPLAY}</span></a>
            <a href={`mailto:${EMAIL}`}><Mail size={18} /><span><small>Email</small>{EMAIL}</span></a>
          </div>
        </div>
        <EstimateForm />
      </div>
    </section>
  );
}

function Visit() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=14&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="wrap visit-inner">
        <div className="visit-copy">
          <span className="label">Based in Aurora</span>
          <h2>Serving the <em>Denver metro.</em></h2>
          <p className="visit-address"><MapPin size={19} /><span>{ADDRESS}<br />{CITY}</span></p>
          <ul className="areas">{AREAS.map((a) => <li key={a}>{a}</li>)}</ul>
          <div className="visit-actions">
            <a className="btn btn-steel" href={directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={17} /></a>
            <a className="btn btn-line" href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">Find us on Google <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="map"><iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="logo-plate lg"><img src={LOGO} alt={COMPANY} /></span>
          <p>{TAGLINE}</p>
        </div>
        <div className="footer-cols">
          <div><h4>Services</h4>{OPENINGS.map((o) => <a key={o.id} href={`#${o.id}`}>{o.title}</a>)}</div>
          <div><h4>Contact</h4><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a><a href={`tel:${EMERGENCY}`}>Emergency {EMERGENCY_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>{ADDRESS}, {CITY}</span></div>
          <div><h4>Find us</h4><a href={BBB_URL} target="_blank" rel="noopener noreferrer">BBB profile</a><a href={COC_URL} target="_blank" rel="noopener noreferrer">Chamber of Commerce</a><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a><a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">Google</a></div>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>Independent concept by Blueprint WebStudio · not affiliated with or endorsed by {COMPANY}. Not an official company website.</span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
      <Header />
      <main>
        <Hero />
        <Openings />
        <Family />
        <Projects />
        <Reviews />
        <Estimate />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
