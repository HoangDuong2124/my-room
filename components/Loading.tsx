import Image from "next/image";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
export const LoadingMess = () => {
  return (
    <div className=" w-screen h-screen bg-slate-100 flex items-center justify-center">
      <div className="sharingan">
        <div className="inner-ring">
          <div className="tomoe"></div>
          <div className="tomoe"></div>
          <div className="tomoe"></div>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

