import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as RegisterLogo } from "../assets/register.svg"
import { register } from "../services/auth"
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"
import MetaDecorator from "../components/MetaDecorator"
import metadata from "../metadata.json"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const { setAuth } = useAuth()
  const { username, email, password } = formData

  const onChange = (e) => {
    const changedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    validate(changedFormData)
    setFormData(changedFormData)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(formErrors).length === 0) {
      const res = await register(username, email, password)
      if (res.success) {
        toast.success(`Welcome ${res.data.username}!`)
        setAuth({
          isAuthenticated: true,
          username: res.data.username,
          email: res.data.email,
          token: res.data.token,
        })
        navigate("/profile")
      } else {
        toast.error(res.message)
      }
    }
  }

  const validate = (formValues) => {
    const errors = {}
    const emailRegex =
      /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    if (formValues.password.length < 6) {
      errors.password = "Password field must have at least 6 characters."
    }
    if (!formValues.email.match(emailRegex)) {
      errors.email = "Email is not valid."
    }
    setFormErrors(errors)
  }

  return (
    <>
      <MetaDecorator
        title="Foodie | Sign Up"
        description="Create your foodie account."
        url={metadata.sitename + "/sign-up"}
      />
      <div className="lg:w-[60%] mx-auto">
        <h1 className="text-4xl font-bold mb-10">Create your account</h1>
        <form
          className=" bg-white p-10 rounded-xl shadow-md"
          onSubmit={onSubmit}
        >
          <RegisterLogo width={220} height={220} className="mx-auto" />
          <div className="mb-5">
            <label className="font-bold">Email</label>
            <input
              type="email"
              className="input-base"
              name="email"
              onChange={onChange}
              value={email}
              required
            />
            <p className="text-red-500 mt-2">{formErrors.email}</p>
          </div>
          <div className="mb-5">
            <label htmlFor="" className="font-bold">
              Username
            </label>
            <input
              type="text"
              className="input-base"
              name="username"
              onChange={onChange}
              value={username}
              required
            />
          </div>
          <div>
            <label className="font-bold">Password</label>
            <input
              type="password"
              className="input-base"
              name="password"
              onChange={onChange}
              value={password}
              required
            />
            <p className="text-red-500 mt-2">{formErrors.password}</p>
          </div>
          <div className="text-right mb-5">
            <button className="btn text-sm mt-4">Sign up</button>
          </div>
          <Link to="/sign-in">
            Already have an account?
            <span className="font-bold hover:border-b hover:border-b-black ml-2">
              Sign in
            </span>
          </Link>
        </form>
      </div>
    </>
  )
}
export default Register
