import { AiOutlineCheck } from "react-icons/ai"

function GenderSelect({ Icon, checked, handleClick }) {
  return (
    <button onClick={handleClick} className={`bg-slate-400 p-4 border-2 rounded-lg relative ${checked && 'border-green-500'}`}>
      <Icon fontSize={50} color="white" />
      <AiOutlineCheck
        className={`invisible absolute top-1 right-1 ${checked && 'bg-green-500 !visible'} rounded-full p-0.5`}
        fontSize={15}
      />
    </button>
  )
}
export default GenderSelect
