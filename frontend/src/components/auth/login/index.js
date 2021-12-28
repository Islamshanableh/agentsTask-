import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/action/token";
import "./login.css";


import swal from "sweetalert";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const checkValid = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        if (!res.data.success) {
            swal({
                title: "The user name or password is incorrect",
                icon: "error",
                button: "OK",
              });
              return
        }
        localStorage.setItem("token", res.data.token);
        dispatch(setToken(res.data.token));
        if (res.data.role == 1) {
          history.push("/dashboard");
        } else {
          history.push("/home");
        }
        
      })
      .catch((err) => {
        swal({
          title: "The user name or password is incorrect",
          icon: "error",
          button: "OK",
        });
        throw err;
      });
  };

  return (
    <>
      <div className="login">
        <div className="loginForm">
          <div className="container">
            <div className="row">
              <div className="col-md-6 login-form-2" style={{ width: "100%" }}>
                <h3>Welcome again</h3>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email *"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your Password *"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onClick={checkValid}
                      className="logBtn"
                      style={{
                        width: "60px",
                        borderRadius: "3px",
                        marginLeft: "160px",
                        color: "white",
                        backgroundColor: "#0636bb",
                      }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="registerNow">
                  <p>
              Dont have an account? <a onClick={()=>{
                history.push("/register");
              }}>Register</a>{" "}
            </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
