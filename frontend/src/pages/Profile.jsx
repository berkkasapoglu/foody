import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"
import { Link } from "react-router-dom"

import { GiChefToque } from "react-icons/gi"
import { AiOutlineRight } from "react-icons/ai"
import { IoManOutline, IoWomanOutline } from "react-icons/io5"

import GenderSelect from "../components/GenderSelect"
import Spinner from "../components/layout/Spinner"
import { toast } from "react-toastify"

function Profile() {
  const { auth } = useAuth()
  const { data: user, setData: setUser } = useUser()
  const [personalData, setPersonalData] = useState({})
  const [isChangeMode, setIsChangeMode] = useState(false)
  useEffect(() => {
    if (user && user.personalInformation) {
      setPersonalData(user.personalInformation)
    }
  }, [user])

  const onChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async () => {
    const updates = {}
    let changed = false
    for (let key of Object.keys(personalData)) {
      if (
        !user.personalInformation ||
        user.personalInformation[key] !== personalData[key]
      ) {
        console.log(user.personalInformation[key], personalData[key])
        changed = true
        updates[key] = personalData[key]
      }
    }
    if (changed) {
      console.log(updates)
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + auth.token,
        },
        body: JSON.stringify(updates),
      })

      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        setUser({
          ...user,
          personalInformation: {
            ...updates,
          },
        })
      } else {
        toast.error(result.message)
      }
    }
  }

  if (!user) return <Spinner />
  return (
    <>
      <h3 className="font-bold text-3xl">My Profile</h3>
      <main className="w-full lg:w-[50%]">
        <div className="mt-4 p-5 rounded-lg bg-white">
          <h4>
            <strong>Username: </strong>
            <span>{user.username}</span>
          </h4>
          <h4>
            <strong>Email: </strong> <span>{user.email}</span>
          </h4>
        </div>
        <div className="mt-4 p-5 rounded-lg bg-white">
          <div className="flex justify-between mb-3">
            <h3 className="font-bold">Personal Information</h3>
            <button
              className="font-bold text-primary cursor-pointer"
              onClick={() => {
                isChangeMode && onSubmit()
                setIsChangeMode(!isChangeMode)
              }}
            >
              {isChangeMode ? "Save Changes" : "Change"}
            </button>
          </div>
          <div>
            <h4 className="my-1 text-sm font-bold ">Gender</h4>
            <div className="flex gap-3">
              <GenderSelect
                checked={personalData.gender === "Male"}
                Icon={IoManOutline}
                handleClick={() =>
                  setPersonalData({ ...personalData, gender: "Male" })
                }
              />
              <GenderSelect
                checked={personalData.gender === "Female"}
                Icon={IoWomanOutline}
                handleClick={() =>
                  setPersonalData({ ...personalData, gender: "Female" })
                }
              />
            </div>
            <h4 className="mt-3 mb-1 text-sm font-bold ">Weight</h4>
            <div>
              <input
                type={isChangeMode ? "number" : "text"}
                className={`${
                  isChangeMode && "input-base"
                } bg-transparent md:w-[60%]`}
                placeholder="kg"
                disabled={!isChangeMode}
                value={personalData.weight}
                name="weight"
                onChange={onChange}
              />
            </div>
            <h4 className="mt-3 mb-1 text-sm font-bold ">Height</h4>
            <div>
              <input
                type="number"
                className={`${
                  isChangeMode && "input-base"
                } bg-transparent md:w-[60%]`}
                placeholder="cm"
                disabled={!isChangeMode}
                value={personalData.height}
                name="height"
                onChange={onChange}
              />
            </div>
            <h4 className="mt-3 mb-1 text-sm font-bold ">Age</h4>
            <div>
              <input
                type="number"
                className={`${
                  isChangeMode && "input-base"
                } bg-transparent md:w-[60%]`}
                disabled={!isChangeMode}
                value={personalData.age}
                name="age"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div>
          <Link to="/recipes/new">
            <div className="mt-8 p-5 font-bold bg-white rounded-lg">
              <div className="flex justify-between items-center cursor-pointer">
                <GiChefToque />
                <p>Create New Recipe</p>
                <AiOutlineRight />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  )
}
export default Profile
