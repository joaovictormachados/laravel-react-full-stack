import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/StateContext';

export default function SignUp() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser,setToken } = useStateContext();
  const [errors, setErrors] = useState(null);


  const onSubmit = (ev) => {
    ev.preventDefault()


    const payload = {
      name: nameRef.current?.value?.trim(),
      email: emailRef.current?.value?.trim(),
      password: passwordRef.current?.value,
      // Laravel expects `password_confirmation` for the `confirmed` rule
      password_confirmation: passwordConfirmationRef.current?.value,
    }
    console.log(payload)
    axiosClient.post('/signup',payload)
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
            Register your account
          </h1>
          {errors && (
            <div className="alert">
              {Object.entries(errors).map(([key, msgs]) => (
                <div key={key}>{Array.isArray(msgs) ? msgs[0] : String(msgs)}</div>
              ))}
            </div>
          )}
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Confirm Password" />
          <button className="btn btn-block">Register</button>
          <p className="message">
            Already Registered? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>

    </div>
  )
}

