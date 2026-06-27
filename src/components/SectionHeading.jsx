export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="section-kicker mb-3">{eyebrow}</p>}
      <h2 className="section-heading text-3xl sm:text-4xl">{title}</h2>
      {description && <p className="section-copy">{description}</p>}
    </div>
  );
}
