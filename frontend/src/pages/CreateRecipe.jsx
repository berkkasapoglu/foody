import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { MdOutlineAddBox } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../context/authContext"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import storage from "../firebase.config"
import Spinner from "../components/layout/Spinner"

function CreateRecipe() {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    source: auth.username,
    calories: "",
    category: "",
    nutritions: [
      {
        label: "Protein",
        total: "",
        unit: "g",
      },
      {
        label: "Fat",
        total: "",
        unit: "g",
      },
      {
        label: "Carbs",
        total: "",
        unit: "g",
      },
    ],
    image: "",
    ingredients: [""],
    difficulty: "Easy",
  })

  const navigate = useNavigate()

  const { title, ingredients, calories, nutritions, image } = formData
  const onChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleArrayInputChange = (e, index) => {
    const copyData = [...formData[e.target.name]]
    if (e.target.name === "nutritions") {
      copyData[index].total = e.target.value
    } else {
      copyData[index] = e.target.value
    }
    setFormData({ ...formData, [e.target.name]: copyData })
  }

  const handleAddIngredient = () => {
    return setFormData({ ...formData, ingredients: [...ingredients, ""] })
  }

  const handleRemoveIngredient = (index) => {
    const ingredientsCopy = [...ingredients]
    ingredientsCopy.splice(index, 1)
    return setFormData({ ...formData, ingredients: ingredientsCopy })
  }

  const uploadImage = async () => {
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, `/images/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    const imageUrl = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl)
          })
        }
      )
    }).catch((error) => {
      toast.error("Images not uploaded")
    })
    return imageUrl
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const imageUrl = await uploadImage()
    const formDataCopy = { ...formData }
    formDataCopy.image = imageUrl
    const res = await fetch("/api/recipes", {
      method: "POST",
      body: JSON.stringify(formDataCopy),
      headers: {
        authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
    })
    const result = await res.json()
    setLoading(false)
    if (result.success) {
      navigate(`/recipes/${result.data._id}`)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <h3 className="font-bold text-4xl">Create New Recipe</h3>
      <form action="" className="mt-8" onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-label font-bold text-lg mb-2"
          >
            Add your special recipe
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="input-base"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <h3 className="block text-label font-bold text-lg mb-2">
            List of Ingredients
          </h3>
          {ingredients.map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <button
                className="p-4"
                onClick={() => handleRemoveIngredient(idx)}
              >
                <BsTrash className="text-[#39008f] text-xl transition hover:opacity-70" />
              </button>
              <input
                type="text"
                id={idx}
                name="ingredients"
                value={item}
                onChange={(e) => handleArrayInputChange(e, idx)}
                placeholder="New Ingredient"
                className="ml-2 input-base"
                required
              />
            </div>
          ))}

          <button
            onClick={handleAddIngredient}
            className="flex p-4 text-[#39008f] transition hover:opacity-70"
          >
            <MdOutlineAddBox className="text-xl inline-block mr-3" />
            Add New Ingredient
          </button>
        </div>
        <div className="mb-4 flex">
          <div className="mr-3">
            <label
              htmlFor="calories"
              className="block text-label font-bold text-lg mb-2"
            >
              Calories
            </label>
            <input
              min={1}
              type="number"
              id="calories"
              name="calories"
              placeholder="Calories"
              className="input-base"
              value={calories}
              onChange={onChange}
              step=".01"
              required
            />
          </div>
          {nutritions.map((item, idx) => (
            <div className="mr-3" key={idx}>
              <label
                htmlFor={item.label}
                className="block text-label font-bold text-lg mb-2"
              >
                {item.label}
              </label>
              <input
                min={1}
                type="number"
                name="nutritions"
                id={item.label}
                placeholder={item.label}
                className="input-base"
                value={nutritions[idx].total}
                step=".01"
                onChange={(e) => handleArrayInputChange(e, idx)}
                required
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-label font-bold text-lg mb-2"
          >
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="input-base"
            onChange={onChange}
          >
            <option value="Easy">Easy</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-label font-bold text-lg mb-2"
          >
            Image
          </label>
          <input
            type="file"
            accept="img"
            name="image"
            onChange={onChange}
            className="w-full p-2 rounded-md bg-inherit border-input border-2"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <button className="mb-2 py-2 px-5 bg-primary rounded-md text-body font-bold transition hover:bg-red-700">
            Create Recipe
          </button>
        )}
      </form>
    </>
  )
}
export default CreateRecipe
