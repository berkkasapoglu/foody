import { useAuth } from "../context/authContext"
import { useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"

import { IoManOutline, IoWomanOutline } from "react-icons/io5"

import GenderSelect from "../components/GenderSelect"
import Spinner from "../components/layout/Spinner"
import defaultProfile from "../assets/defaultProfile.png"
import { toast } from "react-toastify"
import MetaDecorator from "../components/MetaDecorator"
import metadata from "../metadata.json"

function Profile() {
  const { auth, setAuth } = useAuth()
  const { data: user, setData: setUser } = useUser()
  const [personalData, setPersonalData] = useState({})

  const [isChangeMode, setIsChangeMode] = useState(false)

  useEffect(() => {
    if (user && user.personalInformation) {
      setPersonalData((prevPersonalData) => {
        return {
          ...prevPersonalData,
          ...user.personalInformation,
        }
      })
    }
  }, [user])

  const onChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    })
  }

  const updateProfile = async (body) => {
    const formData = new FormData()
    for (const key in body) {
      formData.append(key, body[key])
    }
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + auth.token,
      },
      body: formData,
    })

    const result = await res.json()
    if (result.success) {
      setUser({
        ...user,
        personalInformation: {
          ...personalData,
          ...body,
        },
      })
      return result
    } else {
      toast.error(result.message)
    }
  }

  const handleImageChange = async (e) => {
    const id = toast.loading("Profile photo is uptading...")
    const profile = await updateProfile({ image: e.target.files[0] })
    if (profile) {
      toast.update(id, {
        render: "Profile photo updated",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      })
      setAuth({ ...auth, profilePhoto: profile.profilePhoto })
    } else {
      toast.dismiss(id)
    }
  }

  const onSubmit = async () => {
    const updates = {}
    let changed = false
    for (let key of Object.keys(personalData)) {
      if (
        !user.personalInformation ||
        user.personalInformation[key] !== personalData[key]
      ) {
        changed = true
        updates[key] = personalData[key]
      }
    }

    if (changed && Object.keys(updates).length) {
      updateProfile(updates)
      toast.success("Updated Successfully.")
    }
  }
  if (!user) return <Spinner />
  return (
    <>
      <MetaDecorator
        title="Foodie | Profile"
        description={metadata.baseDescription}
        url={metadata.sitename + `/profile`}
      />
      <h3 className="font-bold text-3xl">My Profile</h3>
      <main className="w-full lg:w-[50%]">
        <div className="mt-4 p-5 rounded-lg bg-white">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                personalData.profilePhoto
                  ? personalData.profilePhoto
                  : defaultProfile
              }
              alt="profile"
              className="w-[50px] h-[50px] rounded-full"
            />
            <label
              htmlFor="profile-img-upload"
              className="font-bold cursor-pointer border px-4 py-2 border-slate-400"
            >
              Update Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-img-upload"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
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
                value={`${personalData.weight || ""}${
                  !isChangeMode ? " kg" : ""
                }`}
                name="weight"
                onChange={onChange}
              />
            </div>
            <h4 className="mt-3 mb-1 text-sm font-bold ">Height</h4>
            <div>
              <input
                type={isChangeMode ? "number" : "text"}
                className={`${
                  isChangeMode && "input-base"
                } bg-transparent md:w-[60%]`}
                placeholder="cm"
                disabled={!isChangeMode}
                value={`${personalData.height || ""}${
                  !isChangeMode ? " cm" : ""
                }`}
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
                value={personalData.age || ""}
                name="age"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Profile
