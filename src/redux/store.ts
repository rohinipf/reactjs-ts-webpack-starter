import { createStore, combineReducers, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

import { createBrowserHistory } from "history"
import { createReduxHistoryContext } from "redux-first-history"

import reducers from "./reducers"

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() })

let middlewares = [thunk, routerMiddleware]
// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   // dev code
//   middlewares = [thunk, routerMiddleware]
// }

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [],
}

const AppPersistConfig = {
  key: "App",
  storage,
  whitelist: [],
}

const AuthPersistConfig = {
  key: "Auth",
  storage,
  whitelist: ["role", "access_token"],
}

const rootReducer = combineReducers({
  router: routerReducer,
  App: persistReducer(AppPersistConfig, reducers.App),
  Auth: persistReducer(AuthPersistConfig, reducers.Auth),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
)

const persistor = persistStore(store)
const history = createReduxHistory(store)

export { store, persistor, history }
