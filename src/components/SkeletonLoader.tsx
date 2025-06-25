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
          key={i}
          className="flex gap-4 border-[3px] border-[#444] w-[350px] rounded-[8px] p-4 pb-0 h-[170px]"
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
