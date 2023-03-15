import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingAlbum = () => {
  return (
    <div className=" flex flex-row gap-4">
      <div>
        <Skeleton width={128} height={128} />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton width={241} height={30} />
        <Skeleton width={241} height={20} />
      </div>
    </div>
  );
};

export default LoadingAlbum;
