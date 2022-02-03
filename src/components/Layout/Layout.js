import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Users from "../../pages/users/users";
import Collection from "../../pages/Collection/Collection";
import IconsPage from "../../pages/icons";


// context
import { useLayoutState } from "../../context/LayoutContext";
import CollectionDetail from "../Collection/CollectionDetail";


function Layout(props) {
  const classes = useStyles();
  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/users" component={Users} />
            <Route exact path="/app/collections" component={Collection} />
            <Route exact path="/app/detail/collections/:id" component={CollectionDetail} />
            <Route path="/app/icons" component={IconsPage} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
