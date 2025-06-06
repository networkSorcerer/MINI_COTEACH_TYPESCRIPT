import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useExchangeToken from "../../hooks/useExchangeToken";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    const code = searchParams.get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (code && codeVerifier) {
      console.log("Received authorization code:", code);
      exchangeToken(
        { code, codeVerifier },
        {
          onSuccess: () => {
            navigate("/"); // 토큰 저장 후 이동
          },
          onError: (err) => {
            console.error("Token exchange failed", err);
          },
        }
      );
    } else {
      console.error("Missing authorization code or code_verifier");
    }
  }, [searchParams, exchangeToken, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;
