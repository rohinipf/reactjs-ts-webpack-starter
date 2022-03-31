import React, { Suspense, lazy, useCallback } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { connect } from "react-redux"

// UI
import { Container, Loader } from "./components/atoms"

// Public Screens
const Login = lazy(() => import("./screens/Public/Login"))
const ForgotPassword = lazy(() => import("./screens/Public/ForgotPassword"))

// Admin Screens
const Dashboard = lazy(() => import("./screens/Admin/Dashboard"))

const AdminSwitch = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />

      <Route
        exact
        path="/dashboard"
        render={(props: any) => <Dashboard {...props} />}
      />
    </Switch>
  )
}

const PublicSwitch = () => {
  return (
    <Switch>
      <Redirect from="/" to="/login" exact />

      <Route
        exact
        path="/login"
        render={(props: any) => <Login {...props} />}
      />
      <Route
        exact
        path="/forgotpassword"
        render={(props: any) => <ForgotPassword {...props} />}
      />
    </Switch>
  )
}

const AppRouter = (props: any) => {
  const { loader, history, role, access_token } = props

  const NavigationContainer = useCallback(
    (navProps: { role: string }) => {
      // Switch navigation container based on user authentication and role
      switch (navProps.role) {
        case "admin":
          return <AdminSwitch />
        default:
          return <PublicSwitch />
      }
    },
    [role]
  )

  // start: check if user accessing protected routes when login fail
  const exceptionPaths = ["/", "/forgotpassword", "/resetpassword"]
  let location = window.location

  if (access_token === null && exceptionPaths.indexOf(location.pathname) < 0) {
    history.push("/")
  } else {
    if (
      access_token === null &&
      exceptionPaths.indexOf(location.pathname) < 0
    ) {
      history.push("/")
    }
  }
  // end

  return (
    <Suspense fallback={<Loader />}>
      <ConnectedRouter history={history}>
        <Container>
          {loader && <Loader />}
          <NavigationContainer role={role} />
        </Container>
      </ConnectedRouter>
    </Suspense>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loader: state.App.loader,
    access_token: state.Auth.access_token,
    role: state.Auth.role,
  }
}

export default connect(mapStateToProps, null)(AppRouter)
