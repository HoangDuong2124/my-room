import { useSession } from "next-auth/react";

 const Loading = () => {
    // const { data } = useSession();
    // if (data) return children;
    return (
      <div className=" w-screen h-screen bg-slate-100 flex items-center justify-center">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
export default Loading  