import ReactLoading from "react-loading";

const LoadingSpinner = () => {
  return (
    <div className="fixed bottom-10 right-10">
       <ReactLoading type={"spinningBubbles"} color="#4C7FD0" />
    </div>
  );
};

export default LoadingSpinner;
