// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCastMovie,
  getMovieDetail,
  getMovies,
} from "../features/movies/movieSlice";
import { postOrder } from "../features/order/orderSlice";
import { getUser } from "../features/user/userSlice";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const movie = useSelector((state) => state.movie);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    dispatch(getMovies());
    dispatch(getMovieDetail(id.split("-")[0]));
    dispatch(getCastMovie(id.split("-")[0]));
  }, []);

  //   console.log(movie.detail[0]?.genres[0].id);
  //   console.log(id.split("-")[0]);

  const handleNavigate = (param) => {
    dispatch(getMovies());
    dispatch(getMovieDetail(id.split("-")[0]));
    dispatch(getCastMovie(id.split("-")[0]));
    navigate(`/detail/${param.id}-${param.title.split(" ").join("-")}`);
  };

  const handleOrder = (param) => {
    dispatch(
      postOrder({
        owner: localStorage.getItem("idUser"),
        price:
          param.detail[0]?.vote_average > 1 && param.detail[0]?.vote_average < 4
            ? 3500
            : param.detail[0]?.vote_average > 3 &&
              param.detail[0]?.vote_average < 7
            ? 8250
            : param.detail[0]?.vote_average > 6 &&
              param.detail[0]?.vote_average < 8
            ? 16350
            : 21250,
        name: param.detail[0]?.original_title,
      })
    );

    window.open(order.message.data?.redirectUrl?.redirect_url, "_blank");

    dispatch(
      getUser({
        id: localStorage.getItem("idUser"),
        token: localStorage.getItem("token"),
      })
    );

    const arr = user.user.data.movie.filter(
      (elem) => elem.name === param.detail[0]?.original_title
    );

    setData(arr);

    location.reload();
  };

  console.log(data);
  console.log(
    user.user.data.movie.find(
      (elem) => elem.name === movie.detail[0]?.original_title
    )
  );

  return (
    <>
      <div className="row px-0 mx-0">
        <div className="col-md-6 pt-2 d-flex justify-content-center">
          <div className="card" style={{ width: "28rem" }}>
            <img
              className="card-img-top"
              src={`https://image.tmdb.org/t/p/w500/${movie.detail[0]?.poster_path}`}
              alt="Card image cap"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="container w-100 h-100">
            <h1>Title : {movie.detail[0]?.original_title}</h1>
            <span>Cast : </span>
            {movie.cast.cast?.slice(0, 5).map((elem, index) => (
              <span key={index}>{`${elem.name},`}</span>
            ))}
            <span> etc .</span>
            <p>Rate : {movie.detail[0]?.vote_average}</p>
            <p>Duration : {movie.detail[0]?.runtime}</p>
            <p>
              Price :{" "}
              {movie.detail[0]?.vote_average > 1 &&
              movie.detail[0]?.vote_average < 4
                ? "Rp. 3.500"
                : movie.detail[0]?.vote_average > 3 &&
                  movie.detail[0]?.vote_average < 7
                ? "Rp. 8.250"
                : movie.detail[0]?.vote_average > 6 &&
                  movie.detail[0]?.vote_average < 8
                ? "Rp. 16.350"
                : "Rp. 21.250"}
            </p>
            <p>
              Already have it ?{" "}
              {user.user.data.movie.find(
                (elem) => elem.name === movie.detail[0]?.original_title
              )
                ? "Yes"
                : "No"}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleOrder(movie)}
              disabled={
                user.user.data.movie.find(
                  (elem) => elem.name === movie.detail[0]?.original_title
                )
                  ? true
                  : false
              }
            >
              Buy
            </button>
            <h4>Simillar movie : </h4>
            <div className="d-flex flex-wrap justify-content-between">
              {movie.movies.results
                ?.filter(
                  (elem) => elem.genre_ids[0] === movie.detail[0]?.genres[0].id
                )
                .slice(0, 4)
                .map((elem, index) => (
                  <div
                    key={index}
                    onClick={() => handleNavigate(elem)}
                    className="card"
                    style={{ width: "8rem", cursor: "pointer" }}
                  >
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`}
                      alt="Card image cap"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
