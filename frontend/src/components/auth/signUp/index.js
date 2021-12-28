import React, {  useState } from "react";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./signUp.css";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";

export const Register = () => {
  
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [role, setRole] = useState(0);
  const [message, setMessage] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [item, setItem] = useState(false);

  

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/signUp", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
      });
      if (result.data.success) {
        
        swal({
          title: "The user has been created successfully",
          icon: "success",
          button: "OK",
        });
        setMessage("The user has been created successfully");
        history.push("/login");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      swal({
        title: "Error happened while register, please try again !!",
        icon: "error",
        button: "OK",
      });
      setMessage("Error happened while register, please try again !!");
    }
  };

  return (
    <>
      <div class="container register">
        <div class="row">
          <div class="col-md-3 register-left">
            <img src="https://www.clipartmax.com/png/middle/240-2403197_ico-download-seller-image-seller-icon-png.png" alt="" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away to join us!</p>

            <br />
          </div>
          <div class="col-md-9 register-right">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 class="register-heading">Welcome to agents on cloud</h3>
                <div class="row register-form">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name *"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Your Email *"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="date"
                        class="form-control"
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password *"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <div class="maxl">
                        <PasswordChecklist
                          rules={["minLength", "number", "capital", "match"]}
                          minLength={5}
                          value={password}
                          valueAgain={confirmP}
                          onChange={(isValid) => {
                            setItem(isValid);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last Name *"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        minlength="10"
                        maxlength="10"
                        name="txtEmpPhone"
                        class="form-control"
                        placeholder="Your Phone *"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <div className="mb-3">
                        What would to be?
                        <Form.Check
                          inline
                          label="buyer"
                          name="group1"
                          type={"radio"}
                          value={2}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        <Form.Check
                          inline
                          label="seller"
                          name="group1"
                          type={"radio"}
                          value={1}
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Confirm Password *"
                        onChange={(e) => setConfirmP(e.target.value)}
                      />
                    </div>
                    <button class="btnRegister" onClick={addNewUser}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
