import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type SkeletonLoaderProps = {
  amount?: number;
};

function SkeletonLoader({ amount = 15 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: amount }, (_, i) => (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            border: "3px solid #444",
            width: "350px",
            borderRadius: "8px",
            padding: "1rem",
            paddingBottom: "0",
            height: "140px",
          }}
          key={i}
        >
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton circle width={128} height={128} />
            <div style={{ flex: 1 }}>
              <Skeleton height={30} width="100%" style={{ marginBottom: 10 }} />
              <Skeleton height={30} width="100%" style={{ marginBottom: 10 }} />
              <Skeleton height={30} width="70%" />
            </div>
          </SkeletonTheme>
        </div>
      ))}
    </>
  );
}

export { SkeletonLoader };
