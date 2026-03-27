import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'antd/dist/reset.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


// import './index.css'
import App from './App.jsx'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'

const optionsPaypal = {
  "client-id": `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
  currency: "USD",
  intent: "capture",
}
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      <PayPalScriptProvider options={optionsPaypal}>
        <App />
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  </Provider >
)
