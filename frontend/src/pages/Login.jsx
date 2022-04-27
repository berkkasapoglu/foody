import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as LoginLogo } from "../assets/login.svg"
import { useState } from "react"
import { login } from "../services/auth"
import { useAuth } from "../context/authContext"

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const { username, password } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await login(username, password)
    if(res.success) {
      setUser({
        isAuthenticated: true,
        token: res.data.token,
        username: res.data.username,
        email: res.data.email
      })
      navigate('/')
    }
  }

  return (
    <div className="lg:w-[60%] mx-auto">
      <h3 className="text-4xl font-bold mb-10">Welcome back</h3>
      <form className=" bg-white p-10 rounded-xl shadow-md" onSubmit={onSubmit}>
        <LoginLogo width={220} height={220} className="mx-auto" />
        <label htmlFor="" className="font-bold">
          Username
        </label>
        <input type="text" name="username" className="input-base mb-5" onChange={onChange} required/>
        <label htmlFor="" className="font-bold">
          Password
        </label>
        <input type="password" name="password" className="input-base" onChange={onChange} required />
        <div className="text-right mb-5">
          <button className="btn text-sm mt-4">Sign in</button>
        </div>
        <Link to="/sign-up">
          Don't you have an account?
          <span className="font-bold hover:border-b hover:border-b-black ml-2">
          Sign up
          </span>
        </Link>
      </form>
    </div>
  )
}
export default Login
