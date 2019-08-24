import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Preloader from "./Preloader";

const AdminRoute = ({ component: Component, user, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <Preloader />;
      } else if (!auth.isAuthenticated && user !== null && user.type !== "admin") {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps)(AdminRoute);
