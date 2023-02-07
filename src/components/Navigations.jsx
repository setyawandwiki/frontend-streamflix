import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getMovies } from "../features/movies/movieSlice";
import { getUser } from "../features/user/userSlice";

const Navigations = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUser({
        id: localStorage.getItem("idUser"),
        token: localStorage.getItem("token"),
      })
    );
    dispatch(getMovies());
  }, []);
  return (
    <>
      {!token ? (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <div className="container">
            <a className="navbar-brand text-white" href="#">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                StreamFlix
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav d-flex justify-content-end w-100">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white active"
                      aria-current="page"
                      href="#"
                    >
                      Login
                    </a>
                  </li>
                </Link>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                      Register
                    </a>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <div className="container">
            <a className="navbar-brand text-white" href="#">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                StreamFlix
              </Link>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav d-flex justify-content-end w-100 pt-2">
                <li className="nav-item px-2">
                  <p className="text-white">Hello ! {user.user.data?.name}</p>
                </li>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <li className="nav-item px-2">
                    <p className="text-success">
                      Saldo : Rp. {user.user.data?.money}
                    </p>
                  </li>
                </Link>
                <li className="nav-item px-2">
                  <a
                    href=""
                    className="text-white"
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
};

export default Navigations;
