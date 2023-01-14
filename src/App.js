import React, { Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import classes from "./components/todo.module.css";
import TodoPage from "./components/todoPage";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const GoalsPage = React.lazy(() => import("./pages/GoalsPage"));

function App() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.test}>
          <div className={classes.heading}>
            <h2>TODO APP</h2>
          </div>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
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
          </Suspense>
          <Navigation />
        </div>
      </div>
    </>
  );
}

export default App;
