function SidebarItem({ icon: Icon, name }) {
  return (
    <div className="mb-4 px-14 py-2 flex items-center">
      <Icon className="text-primary" />
      <h3 className="ml-2 font-bold">{name}</h3>
    </div>
  )
}
export default SidebarItem