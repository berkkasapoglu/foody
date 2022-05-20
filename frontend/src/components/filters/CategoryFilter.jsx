import CategoryItem from "./CategoryItem"
import { NavLink } from "react-router-dom"
import { ReactComponent as Burger } from "../../assets/svg/burger.svg"
import { ReactComponent as Fish } from "../../assets/svg/fish.svg"
import { ReactComponent as Herbs } from "../../assets/svg/herbs.svg"
import { ReactComponent as Noodle } from "../../assets/svg/noodle.svg"
import { ReactComponent as Salad } from "../../assets/svg/salad.svg"
import { ReactComponent as Soup } from "../../assets/svg/soup.svg"
import { ReactComponent as AllFoods } from "../../assets/svg/allFood.svg"

function CategoryFilter({ setSelectedCategory, setRecipes, selectedCategory }) {
  const changeCategory = (e) => {
    if(e.currentTarget.name !== selectedCategory) {
      setSelectedCategory(e.currentTarget.name)
      setRecipes([])
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-between">
      <NavLink
        to="/"
        name=""
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem active={isActive} name="All" Logo={AllFoods} />
        )}
      />
      <NavLink
        to="/category/burger"
        name="burger"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem active={isActive} name="Burger" Logo={Burger} />
        )}
      />
      <NavLink
        to="/category/fish"
        name="fish"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem name="Fish" Logo={Fish} active={isActive} />
        )}
      />
      <NavLink
        to="/category/herbs"
        name="herbs"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem name="Herbs" Logo={Herbs} active={isActive} />
        )}
      />
      <NavLink
        to="/category/noodle"
        name="noodle"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem name="Noodle" Logo={Noodle} active={isActive} />
        )}
      />
      <NavLink
        to="/category/salad"
        name="salad"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem name="Salad" Logo={Salad} active={isActive} />
        )}
      />
      <NavLink
        to="/category/soup"
        name="soup"
        onClick={(e) => changeCategory(e)}
        children={({ isActive }) => (
          <CategoryItem name="Soup" Logo={Soup} active={isActive} />
        )}
      />
    </div>
  )
}
export default CategoryFilter
