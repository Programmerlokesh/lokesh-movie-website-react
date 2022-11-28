import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/swiper.min.css";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import Header from "./components/header/Header";
import ConfigRoutes from "./config/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Header />}>
          <Route path="*" element={<ConfigRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
