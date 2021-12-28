import style from "./newAppointment.module.css";
import axios from "axios";
import React, {useState } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";


export default function NewAppointment () {
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [message, setMessage] = useState("");
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  const createNewAppointment = async () => {
    await axios
      .post(`http://localhost:5000/appointment`, {
       date,
        description,
        
      },{ headers: { Authorization: `Bearer ${state.token}` } })
      .then((res) => {
        setMessage(res.data.message);
        swal({
          title: "Success new Appointment Added",
          icon: "success",
          button: "OK",
        });
      });
  };
  return (
    <div className={style.newUser}>
    <h1 className={style.newUserTitle}>New Appointment</h1>
      <form className={style.newUserForm}>
        <div className={style.newUserItem}>
          <label>Date</label>
          <input
            type="date"
            placeholder="John"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>

        <div className={style.newUserItem}>
          <label>Description</label>
          <textarea
            rows="10"
            cols="50"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </form>
      <button className={style.newUserButton} onClick={createNewAppointment}>
        Create
      </button>
      <p>{message}</p>
    </div>
  );
}
