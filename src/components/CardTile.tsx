import type { Tile } from "../types/tile";

type CardTileProps = {
  tile: Tile;
  hasTitle: boolean;
};

function CardTile({
  tile: { description, icon, title },
  hasTitle,
}: CardTileProps) {
  return (
    <>
      <div className="d-flex" style={{ gap: "0.5rem" }}>
        <img src={icon} alt="icon-user" />
        {hasTitle && <p className="card-info-detail">{title}:</p>}
        <span className="card-info-detail">{description}</span>
      </div>
    </>
  );
}

export { CardTile };
