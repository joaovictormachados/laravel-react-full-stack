import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/StateContext';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser,setToken } = useStateContext();
  const [errors, setErrors] = useState(null);


  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current?.value?.trim(),
      password: passwordRef.current?.value,
    }
    console.log(payload)
    axiosClient.post('/login',payload)
      .then(({data}) => { 
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response) {
          if (response.status === 422) {
            setErrors(response.data?.errors || { error: [response.data?.message || 'Validation error'] })
          } else {
            setErrors({ error: [response.data?.message || 'Request failed'] })
          }
        } else {
          setErrors({ error: ['Network error'] })
        }
      })
  }

  return (  
    <div className="login-signup-form animate fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login to your account
          </h1>
          {errors && (
            <div className="alert">
              {Object.entries(errors).map(([key, msgs]) => (
                <div key={key}>{Array.isArray(msgs) ? msgs[0] : String(msgs)}</div>
              ))}
            </div>
          )}
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account </Link>
          </p>
        </form>
      </div>

    </div>
  )
}
