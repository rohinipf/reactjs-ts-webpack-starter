import React from "react"

const ForgotPassword = (props: any) => {
  return (
    <div className="">
      Forgot Password screen <br />
      <button onClick={() => props.history.push("/login")}>
        Back to Login
      </button>
    </div>
  )
}

export default ForgotPassword
