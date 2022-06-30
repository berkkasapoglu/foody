import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { MdOutlineAddBox } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../context/authContext"
import Spinner from "../components/layout/Spinner"
import MetaDecorator from "../components/MetaDecorator"
import metadata from "../metadata.json"

function CreateRecipe() {
  const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [""],
    nutritions: [
      {
        label: "Calories",
        total: "",
        unit: "kcal",
      },
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
        label: "Carbohydrate",
        total: "",
        unit: "g",
      },
    ],
    instructions: [""],
    yields: "",
    category: "",
    image: "",
    time: "",
  })

  const navigate = useNavigate()

  const {
    title,
    ingredients,
    nutritions,
    image,
    description,
    instructions,
    yields,
    category,
    time,
  } = formData
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

  const handleAddInput = (e, key) => {
    e.preventDefault()
    return setFormData({ ...formData, [key]: [...formData[key], ""] })
  }

  const handleRemoveInput = (index, e, key) => {
    e.preventDefault()
    const dataCopy = [...formData[key]]
    dataCopy.splice(index, 1)
    return setFormData({ ...formData, [key]: dataCopy })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const submittedForm = new FormData()
    const formDataCopy = { ...formData }
    formDataCopy["instructions"] = formDataCopy["instructions"].join("\n")
    for (const key in formDataCopy) {
      if (key !== "image")
        submittedForm.append(key, JSON.stringify(formDataCopy[key]))
    }

    if (image) submittedForm.append("image", image)

    const res = await fetch("/api/recipes", {
      method: "POST",
      body: submittedForm,
      headers: {
        authorization: "Bearer " + auth.token,
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
          <MetaDecorator
        title={`Foodie | Recipes - Meal Planner`}

        description={metadata.baseDescription}
        url={metadata.sitename + "/recipes/new"}
      />
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
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-label font-bold text-lg mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="A brief summary of the recipe"
            className="input-base"
            value={description}
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
                onClick={(e) => handleRemoveInput(idx, e, "ingredients")}
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
            onClick={(e) => handleAddInput(e, "ingredients")}
            className="flex p-4 text-[#39008f] transition hover:opacity-70"
          >
            <MdOutlineAddBox className="text-xl inline-block mr-3" />
            Add New Ingredient
          </button>
        </div>
        <div className="mb-4 flex">
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
        <div>
          <h3 className="block text-label font-bold text-lg mb-2">
            Instructions
          </h3>
          {instructions.map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <button
                className="p-4"
                onClick={(e) => handleRemoveInput(idx, e, "instructions")}
              >
                <BsTrash className="text-[#39008f] text-xl transition hover:opacity-70" />
              </button>
              <input
                type="text"
                id={idx}
                name="instructions"
                value={item}
                onChange={(e) => handleArrayInputChange(e, idx)}
                placeholder="New Instruction"
                className="ml-2 input-base"
                required
              />
            </div>
          ))}

          <button
            onClick={(e) => handleAddInput(e, "instructions")}
            className="flex p-4 text-[#39008f] transition hover:opacity-70"
          >
            <MdOutlineAddBox className="text-xl inline-block mr-3" />
            Add New Instruction
          </button>
        </div>
        <div className="flex mb-4 gap-3">
          <div>
            <label
              htmlFor="yields"
              className="block text-label font-bold text-lg mb-2"
            >
              Yields
            </label>
            <input
              type="text"
              name="yields"
              id="yields"
              placeholder="6 Servings"
              className="input-base"
              value={yields}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="yields"
              className="block text-label font-bold text-lg mb-2"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Fish"
              className="input-base"
              value={category}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-label font-bold text-lg mb-2"
            >
              Time
            </label>
            <input
              type="number"
              name="time"
              id="time"
              placeholder="Min"
              className="input-base"
              value={time}
              onChange={onChange}
              required
            />
          </div>
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
            accept="image/*"
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
