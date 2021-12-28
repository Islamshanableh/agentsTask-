import style from "../appointment/AppointmentList.module.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function AppointmentRequest() {
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  const [data, setData] = useState([]);

  const handleDelete = (_id) => {
    setData(data.filter((item) => item._id !== _id));
    axios
      .delete(`http://localhost:5000/reservation/${_id}`)
      .then((result) => {
        swal({
          title: "Deleted Appointment Success ",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {});
  };
  const handleUpdate = (_id) => {
    setData(data.filter((item) => item._id !== _id));
    let status = 1 
    axios
      .put(`http://localhost:5000/reservation/${_id}`,{status})
      .then((result) => {
        swal({
          title: "Reject Appointment Success ",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/reservation", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        setData([...res.data.reservations]);
      });
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "firstName",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.userListUser}>
            {params.row.buyerId.firstName} {params.row.buyerId.lastName}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (params) => {
        return <div className={style.userListUser}>{params.row.appointment.date}</div>;
      },
    },
    {
      field: "status",
      headerName: "status",
      width: 200,
      renderCell: (params) => {
        return (
          <div>{params.row.status == 0 ? "Not Approved" : "Approved"}</div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <div>
              <button className={style.userListEdit}
              onClick={() => handleUpdate(params.row._id)}>Approved</button>
            </div>
            <div>
            <button
              className={style.userListDelet}
              onClick={() => handleDelete(params.row._id)}>Reject
              </button>
              </div>
          </>
        );
      },
    },
  ];

  return (
    <div className={style.userList}>
      <div className={style.userTitleContainer}>
        <h1 className={style.userTitle}>Requests List</h1>
       
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
