import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function Login() {

  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8080/login", user)
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message
        })
        navigate('/home')
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid username or password'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        })
      }
    }
  }

  return (
    <div>
      <div className="container vh-100 ">
        <div className="row g-5 p-5 justify-content-center align-items-center align-content-center">
          <div className="col p-5 border-end">
            <h1 className="">Login</h1>
            <form>
              <div className="form-group my-5">
                <label htmlFor="username">Userame</label>
                <input type="text" className="form-control" id="username" name="username" onChange={handleChange} />
              </div>
              <div className="form-group my-5">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
              </div>
              <button onClick={handleSubmit} type="submit" className="btn btn-outline-light">
                Submit
              </button>
            </form>
          </div>
          <div className="col text-center">
            <h1 className='display-1'>Trello 2</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
