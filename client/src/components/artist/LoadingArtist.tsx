import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingArtist = () => {
  return (
    <div className=" flex flex-row gap-4">
      <div>
        <Skeleton borderRadius={64} width={128} height={128} />
      </div>
      <div className="flex flex-col">
        <Skeleton height={30} width={315} />
        <ol type="1" className="text-white pl-12 mt-4 gap-2">
          <li className="text-[18px]">
            <Skeleton height={20} width={200} />
          </li>
          <li className="text-[18px]">
            <Skeleton height={20} width={200} />
          </li>
          <li className="text-[18px]">
            <Skeleton height={20} width={200} />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default LoadingArtist;
