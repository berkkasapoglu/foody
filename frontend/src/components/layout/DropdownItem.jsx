function DropdownItem({ children, handleOptionSelect, selected }) {
  return (
    <div
      className={`py-1 px-4 cursor-pointer text-sm transition hover:bg-[rgba(0,0,0,0.04)] ${
        selected && "border border-primary bg-[#ffeded]"
      }`}
      onClick={handleOptionSelect}
    >
      {children}
    </div>
  )
}
export default DropdownItem
