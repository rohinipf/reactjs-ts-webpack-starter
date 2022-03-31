import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import Router from "./router"
import { Toast } from "./components/atoms"

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Router />
          <Toast />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
