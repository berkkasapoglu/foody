import CardItem from "./CardItem"

function CartList() {
  return (
    <div className="flex flex-wrap gap-10 justify-between gap-y-16">
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </div>
  )
}
export default CartList
