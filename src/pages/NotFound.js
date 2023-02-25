import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <span>Page Not Found </span>
      <button>
        <Link to="/">return home</Link>
      </button>
    </div>
  );
};

export default NotFound;
