import { Link, useParams } from "react-router-dom";
import style from "./Appointment.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Appointment() {
  let id = useParams().appointmentId;
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const updateAppointment = async () => {
    await axios
      .put(`http://localhost:5000/appointment/${id}`, {
        date,
        status,
        description,
        
      })
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/appointment/${id}`)
      .then((res) => {
        setData(res.data.appointment);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={style.user}>
      <div className={style.userTitleContainer}>
        <h1 className={style.userTitle}>Edit Appointment</h1>
      </div>
      <div className={style.userContainer}>
        <div className={style.userUpdate}>
          <span className={style.userUpdateTitle}>Edit</span>
          <form className={style.userUpdateForm}>
            <div className={style.userUpdateLeft}>
              <div className={style.userUpdateItem}>
                <label>Date</label>
                <input
                  type="date"
                  defaultValue={data.date}
                  className={style.userUpdateInput}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className={style.userUpdateItem}>
                <label>Status</label>
                <select onChange={(e)=>{
                  setStatus(e.target.value);
                }}>
                  <option value="">Select status</option>
                  <option value="1">Available</option>
                  <option value="2">Not Available</option>
                </select>
              </div>
              <div className={style.userUpdateItem}>
                <label>Description</label>
                <textarea
                  rows="10"
                  cols="50"
                  defaultValue={data.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </form>
          <div className={style.centerB}>
            <button className={style.userUpdateButton} onClick={updateAppointment}>
              Update
            </button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
