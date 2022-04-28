import { useEffect, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import FavoriteItem from "./FavoriteItem"

function DropContainer({ favorites, totalCalories, setTotalCalories }) {
  const [droppedItems, setDroppedItems] = useState([])
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: "recipe",
      drop: (item) => addToDropContainer(item.id),
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
      }),
    }),
    [favorites, totalCalories, droppedItems]
  )

  const addToDropContainer = (id) => {
    const favoritesCopy = favorites.map((favorite) => ({...favorite}))
    const item = favoritesCopy.filter((favorite) => favorite._id === id)
    const isExist = droppedItems.some((item) => item._id === id)
    if (!isExist) {
      setDroppedItems([...droppedItems, item[0]])
      setTotalCalories(totalCalories + item[0].count * parseInt(item[0].calories))
    }
  }

  const removeFromDropContainer = (id) => {
    let removedItem
    setDroppedItems(
      droppedItems.filter((item) => {
        if (item._id === id) removedItem = item
        return item._id !== id
      })
    )
    setTotalCalories(totalCalories - removedItem.count * parseInt(removedItem.calories))
  }

  const increaseCount = (id) => {
    const droppedItemsCopy = [...droppedItems]
    const item = droppedItemsCopy.find(item => item._id === id)
    item.count+=1
    setDroppedItems(droppedItemsCopy)
    setTotalCalories(totalCalories + parseInt(item.calories))
  }

  const decreaseCount = (id) => {
    const droppedItemsCopy = [...droppedItems]
    const item = droppedItemsCopy.find(item => item._id === id)
    if(item.count > 1) {
      item.count-=1
      setDroppedItems(droppedItemsCopy)
    } else {
      setDroppedItems(droppedItemsCopy.filter((item) => item._id !== id))
    }
    setTotalCalories(totalCalories - parseInt(item.calories))
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
