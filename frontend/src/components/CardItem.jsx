import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import { Link } from "react-router-dom"

const difficultyColor = {
  'Hard': 'bg-red-500',
  'Intermediate': 'bg-blue-500',
  'Easy': 'bg-green-500'
}

function CardItem({ recipe }) {

  return (
    <div className="basis-[30%] md:basis-[25%] bg-white text-center rounded-2xl shadow-md relative">
      <div className="px-10 pt-10">
        {/* {recipe.image ? (
          <img
            src={recipe.image}
            alt="recipe"
            className="w-[75px] h-[75px] absolute left-0 right-0 mx-auto block top-0 -translate-y-[50%] rounded-full"
          />
        ) : (
          <HeaderRecipe
            width={100}
            height={100}
            className="absolute -top-2 left-4 translate-x-1/2 -translate-y-1/2"
          />
        )} */}
        <h3 className="font-bold mb-2 mt-3">{recipe.title}</h3>
        <div className="mb-5">
          <span className={`${difficultyColor[recipe.difficulty]} text-sm bg-red-500 rounded-lg px-4 text-white font-bold`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="flex justify-evenly items-center mb-20">
          <div className="border-r-gray-200 border-r-2 px-3">
            <h3 className="font-bold text-lg">25</h3>
            <p className="text-sm">Min</p>
          </div>
          <div className="border-r-gray-200 border-r-2 px-3">
            <h3 className="font-bold text-lg">{parseInt(recipe.calories)}</h3>
            <p className="text-sm">Kcal</p>
          </div>
          <h3 className="pl-3">Dessert</h3>
        </div>
      </div>
      <Link to={`/recipes/${recipe._id}`} className="absolute bottom-0 left-0 py-3 text-white font-bold bg-primary w-full rounded-b-lg">
        Start Cooking
      </Link>
    </div>
  )
}
export default CardItem
