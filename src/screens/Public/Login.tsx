import React from "react"

const Login = (props: any) => {
  return (
    <div>
      Login screen <br />
      <button onClick={() => props.history.push("/forgotpassword")}>
        Forgot password
      </button>
    </div>
  )
}

export default Login
