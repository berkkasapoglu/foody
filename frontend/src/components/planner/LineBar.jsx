import { Line } from "rc-progress"

function LineBar({ stat, max, barColor }) {
  return (
    <div className="mb-4 relative w-full h-5 md:h-6">
      <Line
        className="relative h-full w-full"
        percent={max ? (stat / max) * 100 : 0}
        strokeWidth={6}
        strokeColor={barColor}
        trailWidth={6}
      />
      <div className="flex items-center w-[90%] absolute z-1 font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-primary text-center">
        <p className="text-xs md:text-sm text-black">
          {stat} g / {max} kcal
        </p>
      </div>
    </div>
  )
}
export default LineBar
