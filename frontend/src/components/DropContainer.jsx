import { useEffect, useState } from "react"
import { useDrop } from "react-dnd"
import FavoriteItem from "./FavoriteItem"

function DropContainer({
  favorites,
  totalCalories,
  setTotalCalories,
  name,
  mealPlan,
  setMealPlan,
}) {
  const [droppedItems, setDroppedItems] = useState(mealPlan[name] || [])
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "recipe",
      drop: (item) => addToDropContainer({...item}),
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [favorites, totalCalories, droppedItems]
  )

  useEffect(() => {
    setMealPlan((prevPlan) => {
      return {
        ...prevPlan,
        [name]: [...droppedItems]
      }})
  }, [droppedItems, name, setMealPlan])

  const addToDropContainer = (item) => {
    const isExist = droppedItems.some((droppedItem) => droppedItem._id === item._id)
    const calories = item.nutritions.find(nutrition => nutrition.label === "Calories")
    if (!isExist) {
      setDroppedItems([...droppedItems, item])
      setTotalCalories(
        totalCalories + item.count * parseInt(calories.total)
      )
    }
  }

  const removeFromDropContainer = (id) => {
    let removedItem
    const newContainer = droppedItems.filter((item) => {
      if (item._id === id) removedItem = item
      return item._id !== id
    })
    const calories = removedItem.nutritions.find(nutrition => nutrition.label === "Calories")
    setDroppedItems(newContainer)
    setTotalCalories(
      totalCalories - removedItem.count * parseInt(calories.total)
    )
  }

  const increaseCount = (id) => {
    const droppedItemsCopy = [...droppedItems]
    const item = droppedItemsCopy.find((item) => item._id === id)
    const calories = item.nutritions.find(nutrition => nutrition.label === "Calories")
    item.count += 1
    setDroppedItems(droppedItemsCopy)
    setTotalCalories(totalCalories + parseInt(calories.total))
  }

  const decreaseCount = (id) => {
    const droppedItemsCopy = [...droppedItems]
    const item = droppedItemsCopy.find((item) => item._id === id)
    const calories = item.nutritions.find(nutrition => nutrition.label === "Calories")
    if (item.count > 1) {
      item.count -= 1
      setDroppedItems(droppedItemsCopy)
    } else {
      setDroppedItems(droppedItemsCopy.filter((item) => item._id !== id))
    }
    setTotalCalories(totalCalories - parseInt(calories.total))
  }

  return (
    <>
      {droppedItems.map((item) => (
        <FavoriteItem
          favorite={item}
          key={item._id}
          dragged={true}
          removeFromDropContainer={removeFromDropContainer}
          size="xs"
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
        />
      ))}
      <div
        ref={drop}
        className={`${
          canDrop
            ? "bg-green-300 border-green-700 text-green-700"
            : "bg-red-300 border-red-700 text-red-700"
        } border-2 border-dashed font-bold px-8 py-3`}
      >
        {canDrop ? "Release here" : "Drop Here to Add"}
      </div>
    </>
  )
}
export default DropContainer
