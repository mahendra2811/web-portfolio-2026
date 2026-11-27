import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faChartLine,
  faCheck,
  faCircle,
  faGaugeHigh,
  faKey,
  faListCheck,
  faScrewdriverWrench,
  faTruck,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { gaadiPulseFaq, gaadiPulseFeatures } from "@/data/gaadipulse-landing";
import { GaadiPulseGallery } from "@/components/gaadipulse/GaadiPulseGallery";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./gaadipulse.css";

const playUrl = "https://play.google.com/store/apps/details?id=com.pooniya.gaadipulse";
const media = "/projects/gaadipulse";

export const metadata: Metadata = {
  title: "GaadiPulse — Every Vehicle. Every Detail.",
  description:
    "Organize your vehicle garage, fuel and charging entries, expenses, reminders and shared access in one place with GaadiPulse.",
  alternates: { canonical: "https://pooniya.com/portfolio/gaadipulse" },
  openGraph: {
    title: "GaadiPulse — Every Vehicle. Every Detail.",
    description: "A clearer way to keep up with the vehicles you depend on.",
    url: "https://pooniya.com/portfolio/gaadipulse",
    images: [`${media}/hero.webp`],
  },
};

const nav = [
  ["Overview", "#top"],
  ["Features", "#features"],
  ["How it works", "#how-it-works"],
  ["Owner & Pilot", "#roles"],
  ["Use cases", "#use-cases"],
  ["Insights", "#insights"],
  ["FAQs", "#faq"],
] as const;
const capabilities = [
  [
    faTruck,
    "Multi-vehicle garage",
    "Keep supported vehicles organized with their own details and history.",
  ],
  [
    faBolt,
    "Fuel & charging",
    "Record fuel fills or charging sessions, quantity, cost and meter readings.",
  ],
  [faWallet, "Vehicle expenses", "Log service, repairs, insurance, tolls and other vehicle costs."],
  [
    faGaugeHigh,
    "Meter & mileage",
    "Review meter entries and mileage when valid records support a calculation.",
  ],
  [faKey, "Owner & Pilot access", "Share a vehicle with configurable, vehicle-level permissions."],
  [faChartLine, "Reports & history", "Revisit recorded activity and available vehicle reports."],
  [
    faScrewdriverWrench,
    "Reminders",
    "Keep document details and date or meter-based reminders in view.",
  ],
  [
    faListCheck,
    "Record review",
    "Find vehicle entries and understand what has been recorded over time.",
  ],
] as const;

