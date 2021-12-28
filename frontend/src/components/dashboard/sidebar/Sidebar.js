import style from "./sidebar.module.css";
import {
  LineStyle,
  Storefront,
} from "@material-ui/icons";
import DateRangeIcon from '@material-ui/icons/DateRange';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebarWrapper}>
        <div className={style.sidebarMenu}>
          <h3 className={style.sidebarTitle}>Dashboard</h3>
          <ul className={style.sidebarList}>
            <Link to="/dashboard" className={style.link}>
              <li className="sidebarListItem active">
                <LineStyle className={style.sidebarIcon} />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className={style.sidebarMenu}>
          <h3 className={style.sidebarTitle}>Quick Menu</h3>
          <ul className={style.sidebarList}>
            <Link to="/dashboard/appointments" className={style.link}>
              <li className={style.sidebarListItem}>
                <DateRangeIcon className={style.sidebarIcon} />
                MyAppointments
              </li>
            </Link>
            <Link to="/dashboard/requests" className="link">
              <li className={style.sidebarListItem}>
                <NotificationsActiveIcon className={style.sidebarIcon} />
                Requests
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
