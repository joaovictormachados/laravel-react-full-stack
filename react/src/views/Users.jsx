import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/StateContext';
export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext();  

  useEffect (() => {
    getUsers();
  },[])

  const getUsers = () => {
    setLoading(true) 
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        console.log(`em getusers + ${JSON.stringify(data)}`);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false)
      });
  }

  const onDelete = (u) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete('/users/' + u.id)
      .then(() => {
        setNotification("User deleted successfully");
        getUsers();
      });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to="/users/new" className='btn-add'>Add New</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>created_at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
          {!loading &&
            <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link className={'btn-edit'} to={'/users/' + user.id}>Edit</Link>
                  &nbsp;
                  <button className='btn-delete' onClick={() => onDelete(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}
