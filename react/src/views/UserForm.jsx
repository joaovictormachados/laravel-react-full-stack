import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/StateContext';

export default function UserForm() {

    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState(null);
    const {setNotification} = useStateContext();

    const navigate = useNavigate();
    const [user,setUser] = useState( {
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })
    if (id) {
        useEffect(() => {
    
        setLoading(true);
        axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setLoading(false);
                setUser(data);
            })
            .catch(() => {
                setLoading(false);
                setErrors({error: ['User not found']});
            });
        }, [id]);
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User updated successfully');
                    navigate('/users');
                })
                .catch(err => { 
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({error: ['Failed to update user']});
                    }
                    setLoading(false);
                });
        } else {
            axiosClient.post('/users', user)
            .then(() => {
                setNotification('User created successfully');
                navigate('/users');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        }
    }
  return (
    <>
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}
        <div className='card anmated fadeInDown'>
            {loading && (
                <div className="text-center">Loading...</div>
            )}
            {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
              { !loading && (
                <form onSubmit={onSubmit}>
                    <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})}  placeholder='Full Name' />
                    <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} placeholder='Email' />
                    <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} placeholder='Password' />
                    <input type="password" value={user.password_confirmation} onChange={e => setUser({...user, password_confirmation: e.target.value})} placeholder='Confirm Password' />
                    <button className='btn'>Save</button>
                </form>
                )}    
            </div>
          
    </>
  )
}
        