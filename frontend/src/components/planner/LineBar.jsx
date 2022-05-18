import { Line } from "rc-progress"

function LineBar({ stat, max, barColor }) {
  return (
    <div className="mb-4 relative flex-1">
      <Line
        className="relative"
        percent={max ? (stat / max) * 100 : 0}
        strokeWidth={6}
        strokeColor={barColor}
        trailWidth={6}
      />
      <div className="flex items-center absolute z-50 font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-primary text-center">
        <p className="text-sm text-black">
          {stat} g / {max} kcal
        </p>
      </div>
    </div>
  )
}
export default LineBar
