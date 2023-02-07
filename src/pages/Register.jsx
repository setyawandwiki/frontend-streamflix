import React, { useEffect, useState } from "react";
import bannerSignup from "../assets/background/background-2.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [toggleShowPassword, setToggleShowPassword] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleToggleShowPassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        "http://localhost:8000/api/auth/register",
        form
      );
      await user.data;
      setForm({ name: "", email: "", password: "" });
      alert("success create user");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <main className="container-fluid">
        <div className="row signup">
          <div className="signup__banner col-lg-8 d-lg-flex justify-content-center align-items-center  px-0 mx-0">
            <img
              src={bannerSignup}
              className="img-fluid w-100 h-100  px-0 mx-0"
              alt="image signup"
            />
          </div>
          <div className="signup__form col-lg-4 mt-4">
            <div className="signup__box d-flex justify-content-start sign-up__form--direction">
              <h1 className="mt-5 signup__title">Sign Up</h1>
              <p className="mt-4">
                Already have an account ? <Link to="/login">Log in</Link>
              </p>
              <form className="" onSubmit={handleSignUp}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mt-5"
                    id="fullName"
                    aria-describedby="fullname"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type={toggleShowPassword ? "password" : "text"}
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    style={{ borderRight: "none" }}
                  />
                  <span
                    onClick={handleToggleShowPassword}
                    className="input-group-text signup__input-field--eye"
                  >
                    <i
                      className={
                        toggleShowPassword
                          ? "bi bi-eye-slash signup__input--pointer"
                          : "bi bi-eye signup__input--pointer"
                      }
                      id="togglePassword"
                    ></i>
                  </span>
                </div>
                <button type="submit" className="btn signup__button text-white">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
