import axios from "axios"

// redux
import { store } from "./../redux/store"
import { loading } from "../redux/actions"

const APIHost = () => {
  let host = process.env.REACT_APP_BASEURL
  return host
}

// create axios instance
const api = axios.create({
  baseURL: APIHost(),
})

api.interceptors.request.use(
  function (config: any) {
    if (config.headers.disableLoading) {
      store.dispatch(loading(false))
    } else {
      store.dispatch(loading(true))
    }

    const token = store.getState().Auth.access_token || null
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // console.log(`Request, ${config.url}`, config)
    return config
  },
  function (error) {
    return Promise.reject(error.response)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response: any) => {
    // console.log('Response', response)

    if (!response.config.headers.disableLoading) {
      store.dispatch(loading(false))
    }

    return response
  },
  (error) => {
    // console.log('Error', error.response)

    if (!error.response.config.headers.disableLoading) {
      store.dispatch(loading(false))
    }

    // if (error.config.url !== "auth/login") {
    //   if (error.response.status === 401) {
    //     store.dispatch(logoutSuccess())
    //     window.location = "/"
    //   }
    // }

    return Promise.reject(error.response)
  }
)

export default api
