import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import Detail from "./components/detailCard/Detail";
import FrontPage from "./components/Frontpage";
import PhoneMenu from "./components/phoneMenu/PhoneMenu";
import SideMenu from "./components/sideMenu/SideMenu";
import classes from "./components/todo.module.css";
import TodoPage from "./components/todoPage";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import NotFound from "./pages/NotFound";
import { sideAction } from "./store.js/sideSlice";

function App() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.side.showSide);
  const showMenu = () => {
    dispatch(sideAction.control());
  };

  return (
    <>
      {show && <PhoneMenu />}
      <div className={classes.main}>
        <SideMenu />
        <div className={classes.test}>
          <div className={classes.titleContainer}>
            <div className={classes.burgerContainer} onClick={showMenu}>
              <div className={classes.burgerTop}></div>
              <div className={classes.burgerMid}></div>
              <div className={classes.burgerBottom}></div>
            </div>
            <div className={classes.title}>YOUR TODO</div>
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
                <FrontPage />
              </Route>
              <Route path="/:todo">
                <TodoPage />
              </Route>
            </Switch>
          </Suspense>
        </div>
        <Detail />
      </div>
    </>
  );
}

export default App;
