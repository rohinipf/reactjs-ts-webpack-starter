import React, { Suspense, lazy, useCallback } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"

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
  const { history, loader } = props

  const NavigationContainer = useCallback((navProps: { role: string }) => {
    // Switch navigation container based on user authentication and role
    switch (navProps.role) {
      case "admin":
        return <AdminSwitch />
      default:
        return <PublicSwitch />
    }
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      <ConnectedRouter history={history}>
        <Container>
          {loader && <Loader />}
          <NavigationContainer role={""} />
        </Container>
      </ConnectedRouter>
    </Suspense>
  )
}

export default AppRouter
