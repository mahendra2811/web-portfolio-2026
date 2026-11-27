import Image from "next/image";

const screenshots = [
  { file: "Screenshot_1795781638.png", title: "Home dashboard", detail: "Quick view of your selected vehicle and everyday records." },
  { file: "Screenshot_1795783410.png", title: "Charging records", detail: "Review charging costs, energy entries, history and filters." },
  { file: "Screenshot_1795781763.png", title: "Switch vehicles", detail: "Move between vehicles in your garage." },
  { file: "Screenshot_1795783129.png", title: "Expense history", detail: "Browse vehicle expenses and narrow the record list." },
  { file: "Screenshot_1795781661.png", title: "Choose a vehicle type", detail: "Select a subtype to organize a vehicle in your garage." },
  { file: "Screenshot_1795781654.png", title: "Choose a vehicle category", detail: "Start vehicle setup with a category that fits." },
  { file: "Screenshot_1795783182.png", title: "Charging details", detail: "See the charging records associated with a vehicle." },
  { file: "Screenshot_1795781794.png", title: "Expense details", detail: "Keep service and other expense entries together." },
] as const;

export function GaadiPulseGallery() {
  return (
    <section className="gp-showcase" id="screenshots">
      <div className="gp-showcase-head">
        <div>
          <span className="gp-eyebrow">A LOOK INSIDE</span>
          <h2>
            Built around the <em>daily details.</em>
          </h2>
        </div>
        <p>Real screens from the GaadiPulse mobile app. Scroll through the garage, records and setup flow.</p>
      </div>
      <div className="gp-screenshot-grid">
        {screenshots.map((screenshot, index) => (
          <figure className="gp-mobile-shot" key={screenshot.file}>
            <div className="gp-mobile-shot-image">
              <Image
                src={`/projects/gaadipulse/screenshot/${screenshot.file}`}
                alt={`GaadiPulse ${screenshot.title.toLowerCase()} mobile app screen`}
                width={1080}
                height={2424}
                sizes="(max-width: 620px) 86vw, (max-width: 980px) 42vw, 23vw"
                priority={index < 2}
              />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{screenshot.title}</h3>
                <p>{screenshot.detail}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
