// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import { AuthProvider } from './context/AuthProvider.tsx';
// import { HeadProvider } from "react-head";


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // <HeadProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </HeadProvider>
  // </StrictMode >,
)
