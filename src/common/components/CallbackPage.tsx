import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("Received authorization code:", code);
      // 토큰 요청 API 호출 등 처리 후, 예: 홈으로 이동
      navigate("/");
    } else {
      // 에러 처리 등
      console.error("No authorization code found");
    }
  }, [searchParams, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;
