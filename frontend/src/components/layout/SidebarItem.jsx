function SidebarItem({ icon: Icon, name, active, setIsSidebarOpen }) {
  return (
    <div
      className={`px-14 py-4 flex items-center transition hover:bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.12)] ${
        active ? "text-primary" : "text-gray-400"
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <Icon />
      <h3 className="ml-2 font-bold">{name}</h3>
    </div>
  )
}
export default SidebarItem
