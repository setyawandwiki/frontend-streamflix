import React, { useEffect, useState } from "react";
import bannerSignup from "../assets/background/background-2.jpg";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../features/user/userSlice";

// import { useDispatch } from "react-redux";
// import { getDataUser } from "../../stores/action/user";

const Login = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleToggleShowPassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const dispatch = useDispatch();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await axios.post(
        "http://localhost:8000/api/auth/login",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await user.data;
      setToken(data.data.accessToken);
      dispatch(getUser({ id: data.data._id, token: data.data.accessToken }));
      localStorage.setItem("idUser", data.data._id);
      localStorage.setItem("token", data.data.accessToken);
      location.reload();
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <main className="container-fluid mb-5 px-0 mx-0">
        <div className="row signin px-0 mx-0">
          <div className="signin__banner col-lg-8 d-lg-flex justify-content-center align-items-center px-0 mx-0 h-100">
            <img src={bannerSignup} className="img-fluid" alt="image signin" />
          </div>
          <div className="signin__form col-lg-4 px-0 mx-0">
            <div className="signin__box d-flex justify-content-center sign-up__form--direction">
              <h1 className="mt-5 signin__title" style={{ fontWeight: 600 }}>
                Sign In
              </h1>
              <p className="mt-4">Hi, Welcome back to urticket!</p>
              <form className="" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    disabled={isLoading}
                    onChange={handleFormChange}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    disabled={isLoading}
                    className="form-control"
                    id="password"
                    name="password"
                    type={toggleShowPassword ? "password" : "text"}
                    onChange={handleFormChange}
                    placeholder="Password"
                    value={form.password}
                    style={{ borderRight: "none" }}
                  />
                  <span
                    className="signup__input-field--eye input-group-text signin__input-field--eye"
                    onClick={handleToggleShowPassword}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        toggleShowPassword
                          ? "bi bi-eye-slash signin__input--pointer"
                          : "bi bi-eye signin__input--pointer"
                      }
                      id="togglePassword"
                    ></i>
                  </span>
                </div>

                <div className="mb-3 form-check">
                  <h1
                    className="h6"
                    style={{ textAlign: "end", fontWeight: 600 }}
                  ></h1>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn signin__button text-white"
                >
                  <h2
                    className="text-white h6 my-0"
                    style={{ fontWeight: "600" }}
                  >
                    Sign In
                  </h2>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
