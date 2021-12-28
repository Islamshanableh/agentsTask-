import React from "react";
import style from "./topbar.module.css";


export default function Topbar() {
  return (
    <div className={style.topbar}>
      <div className={style.topbarWrapper}>
        <div className={style.topLeft}>
          <span className={style.logo}>Dashboard</span>
        </div>
      </div>
    </div>
  );
}
