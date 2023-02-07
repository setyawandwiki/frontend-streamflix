import Navigations from "./components/Navigations";
import Poster from "./components/Poster";
import SuperHero from "./components/Superhero";
import Trending from "./components/Trending";

function App() {
  return (
    <>
      <div className="">
        <Navigations />
      </div>
      <Poster />
      <div className="trending">
        <Trending />
      </div>
      <div className="superhero">
        <SuperHero />
      </div>
    </>
  );
}

export default App;
