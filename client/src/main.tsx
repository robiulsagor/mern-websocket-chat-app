// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import { AuthProvider } from './context/AuthProvider.tsx';
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <HelmetProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HelmetProvider>
  // </StrictMode >,
)
