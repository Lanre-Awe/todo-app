import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard";
import classes from "./detail.module.css";

const Detail = () => {
  const [desc, setDesc] = useState();
  const [display, setDisplay] = useState(false);
  const description = useSelector((state) => state.description.description);
  useEffect(() => {
    if (description === null) {
      setDesc("Hover over Task to view description");
    } else if (description === "") {
      setDesc("No Description");
    } else {
      setDesc(description);
    }
  }, [description]);
  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <span>Description</span>
        <div
          className={!description ? classes.displayHolder : classes.displayDesc}
        >
          {desc}
        </div>
      </div>
      <div className={classes.dashboard}>
        <Dashboard />
      </div>
    </div>
  );
};

export default Detail;
