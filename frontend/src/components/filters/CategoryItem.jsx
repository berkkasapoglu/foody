function CategoryItem({ name, Logo, active }) {
  return (
    <div
      className={`${
        active ? "bg-primary" : "bg-white"
      } mt-10 max-w-[70px] p-2 rounded-full flex flex-col items-center justify-between cursor-pointer shadow-xl`}
    >
      <Logo
        className="mb-4 bg-white rounded-full p-1 border"
        width={62}
        height={62}
      />
      <p className={`pb-3 font-bold ${active ? "text-white" : "text-black"}`}>
        {name}
      </p>
    </div>
  )
}
export default CategoryItem
