/*!

=========================================================
* Argon Dashboard Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-chakra/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import KasirLayout from "layouts/Kasir.js";
import Logout from "views/Pages/Logout";
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";

const isAuthenticated = (userData) => {
  if (userData !== null) {
    return true;
  }

  return false;
};

function PrivateRoute({ component: Component, userData, path, ...rest }) {
  // logic ketika login tidak bisa akses halaman sign in
  if (path === "/auth") {
    return (
      <Route
        {...rest}
        render={(props) => {
          // jika tidak ada data user, return halaman sign-in
          if (!isAuthenticated(userData)) {
            return <Component {...props} />;
          } else { // jika ada, tidak bisa akses halaman sign in
            const previousPath =
              userData.roles[0] === "ROLE_ADMIN"
                ? "/admin/dashboard"
                : "/kasir/dashboard";
            return (
              <Redirect
                to={{
                  pathname: previousPath,
                }}
              />
            );
          }
        }}
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          // logic untuk protected routes admin dan kasir
          if (isAuthenticated(userData)) {
            const newPath = path.substring(1, 6);
            const newRoles = userData.roles[0].toLowerCase().substring(5);
            if (newPath === newRoles) {
              return <Component {...props} />;
            } else {
              const previousPath =
                newPath === "admin" ? "/kasir/dashboard" : "/admin/dashboard"; // admin tidak bisa akses halaman kasir, begitu sebaliknyas
              return (
                <Redirect
                  to={{
                    pathname: previousPath,
                  }}
                />
              );
            }
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/auth/signin",
                }}
              />
            );
          }
        }}
      />
    );
  }
}

const App = () => {
  const user = useSelector((store) => store.user.data);

  return (
    <ChakraProvider theme={theme} position="relative">
      <BrowserRouter>
        <Switch>
          {/* ALL */}
          <PrivateRoute path={`/auth`} component={AuthLayout} userData={user} />
          <Route path={`/logout`} component={Logout} />
          {/* PROTECTED ROUTE */}
          <PrivateRoute
            path={`/admin`}
            component={AdminLayout}
            userData={user}
          />
          <PrivateRoute
            path={`/kasir`}
            component={KasirLayout}
            userData={user}
          />
          <Redirect from={`/`} to="/auth/signin" />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
