import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./widgetLg.module.css";
import { useSelector } from "react-redux";
import DateRangeIcon from '@material-ui/icons/DateRange';

export default function WidgetLg() {
  const [data, setData] = useState();
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/reservation/approve",{
          headers: { Authorization: `Bearer ${state.token}` },
        })
      .then((result) => {
        setData(result.data.reservations);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className={style.widgetLg}>
      <h3 className={style.widgetLgTitle}>
        <DateRangeIcon className={style.sidebarIcon} />
        My Schedule
      </h3>
      <table className={style.widgetLgTable}>
        <tr className={style.widgetLgTr}>
          <th className={style.widgetLgTh}>Customer</th>
          <th className={style.widgetLgTh}>Date</th>
          <th className={style.widgetLgTh}>Status</th>
        </tr>
        {data &&
          data.map((elem, index) => {
            return (
              <tr className={style.widgetLgTr} key={index}>
                <td className={style.widgetLgUser}>
                  
                  <span className={style.widgetLgName}>
                    {elem.buyerId.firstName} {elem.buyerId.lastName}
                  </span>
                </td>
                <td className={style.widgetLgDate}>{elem.appointment.date}</td>
                
                
                <td className={style.widgetLgStatus}>
                   Approved
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
