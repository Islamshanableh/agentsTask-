import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import style from "./dashboard.module.css";
import Home from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppointmentList from "./appointment/appointmentList";
import Appointment from "./appointment/appointment";
import NewAppointment from "./appointment/NewAppointment";

import AppointmentRequest from "./requests/RequestsList";


export default function Dashboard() {
  return (
    <Router>
      <Topbar />
      <div className={style.container}>
        <Sidebar />
        <Switch>
          <Route exact path="/dashboard">
            <Home />
          </Route>
          <Route path="/dashboard/appointments">
            <AppointmentList/>
          </Route>
          <Route path="/dashboard/appointment/:appointmentId">
            <Appointment />
          </Route>
          <Route path="/dashboard/newAppointments">
            <NewAppointment />
          </Route>
          
          <Route path="/dashboard/requests">
            <AppointmentRequest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



