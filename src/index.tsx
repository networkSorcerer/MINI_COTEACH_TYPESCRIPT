import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Redux 관련 import
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  // 번들은 srs 밑에 있는 index 파일을 사용하기 때문에 content로 수정.
  // document.getElementById('root') as HTMLElement
  document.getElementById('content') as HTMLElement
);

// react query의 옵션 세팅 값
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 재시도 한 번 더
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Redux Provider 추가 */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// 성능 측정 관련 코드 유지
reportWebVitals();
