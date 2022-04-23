function SidebarItem({ icon: Icon, name, active }) {
  return (
    <div className={`mb-4 px-14 py-2 flex items-center ${active ? "text-primary" : "text-gray-400"}`}>
      <Icon />
      <h3 className="ml-2 font-bold">{name}</h3>
    </div>
  )
}
export default SidebarItem