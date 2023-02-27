import classes from "../components/todo.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={classes.notFoundContainer}>
      <h1>404</h1>
      <span>Page Not Found </span>
      <Link to="/">
        <button>return home</button>
      </Link>
    </div>
  );
};

export default NotFound;
