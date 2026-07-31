export function ProjectVisual({
  title,
  tone,
  label = "Project image placeholder",
  showLabel = true,
}: {
  title: string;
  tone: string;
  label?: string;
  showLabel?: boolean;
}) {
  return (
    <div className={`project-visual project-visual--${tone}`} role="img" aria-label={`${label} for ${title}`}>
      <span className="project-visual__grid" aria-hidden="true" />
      <span className="project-visual__beam project-visual__beam--one" aria-hidden="true" />
      <span className="project-visual__beam project-visual__beam--two" aria-hidden="true" />
      {showLabel && (
        <span className="project-visual__label">
          <small>Image reserved</small>
          {title}
        </span>
      )}
    </div>
  );
}
