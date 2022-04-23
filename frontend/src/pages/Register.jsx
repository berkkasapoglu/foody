import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as RegisterLogo } from "../assets/register.svg"
import { register } from "../services/auth"


function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const { username, email, password } = formData

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    register(username, email, password)
    navigate('/')
  }
  return (
    <div className="lg:w-[60%] mx-auto">
      <h3 className="text-4xl font-bold mb-10">Welcome back</h3>
      <form className=" bg-white p-10 rounded-xl shadow-md" onSubmit={onSubmit}>
        <RegisterLogo width={220} height={220} className="mx-auto" />
        <label className="font-bold">Email</label>
        <input
          type="email"
          className="input-base mb-5"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
        <label htmlFor="" className="font-bold">
          Username
        </label>
        <input
          type="text"
          className="input-base mb-5"
          name="username"
          onChange={onChange}
          value={username}
          required
        />
        <label className="font-bold">Pasword</label>
        <input
          type="password"
          className="input-base"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
        <div className="text-right mb-5">
          <button className="btn text-sm mt-4">Sign up</button>
        </div>
        <Link to="/sign-in" className="">
          Already have an account?
          <span className="font-bold hover:border-b hover:border-b-black ml-2">
            Sign in
          </span>
        </Link>
      </form>
    </div>
  )
}
export default Register
