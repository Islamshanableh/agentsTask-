import style from "./AppointmentList.module.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AppointmentList() {
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  const [data, setData] = useState([]);

  const handleDelete = (_id) => {
    setData(data.filter((item) => item._id !== _id));
    axios
      .delete(`http://localhost:5000/appointment/${_id}`)
      .then((result) => {
        swal({
          title: "Deleted Appointment Success ",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {});
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        setData([...res.data.appointment]);
      });
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (params) => {
        return <div className={style.userListUser}>{params.row.date}</div>;
      },
    },
    {
      field: "status",
      headerName: "status",
      width: 200,
      renderCell: (params) => {
        return (
          <div>{params.row.status == 1 ? "available" : "not available"}</div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/appointment/" + params.row._id}>
              <button className={style.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline
              className={style.userListDelete}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className={style.userList}>
      <div className={style.userTitleContainer}>
        <h1 className={style.userTitle}>Appointments List</h1>
        <Link to="/dashboard/newAppointments">
          <button className={style.userAddButton}>Create</button>
        </Link>
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
