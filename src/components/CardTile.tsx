import type { Tile } from "../types/tile";

type CardTileProps = {
  tile: Tile;
  hasTitle: boolean;
  isForMainCard: boolean;
};

function CardTile({
  tile: { description, icon, title, isDescriptionEmail, isDescriptionLink },
  hasTitle,
  isForMainCard,
}: CardTileProps) {
  function setUrl(url: string): string {
    return url.startsWith("http") ? url : `https://www.${url}`;
  }

  return (
    <>
      <div className="flex items-center gap-2 text-[12px]">
        <img className="w-6" src={icon} alt={icon} />
        {hasTitle && <p>{title}:</p>}
        {!isDescriptionEmail && !isDescriptionLink && (
          <span className={isForMainCard ? "truncate w-20" : ""}>
            {description}
          </span>
        )}
        {(isDescriptionEmail || isDescriptionLink) && (
          <>
            {description === "Not provided" ? (
              <span>{description}</span>
            ) : (
              <a
                className="cursor-pointer"
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
