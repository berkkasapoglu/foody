import { Circle } from "rc-progress"

function CircleBar({ stat, max, barColor, text, checkResult }) {
  const percent = (stat / max) * 100 > 100 ? 100 : (stat / max) * 100
  
  return (
    <>
      <Circle
        percent={max ? percent : 0}
        strokeWidth={6}
        strokeColor={barColor}
        trailWidth={6}
        width={200}
      />
      <div className="absolute z-1 font-bold top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-500 text-center">
        <p className="text-2xl">{text}</p>
        <h3 className="text-xl text-black">{stat}</h3>
        {checkResult && <h3 className={`text-xl text-black ${checkResult.color}`}>{checkResult.status}</h3>}
      </div>
    </>
  )
}
export default CircleBar
