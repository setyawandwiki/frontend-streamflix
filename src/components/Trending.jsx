import { useEffect } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMovies } from "../features/movies/movieSlice";
import { getUser } from "../features/user/userSlice";

const Trending = () => {
  // const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movie);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getUser({
        id: localStorage.getItem("idUser"),
        token: localStorage.getItem("token"),
      })
    );
    dispatch(getMovies());
  }, []);

  const handleCheck = () => {
    if (!localStorage.getItem("token")) {
      alert("you have login first");
      navigate("/");
    }
  };

  return (
    <div>
      <Container>
        <br />
        <h1 className="text-white">TRENDING MOVIES</h1>
        <br />
        <Row>
          {movie.movies.results?.slice(0, 6).map((elem, index) => (
            <Col
              md={4}
              className="movieWrapper"
              id="trending"
              key={index}
              onClick={handleCheck}
            >
              <Link
                to={`/detail/${elem.id}-${elem.title.split(" ").join("-")}`}
              >
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
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Trending;
