import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faCheck, faCircle, faEnvelope, faGaugeHigh, faShieldHalved, faWallet } from "@fortawesome/free-solid-svg-icons";
import { faAndroid, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { gaadiPulseFaq, gaadiPulseFeatures } from "@/data/gaadipulse-landing";
import "./gaadipulse.css";

const playUrl = "https://play.google.com/store/apps/details?id=com.pooniya.gaadipulse";
const contactEmail = "mahendrapuniya92@gmail.com";

export const metadata: Metadata = {
  title: "GaadiPulse — Every Vehicle. Every Detail.",
  description: "Manage your vehicle garage, fuel, expenses, reminders and shared access in one Android app. Explore GaadiPulse features and current install options.",
  alternates: { canonical: "https://pooniya.com/portfolio/gaadipulse" },
  openGraph: { title: "GaadiPulse — Every Vehicle. Every Detail.", description: "A clearer way to keep up with the vehicles you depend on.", url: "https://pooniya.com/portfolio/gaadipulse", images: ["/projects/gaadipulse/hero.webp"] },
};

const nav = [["Features", "#features"], ["How it works", "#how-it-works"], ["Screenshots", "#screenshots"], ["FAQ", "#faq"]] as const;

export default function GaadiPulsePage() {
  return <main className="gp-page">
    <header className="gp-nav"><a className="gp-brand" href="#top" aria-label="GaadiPulse home"><Image src="/projects/gaadipulse/logo.png" alt="GaadiPulse" width={190} height={58} priority /></a><nav aria-label="Main navigation">{nav.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav><a className="gp-nav-cta" href={playUrl} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGooglePlay} /> View on Google Play</a></header>

    <section className="gp-hero" id="top"><div className="gp-hero-grid"><div className="gp-hero-copy"><span className="gp-eyebrow"><span /> VEHICLE RECORDS, MADE CLEAR</span><h1>Every vehicle.<br /><em>Every detail.</em></h1><p className="gp-lead">A calmer way to keep up with the vehicles you depend on. Bring fuel, expenses, reminders and shared access into one place.</p><div className="gp-actions"><a className="gp-button gp-button-primary" href={playUrl} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGooglePlay} /> Explore on Google Play <FontAwesomeIcon icon={faArrowRight} /></a><a className="gp-button gp-button-secondary" href="#features">See what it does <FontAwesomeIcon icon={faArrowDown} /></a></div><p className="gp-availability"><FontAwesomeIcon icon={faCircle} /> Google Play testing · Access may depend on the testing track</p><div className="gp-proof"><span><FontAwesomeIcon icon={faAndroid} /> Android first</span><span><FontAwesomeIcon icon={faShieldHalved} /> Private vehicle access</span><span><FontAwesomeIcon icon={faCheck} /> Free to use</span></div></div><div className="gp-hero-art"><div className="gp-orbit gp-orbit-one"/><div className="gp-orbit gp-orbit-two"/><div className="gp-hero-glow"/><div className="gp-device"><Image src="/projects/gaadipulse/auth.png" alt="GaadiPulse sign-in and vehicle categories" fill priority sizes="(max-width: 800px) 80vw, 420px" /></div><div className="gp-float-card gp-float-top"><span className="gp-float-icon"><FontAwesomeIcon icon={faGaugeHigh} /></span><span><b>One garage</b><small>Vehicles in one view</small></span></div><div className="gp-float-card gp-float-bottom"><span className="gp-float-icon gp-orange"><FontAwesomeIcon icon={faWallet} /></span><span><b>Clear records</b><small>Fuel · expenses · more</small></span></div></div></div><a className="gp-scroll" href="#features">SCROLL TO EXPLORE <span /></a></section>

    <section className="gp-ribbon" aria-label="App capabilities"><div>{["GARAGE", "FUEL & CHARGING", "EXPENSES", "REMINDERS", "OWNER + PILOT", "REPORTS"].map((x,i)=><span key={x}>{x}<i>✳</i></span>)}</div></section>

    <section className="gp-section gp-feature-section" id="features"><div className="gp-section-heading"><span className="gp-eyebrow">THE WHOLE PICTURE</span><h2>Everything your vehicle<br /><em>records need.</em></h2><p>From the first vehicle you add to the next service reminder, GaadiPulse keeps the everyday details easier to find.</p></div><div className="gp-feature-grid">{gaadiPulseFeatures.map((feature,index)=><article className={`gp-feature-card ${index===0||index===3?"gp-feature-wide":""}`} key={feature.number}><div className="gp-feature-info"><span className="gp-feature-number">{feature.number} / {feature.tag}</span><h3>{feature.title}</h3><p>{feature.description}</p></div><div className="gp-feature-image"><Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 700px) 90vw, 540px" /></div></article>)}</div></section>

    <section className="gp-how" id="how-it-works"><div className="gp-how-inner"><div className="gp-section-heading"><span className="gp-eyebrow">A SIMPLE ROUTINE</span><h2>Set it up once.<br /><em>Keep it current.</em></h2><p>GaadiPulse turns scattered vehicle details into records you can revisit when it matters.</p><a className="gp-text-link" href={playUrl} target="_blank" rel="noreferrer">Check current Play access <FontAwesomeIcon icon={faArrowRight} /></a></div><div className="gp-steps"><article><span>01</span><div><h3>Add your vehicle</h3><p>Choose a vehicle and set its basics, including the meter type that fits it.</p></div></article><article><span>02</span><div><h3>Log the real-world details</h3><p>Add fuel, charging, expenses, meter readings, document details and reminders as they happen.</p></div></article><article><span>03</span><div><h3>Review or share</h3><p>Look back at records and reports. Give a trusted Pilot access to the specific vehicle they help manage.</p></div></article></div></div></section>

    <section className="gp-showcase" id="screenshots"><div className="gp-showcase-head"><div><span className="gp-eyebrow">A LOOK INSIDE</span><h2>Built around the <em>daily details.</em></h2></div><p>Real product visuals from GaadiPulse. Features depend on the current app release and account access.</p></div><div className="gp-gallery">{gaadiPulseFeatures.slice(0,5).map((feature,i)=><figure className={`gp-shot gp-shot-${i+1}`} key={feature.number}><Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 700px) 75vw, 420px" /><figcaption>{feature.tag}</figcaption></figure>)}</div></section>

    <section className="gp-trust"><div className="gp-trust-mark"><FontAwesomeIcon icon={faShieldHalved} /></div><div><span className="gp-eyebrow">STRAIGHTFORWARD BY DESIGN</span><h2>Your records stay <em>yours.</em></h2><p>Sign in to use vehicle records. Access is assigned per vehicle, and the current focused release needs an internet connection. GaadiPulse does not automatically track your location, and document or receipt uploads are not available yet.</p></div><Link href="/privacy/gaadipulse">Read the privacy policy <FontAwesomeIcon icon={faArrowRight} /></Link></section>

    <section className="gp-faq gp-section" id="faq"><div className="gp-section-heading"><span className="gp-eyebrow">GOOD TO KNOW</span><h2>Questions, <em>answered.</em></h2><p>Clear answers about availability and what the app can do today.</p></div><div className="gp-faq-list">{gaadiPulseFaq.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="gp-final-cta"><div className="gp-cta-icon"><Image src="/projects/gaadipulse/icon.png" alt="" fill sizes="72px" /></div><span className="gp-eyebrow">MAKE ROOM FOR THE ROAD AHEAD</span><h2>A little more clarity<br />for every <em>journey.</em></h2><p>See whether the current Google Play testing track is open to you.</p><a className="gp-button gp-button-primary" href={playUrl} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGooglePlay} /> View the Google Play listing <FontAwesomeIcon icon={faArrowRight} /></a><span className="gp-cta-note">Testing availability may be limited. No public Drive download is available.</span></section>

    <footer className="gp-footer"><a className="gp-brand" href="#top"><Image src="/projects/gaadipulse/logo.png" alt="GaadiPulse" width={160} height={48} /></a><p>Every Vehicle. Every Detail.</p><div><a href={`mailto:${contactEmail}`}><FontAwesomeIcon icon={faEnvelope} /> Contact</a><Link href="/privacy/gaadipulse">Privacy</Link><Link href="/privacy/gaadipulse/account-deletion">Account deletion</Link></div><small>© {new Date().getFullYear()} GaadiPulse · Built by Mahendra Singh Puniya</small></footer>
  </main>;
}
