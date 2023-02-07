import Navigations from "./components/Navigations";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigations />}>
          <Route index element={<LandingPage />} />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
