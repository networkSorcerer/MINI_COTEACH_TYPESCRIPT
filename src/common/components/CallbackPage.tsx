import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useExchangeToken from '../../hooks/useExchangeToken';

const CallbackPage = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken(
        { code, codeVerifier },
        {
          onSuccess: () => {
            navigate('/'); // 토큰 교환 후 홈으로 이동
          },
        }
      );
    }
  }, [code, codeVerifier, exchangeToken, navigate]);

  return <div>토큰 처리 중...</div>;
};

export default CallbackPage;
