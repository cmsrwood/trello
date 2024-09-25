import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function Signup() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
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
    if (user.password === user.cpassword) {
      try {
        const res = await axios.post("http://localhost:8080/register", user)
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message
          })
          navigate('/login')
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password do not match'
      })
    }
  }

  return (
    <div>
      <div className="container vh-100 ">
        <div className="row g-5 p-5 justify-content-center align-items-center align-content-center">
          <div className="col p-5 border-end">
            <h1 className="">Signup</h1>
            <form>
              <div className="form-group my-5">
                <label htmlFor="username">Userame</label>
                <input type="text" className="form-control" id="username" name="username" onChange={handleChange} />
              </div>
              <div className="form-group my-5">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
              </div>
              <div className="form-group my-5">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
              </div>
              <div className="form-group my-5">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} />
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
