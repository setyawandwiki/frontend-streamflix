import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
// import duneImage from "../assets/trending/dune.jpg";
// import everythingImage from "../assets/trending/everything.jpg";
// import infiniteImage from "../assets/trending/infinite.jpg";
// import jokerImage from "../assets/trending/joker.jpg";
// import lightyearImage from "../assets/trending/lightyear.jpg";
// import morbiusImage from "../assets/trending/morbius.jpg";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}`
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Container>
        <br />
        <h1 className="text-white">TRENDING MOVIES</h1>
        <br />
        <Row>
          {movies.slice(0, 6).map((elem, index) => (
            <Col md={4} className="movieWrapper" id="trending" key={index}>
              <Card className="movieImage">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`}
                  alt={elem.title}
                  className="images"
                />
                <div className="bg-dark">
                  <div className="p-2 m-1 text-white">
                    <Card.Title className="text-center">
                      {elem.title}
                    </Card.Title>
                    <Card.Text className="text-left">
                      {elem.overview.slice(0, 80)}
                    </Card.Text>
                    <Card.Text className="text-left">
                      Last updated 3 mins ago
                    </Card.Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Trending;
