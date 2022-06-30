import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import { Link } from "react-router-dom"

function CardItem({ recipe }) {
  return (
    <div className="min-w-[17rem] basis-[30%] md:basis-[25%] bg-white text-center rounded-2xl shadow-md relative">
      <div className="px-10 pt-10">
        {recipe.image ? (
          <img
            src={recipe.image.lowQuality}
            alt="recipe"
            className="w-[75px] h-[75px] absolute left-0 right-0 mx-auto block top-0 -translate-y-[50%] rounded-full"
          />
        ) : ( 
          <HeaderRecipe
            width={100}
            height={100}
            className="absolute -top-2 left-4 translate-x-1/2 -translate-y-1/2"
          />
        )}
        <Link to={`/recipes/${recipe.slug}`} className="font-bold block mb-2 mt-5">{recipe.title}</Link>
        <div className="grid grid-cols-2 items-center mb-20">
          <div className="px-2 border-r-2">
            <h3 className="font-bold text-lg">
              {parseInt(
                recipe.nutritions.find(
                  (nutrition) => nutrition.label === "Calories"
                )?.total
              )}
            </h3>
            <p className="text-sm text-slate-500 font-bold">Kcal</p>
          </div>
          <div className="px-2">
            <h3 className="font-bold text-lg">{recipe.time}</h3>
            <p className="text-sm text-slate-500 font-bold">Min</p>
          </div>
        </div>
      </div>
      <Link
        to={`/recipes/${recipe.slug}`}
        className="absolute bottom-0 left-0 py-3 text-white font-bold bg-primary w-full rounded-b-lg"
      >
        Start Cooking
      </Link>
    </div>
  )
}
export default CardItem
