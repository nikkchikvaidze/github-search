import type { Tile } from "../types/tile";

type CardTileProps = {
  tile: Tile;
  hasTitle: boolean;
};

function CardTile({
  tile: { description, icon, title, isDescriptionEmail, isDescriptionLink },
  hasTitle,
}: CardTileProps) {
  function setUrl(url: string): string {
    return url.startsWith("http") ? url : `https://www.${url}`;
  }

  return (
    <>
      <div className="d-flex" style={{ gap: "0.5rem", alignItems: "center" }}>
        <img src={icon} alt="icon-user" />
        {hasTitle && <p className="card-info-detail">{title}:</p>}
        {!isDescriptionEmail && !isDescriptionLink && (
          <span className="card-info-detail">{description}</span>
        )}
        {(isDescriptionEmail || isDescriptionLink) && (
          <>
            {description === "Not provided" ? (
              <span className="card-info-detail">{description}</span>
            ) : (
              <a
                style={{ cursor: "pointer" }}
                href={
                  isDescriptionEmail
                    ? `mailto:${description}`
                    : setUrl(description as string)
                }
                target={isDescriptionLink ? "_blank" : undefined}
              >
                {description}
              </a>
            )}
          </>
        )}
      </div>
    </>
  );
}

export { CardTile };
