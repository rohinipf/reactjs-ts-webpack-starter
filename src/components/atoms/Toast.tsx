import React from "react"
import { ToastContainer, toast, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Toast = () => {
  return (
    <ToastContainer
      transition={Slide}
      autoClose={4500}
      position={toast.POSITION.TOP_CENTER}
      theme="colored"
    />
  )
}

export default Toast
