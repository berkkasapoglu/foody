import { useState, useRef } from "react"
import { BsTrash } from "react-icons/bs"
import { MdOutlineAddBox } from "react-icons/md"
function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    calories: 0,
    fat: 0,
    carbs: 0,
    image: {},
    protein: 0,
    ingredients: [""],
  })

  const { title, ingredients } = formData
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleIngredientChange = (e, index) => {
    const ingredientsCopy = [...ingredients]
    ingredientsCopy[index] = e.target.value
    setFormData({ ...formData, ingredients: ingredientsCopy })
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddIngredient = () => {
    return setFormData({ ...formData, ingredients: [...ingredients, ""] })
  }

  const handleRemoveIngredient = (index) => {
    const ingredientsCopy = [...ingredients]
    ingredientsCopy.splice(index, 1)
    return setFormData({ ...formData, ingredients: ingredientsCopy })
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
            className="w-full p-2 rounded-md bg-inherit border-input border-2"
            value={title}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 className="block text-label font-bold text-lg mb-2">
            List of Ingredients
          </h3>
          {ingredients.map((item, idx) => (
            <div className="flex items-center">
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
                onChange={(e) => handleIngredientChange(e, idx)}
                placeholder="New Ingredient"
                className="ml-2 w-full p-2 rounded-md bg-inherit border-input border-2"
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
              className="w-full p-2 rounded-md bg-inherit border-input border-2"
              onChange={onChange}
            />
          </div>
          <div className="mr-3">
            <label
              htmlFor="title"
              className="block text-label font-bold text-lg mb-2"
            >
              Fat
            </label>
            <input
              min={1}
              type="number"
              name="fat"
              id="fat"
              placeholder="Fat"
              className="w-full p-2 rounded-md bg-inherit border-input border-2"
              onChange={onChange}
            />
          </div>
          <div className="mr-3">
            <h3
              htmlFor="carbs"
              className="block text-label font-bold text-lg mb-2"
            >
              Carbs
            </h3>
            <input
              min={1}
              type="number"
              id="carbs"
              name="carbs"
              placeholder="Carbs"
              className="w-full p-2 rounded-md bg-inherit border-input border-2"
              onChange={onChange}
            />
          </div>
          <div className="mr-3">
            <label
              htmlFor="protein"
              className="block text-label font-bold text-lg mb-2"
            >
              Protein
            </label>
            <input
              min={1}
              type="number"
              id="protein"
              name="protein"
              placeholder="Protein"
              className="w-full p-2 rounded-md bg-inherit border-input border-2"
              onChange={onChange}
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
            accept="img"
            id="image"
            className="w-full p-2 rounded-md bg-inherit border-input border-2"
          />
        </div>
        <button className="mb-2 py-2 px-5 bg-primary rounded-md text-body font-bold transition hover:bg-red-700">
          Create Recipe
        </button>
      </form>
    </>
  )
}
export default CreateRecipe
