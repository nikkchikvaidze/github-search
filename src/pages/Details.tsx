import { useParams } from "react-router";

function DetailsPage() {
  const params = useParams();
  return <div>{params.id}</div>;
}

export { DetailsPage };
