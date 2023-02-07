import Navigations from "./components/Navigations";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigations />}>
          <Route index element={<LandingPage />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