export default function GaadiPulsePage() {
  return (
    <main className="gp-page" id="top">
      <header className="gp-nav">
        <a className="gp-brand" href="#top" aria-label="GaadiPulse home">
          <Image src={`${media}/logo.png`} alt="GaadiPulse" width={190} height={58} priority />
        </a>
        <nav aria-label="Main navigation">
          {nav.map(([name, href]) => (
            <a key={href} href={href}>
              {name}
            </a>
          ))}
        </nav>
        <div className="gp-header-actions">
          <ThemeToggle />
          <a className="gp-nav-cta" href={playUrl} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGooglePlay} /> Download App
          </a>
        </div>
      </header>

      <section className="gp-hero">
        <div className="gp-hero-grid">
          <div className="gp-hero-copy">
            <span className="gp-eyebrow">
              <span /> VEHICLE RECORDS, MADE CLEAR
            </span>
            <h1>
              Every vehicle.
              <br />
              <em>Every detail.</em>
            </h1>
            <p className="gp-lead">
              Complete control in one place. Manage vehicles, track fuel and charging expenses,
              organize service records, and understand vehicle activity with GaadiPulse.
            </p>
            <div className="gp-actions">
              <a
                className="gp-button gp-button-primary"
                href={playUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGooglePlay} /> Get it on Google Play{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a className="gp-button gp-button-secondary" href="#features">
                Explore features <span>↓</span>
              </a>
            </div>
            <p className="gp-availability">
              <FontAwesomeIcon icon={faCircle} /> Google Play testing · Access may depend on the
              testing track
            </p>
            <div className="gp-proof">
              <span>
                <FontAwesomeIcon icon={faCheck} /> Vehicle-wise records
              </span>
              <span>
                <FontAwesomeIcon icon={faCheck} /> Configurable access
              </span>
              <span>
                <FontAwesomeIcon icon={faCheck} /> Android app
              </span>
            </div>
          </div>
          <div className="gp-hero-art">
            <div className="gp-hero-glow" />
            <div className="gp-hero-banner">
              <Image
                src={`${media}/hero.webp`}
                alt="GaadiPulse vehicle management promotional banner"
                fill
                priority
                sizes="(max-width: 800px) 95vw, 620px"
              />
            </div>
            <div className="gp-device">
              <Image
                src={`${media}/auth.jpg`}
                alt="GaadiPulse app introduction and vehicle categories"
                fill
                priority
                sizes="(max-width: 800px) 80vw, 420px"
              />
            </div>
            <div className="gp-float-card gp-float-top">
              <b>One digital garage</b>
              <small>Vehicles · fuel · expenses</small>
            </div>
            <div className="gp-float-card gp-float-bottom">
              <b>Owner + Pilot</b>
              <small>Access by vehicle</small>
            </div>
          </div>
        </div>
        <a className="gp-scroll" href="#overview">
          SCROLL TO EXPLORE <span />
        </a>
      </section>

      <section className="gp-ribbon" id="overview">
        <div>
          {["GARAGE", "FUEL & CHARGING", "EXPENSES", "REMINDERS", "OWNER + PILOT", "REPORTS"].map(
            (x) => (
              <span key={x}>
                {x}
                <i>✳</i>
              </span>
            ),
          )}
        </div>
      </section>

      <section className="gp-section gp-problem">
        <div className="gp-section-heading">
          <span className="gp-eyebrow">LESS SCATTER. MORE CLARITY.</span>
          <h2>
            Vehicle details shouldn’t live <em>everywhere.</em>
          </h2>
          <p>
            Paper notes, spreadsheets and message threads make it hard to see a vehicle’s history.
            GaadiPulse gives owners and drivers one place to record details and review them later.
          </p>
        </div>
        <div className="gp-problem-grid">
          <article>
            <span>01</span>
            <h3>Scattered records</h3>
            <p>Fuel, repairs and service notes are easy to lose across notebooks and chats.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Hard-to-compare costs</h3>
            <p>Vehicle-wise entries make operating expenses easier to revisit and compare.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Limited shared visibility</h3>
            <p>Vehicle-level Pilot access helps owners review submitted records with their team.</p>
          </article>
        </div>
      </section>

      <section className="gp-section gp-feature-section" id="features">
        <div className="gp-section-heading">
          <span className="gp-eyebrow">THE WHOLE PICTURE</span>
          <h2>
            Everything your vehicle
            <br />
            <em>records need.</em>
          </h2>
          <p>Practical tools for keeping everyday vehicle details organized, all in one place.</p>
        </div>
        <div className="gp-capability-grid">
          {capabilities.map(([icon, title, description]) => (
            <article key={title}>
              <span>
                <FontAwesomeIcon icon={icon} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="gp-feature-grid">
          {gaadiPulseFeatures.slice(0, 3).map((feature, index) => (
            <article
              className={`gp-feature-card ${index === 0 ? "gp-feature-wide" : ""}`}
              key={feature.number}
            >
              <div className="gp-feature-info">
                <span className="gp-feature-number">
                  {feature.number} / {feature.tag}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="gp-feature-image">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 540px"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gp-split-section">
        <div className="gp-split-copy">
          <span className="gp-eyebrow">YOUR DIGITAL GARAGE</span>
          <h2>
            One account.
            <br />
            <em>Every vehicle.</em>
          </h2>
          <p>
            Add and organize vehicles, set up their details, then switch between them to keep each
            vehicle’s fuel and expense records in its own history.
          </p>
          <ul>
            <li>Choose from supported vehicle categories</li>
            <li>Keep vehicle details and activity together</li>
            <li>Review records one vehicle at a time</li>
          </ul>
        </div>
        <div className="gp-banner-frame">
          <Image
            src={`${media}/portfolio/GaadiPulse Vehicle Management Banner.png`}
            alt="GaadiPulse vehicle management and digital garage banner"
            fill
            sizes="(max-width: 700px) 95vw, 700px"
          />
        </div>
      </section>

      <section className="gp-section gp-operations">
        <div className="gp-section-heading">
          <span className="gp-eyebrow">THE DAY-TO-DAY LOGBOOK</span>
          <h2>
            Fuel, charging and expenses—<em>kept together.</em>
          </h2>
          <p>
            Record operating activity as it happens and return to the vehicle’s history when you
            need context.
          </p>
        </div>
        <div className="gp-operation-grid">
          <article>
            <Image
              src={`${media}/fuel.jpg`}
              alt="GaadiPulse fuel and charging records promotional banner"
              width={1400}
              height={466}
            />
            <span>01 / ENERGY</span>
            <h3>Fuel & charging records</h3>
            <p>
              Record dates, quantities, costs and meter values for fills or charging sessions.
              Review entries over time.
            </p>
          </article>
          <article>
            <Image
              src={`${media}/expenses.jpg`}
              alt="GaadiPulse vehicle expense records promotional banner"
              width={1400}
              height={466}
            />
            <span>02 / COSTS</span>
            <h3>Vehicle expenses</h3>
            <p>
              Keep service, repairs, tyres, tolls, parking and other vehicle expenses associated
              with the right vehicle.
            </p>
          </article>
        </div>
      </section>

      <section className="gp-insights" id="insights">
        <div className="gp-insights-copy">
          <span className="gp-eyebrow">INFORMATION YOU CAN REVIEW</span>
          <h2>
            See the records behind <em>the numbers.</em>
          </h2>
          <p>
            GaadiPulse can help you review mileage and average trends from recorded meter and fuel
            data, compare vehicle activity, and notice changes that may need a closer look.
          </p>
          <p className="gp-caveat">
            Mileage is shown only when valid records support the calculation. Any visual example on
            this page is illustrative, not customer data.
          </p>
        </div>
        <div className="gp-banner-frame gp-insight-banner">
          <Image
            src={`${media}/portfolio/GaadiPulse Mileage Performance Insights.png`}
            alt="GaadiPulse mileage and performance insights promotional banner"
            fill
            sizes="(max-width: 700px) 95vw, 700px"
          />
        </div>
      </section>

      <section className="gp-role-section" id="roles">
        <div className="gp-role-header">
          <span className="gp-eyebrow">SHARED VEHICLES, CLEAR RESPONSIBILITIES</span>
          <h2>
            Owner & Pilot.
            <br />
            <em>Access that fits.</em>
          </h2>
          <p>
            Owners decide what each Pilot can add and what vehicle information they can view.
            Permissions are managed per vehicle.
          </p>
        </div>
        <div className="gp-role-cards">
          <article>
            <span className="gp-role-icon">O</span>
            <h3>Owner</h3>
            <p>
              Manage vehicles, assign Pilots, configure access, and review permitted fuel, expense,
              history and insight records.
            </p>
          </article>
          <div className="gp-role-flow">
            <span>Assign vehicle</span>
            <i>→</i>
            <span>Set permissions</span>
            <i>→</i>
            <span>Review records</span>
          </div>
          <article>
            <span className="gp-role-icon gp-role-pilot">P</span>
            <h3>Pilot</h3>
            <p>
              Access assigned vehicles, submit permitted fuel, charging, expense or form records,
              and view history when allowed.
            </p>
          </article>
        </div>
        <div className="gp-banner-frame gp-role-banner">
          <Image
            src={`${media}/portfolio/GaadiPulse Role-Based Vehicle Access.png`}
            alt="GaadiPulse Owner and Pilot role-based vehicle access banner"
            fill
            sizes="(max-width: 700px) 95vw, 1000px"
          />
        </div>
      </section>

      <section className="gp-fleet">
        <div className="gp-fleet-copy">
          <span className="gp-eyebrow">FOR WORK VEHICLES & FLEETS</span>
          <h2>
            Know which vehicle has <em>which record.</em>
          </h2>
          <p>
            Bring commercial vehicles and multiple drivers into a shared record-keeping routine.
            Review fuel, expenses and available performance history vehicle by vehicle.
          </p>
          <a className="gp-text-link" href="#use-cases">
            Explore use cases <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <div className="gp-banner-frame">
          <Image
            src={`${media}/portfolio/GaadiPulse Fleet Management Dashboard.png`}
            alt="GaadiPulse fleet management dashboard promotional banner"
            fill
            sizes="(max-width: 700px) 95vw, 700px"
          />
        </div>
      </section>

      <section className="gp-section gp-use-cases" id="use-cases">
        <div className="gp-section-heading">
          <span className="gp-eyebrow">BUILT FOR THE VEHICLES YOU RELY ON</span>
          <h2>
            One logbook for <em>many journeys.</em>
          </h2>
        </div>
        <div className="gp-use-grid">
          {[
            [
              "Personal owners",
              "Cars, motorcycles and scooters with fuel, expenses and service history.",
            ],
            ["Electric vehicle owners", "Charging expenses, energy entries and recorded history."],
            [
              "Transport & fleet owners",
              "Multiple commercial vehicles, driver access and vehicle-wise operating records.",
            ],
            ["Taxi & cab operators", "Vehicle expenses and records submitted by assigned drivers."],
            ["Agriculture", "Tractors and supported equipment with fuel and usage records."],
            [
              "Construction & machinery",
              "Organize expenses and supported usage records for work machinery.",
            ],
          ].map(([title, desc]) => (
            <article key={title}>
              <span>✳</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
        <p className="gp-note">
          Available vehicle categories and record options depend on the current app release.
        </p>
      </section>

      <section className="gp-how" id="how-it-works">
        <div className="gp-how-inner">
          <div className="gp-section-heading">
            <span className="gp-eyebrow">A SIMPLE ROUTINE</span>
            <h2>
              Set it up once.
              <br />
              <em>Keep it current.</em>
            </h2>
            <p>
              GaadiPulse turns scattered vehicle details into records you can revisit when it
              matters.
            </p>
            <a className="gp-text-link" href={playUrl} target="_blank" rel="noreferrer">
              View current Play access <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <div className="gp-steps">
            {[
              ["01", "Create your account", "Sign in to create your personal vehicle workspace."],
              ["02", "Add a vehicle", "Choose a supported category and enter the vehicle details."],
              ["03", "Record activity", "Add fuel, charging, expense and meter entries as needed."],
              [
                "04",
                "Share and review",
                "Assign a Pilot with specific permissions, then review records and available reports.",
              ],
            ].map(([num, title, desc]) => (
              <article key={num}>
                <span>{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GaadiPulseGallery />

      <section className="gp-trust">
        <div className="gp-trust-mark">
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div>
          <span className="gp-eyebrow">STRAIGHTFORWARD BY DESIGN</span>
          <h2>
            Your records stay <em>yours.</em>
          </h2>
          <p>
            Records are user-entered and access is assigned per vehicle. The current focused release
            needs an internet connection. Automatic GPS tracking, receipt uploads and offline entry
            queues are not available.
          </p>
        </div>
        <Link href="/privacy/gaadipulse">
          Read the privacy policy <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </section>

      <section className="gp-faq gp-section" id="faq">
        <div className="gp-section-heading">
          <span className="gp-eyebrow">GOOD TO KNOW</span>
          <h2>
            Questions, <em>answered.</em>
          </h2>
          <p>Clear answers about what GaadiPulse can do today.</p>
        </div>
        <div className="gp-faq-list">
          {gaadiPulseFaq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="gp-final-cta">
        <div className="gp-cta-icon">
          <Image src={`${media}/icon.png`} alt="" fill sizes="72px" />
        </div>
        <span className="gp-eyebrow">MAKE ROOM FOR THE ROAD AHEAD</span>
        <h2>
          Your vehicles.
          <br />
          Your records. <em>Your control.</em>
        </h2>
        <p>
          Start organizing vehicle details, reviewing expenses and managing shared access with
          GaadiPulse.
        </p>
        <a className="gp-button gp-button-primary" href={playUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGooglePlay} /> View the Google Play listing{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
        <span className="gp-cta-note">Testing availability may be limited.</span>
      </section>

      <footer className="gp-footer">
        <a className="gp-brand" href="#top">
          <Image src={`${media}/logo.png`} alt="GaadiPulse" width={160} height={48} />
        </a>
        <p>Every Vehicle. Every Detail.</p>
        <nav aria-label="Footer navigation">
          <a href="#features">Features</a>
          <a href="#roles">Owner & Pilot</a>
          <a href="#faq">FAQs</a>
          <a href={playUrl} target="_blank" rel="noreferrer">
            Google Play
          </a>
          <a href="mailto:mahendrapuniya92@gmail.com">Contact</a>
          <Link href="/privacy/gaadipulse">Privacy</Link>
          <Link href="/privacy/gaadipulse/account-deletion">Account deletion</Link>
          <Link href="/">Developer portfolio</Link>
        </nav>
        <small>© {new Date().getFullYear()} GaadiPulse · Built by Mahendra Singh Puniya</small>
      </footer>
    </main>
  );
}
