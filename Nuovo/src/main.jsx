import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
console.log('API URL:', import.meta.env.VITE_API_URL);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
