import { Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import classes from "./components/todo.module.css";
import TodoPage from "./components/todoPage";
import DashboardPage from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";

function App() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.test}>
          <div className={classes.heading}>
            <h2>TODO APP</h2>
          </div>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <TodoPage />
            </Route>
            <Route path="/goals">
              <GoalsPage />
            </Route>
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
          </Switch>
          <Navigation />
        </div>
      </div>
    </>
  );
}

export default App;
