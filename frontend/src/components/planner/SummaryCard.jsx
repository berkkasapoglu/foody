import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"

function SummaryCard({stat, unit, max=2500, pathColor, textColor, title}) {
  console.log(pathColor)
  return (
    <div className="bg-white rounded-lg shadow-transparent p-6">
      <h3 className="font-bold text-lg mb-3 text-center">{title}</h3>
      <CircularProgressbarWithChildren
        value={stat}
        maxValue={max}
        styles={buildStyles({
          textColor: textColor,
          pathColor: pathColor,
        })}
      >
        <div className="font-bold text-primary text-center">
          <p className="text-3xl">{unit}</p>
          <h3 className="text-2xl text-black">{stat}</h3>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  )
}
export default SummaryCard
