import { ClipLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", paddingTop: "40vh" }}>
      <ClipLoader color="#1db954" size={50} />
    </div>
  );
}

export default LoadingScreen;
