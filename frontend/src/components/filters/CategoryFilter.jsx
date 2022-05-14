import CategoryItem from "./CategoryItem"
import { NavLink } from "react-router-dom"
import { ReactComponent as Burger } from "../../assets/svg/burger.svg"
import { ReactComponent as Fish } from "../../assets/svg/fish.svg"
import { ReactComponent as Herbs } from "../../assets/svg/herbs.svg"
import { ReactComponent as Noodle } from "../../assets/svg/noodle.svg"
import { ReactComponent as Salad } from "../../assets/svg/salad.svg"
import { ReactComponent as Soup } from "../../assets/svg/soup.svg"
import { ReactComponent as AllFoods } from "../../assets/svg/allFood.svg"

function CategoryFilter({ setSelectedCategory }) {
  return (
    <div className="flex justify-between">
      <NavLink
        to="/"
        name="all"
        onClick={() => setSelectedCategory("")}
        children={({ isActive }) => (
          <CategoryItem active={isActive} name="All" Logo={AllFoods} />
        )}
      />
      <NavLink
        to="/category/burger"
        name="burger"
        onClick={() => setSelectedCategory("burger")}
        children={({ isActive }) => (
          <CategoryItem active={isActive} name="Burger" Logo={Burger} />
        )}
      />
      <NavLink
        to="/category/fish"
        name="fish"
        onClick={() => setSelectedCategory("fish")}
        children={({ isActive }) => (
          <CategoryItem name="Fish" Logo={Fish} active={isActive} />
        )}
      />
      <NavLink
        to="/category/herbs"
        name="herbs"
        onClick={() => setSelectedCategory("herbs")}
        children={({ isActive }) => (
          <CategoryItem name="Herbs" Logo={Herbs} active={isActive} />
        )}
      />
      <NavLink
        to="/category/noodle"
        name="noodle"
        onClick={() => setSelectedCategory("noodle")}
        children={({ isActive }) => (
          <CategoryItem name="Noodle" Logo={Noodle} active={isActive} />
        )}
      />
      <NavLink
        to="/category/salad"
        name="salad"
        onClick={() => setSelectedCategory("salad")}
        children={({ isActive }) => (
          <CategoryItem name="Salad" Logo={Salad} active={isActive} />
        )}
      />
      <NavLink
        to="/category/soup"
        name="soup"
        onClick={() => setSelectedCategory("soup")}
        children={({ isActive }) => (
          <CategoryItem name="Soup" Logo={Soup} active={isActive} />
        )}
      />
    </div>
  )
}
export default CategoryFilter
