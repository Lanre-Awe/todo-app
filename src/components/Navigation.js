import { ClassNames } from "@emotion/react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={classes.navigation}>
      <div>
        <NavLink to="/home">
          <div> Home</div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/goals">
          <div> Goals</div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard" activeClassName={classes.active}>
          <div> Dashboard</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
