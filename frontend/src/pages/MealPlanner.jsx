import { useEffect, useMemo, useState } from "react"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { useUser } from "../hooks/useUser"
import CalendarPopOver from "../components/planner/CalendarPopOver"
import SummaryCard from "../components/planner/SummaryCard"
const localizer = momentLocalizer(moment)

const mealTimeStyle = {
  breakfast: "#1ABC9C",
  lunch: "#3498DB",
  dinner: "#E74C3C",
  other: "#E74C3C",
}

const calculateWeeklyStats = (weeklyMeals) => {
  const stats = {
    totalCalorieTaken: 0,
    totalFatTaken: 0,
    totalCarbTaken: 0,
    totalProteinTaken: 0,
  }
  weeklyMeals.length &&
    weeklyMeals.map((mealData) => {
      stats.totalCalorieTaken += mealData.meal.calories
      stats.totalFatTaken += mealData.meal.nutritions[0].total
      stats.totalCarbTaken += mealData.meal.nutritions[1].total
      stats.totalProteinTaken += mealData.meal.nutritions[2].total
    })
  return stats
}

function MealPlanner() {
  const [meals, setMeals] = useState([])
  const { data: user } = useUser()

  useEffect(() => {
    if (user.planner) {
      getUserEvents()
    }
  }, [user])
  const mealStats = useMemo(() => calculateWeeklyStats(meals), [meals])
  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: mealTimeStyle[event.mealTime],
    }
    return {
      style: style,
    }
  }
  const getUserEvents = () => {
    const allEvents = []
    for (let dailyPlan of user.planner) {
      if (dailyPlan.meals) {
        dailyPlan.meals.map((item) => {
          if (item.meal) {
            allEvents.push({
              title: item.meal.title,
              start: moment(dailyPlan.day).toDate(),
              end: moment(dailyPlan.day).toDate(),
              meal: item.meal,
              mealTime: item.mealTime,
            })
          }
        })
      }
    }
    setMeals(allEvents)
  }

  return (
    <div>
      <Calendar
        defaultView="month"
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        resizable
        events={meals}
        style={{ height: "70vh", fontSize: ".8rem" }}
        eventPropGetter={eventPropGetter}
        components={{ event: CalendarPopOver }}
      />
      <div className="flex justify-end gap-3 mt-2">
        <div className="inline-flex items-center gap-1">
          <div className={`w-[8px] h-[8px] bg-[#1ABC9C] rounded-full`}></div>
          <h3 className="font-bold">Breakfast</h3>
        </div>
        <div className="inline-flex items-center gap-1">
          <div className={`w-[8px] h-[8px] bg-[#3498DB] rounded-full`}></div>
          <h3 className="font-bold">Lunch</h3>
        </div>
        <div className="inline-flex items-center gap-1">
          <div className={`w-[8px] h-[8px] bg-[#E74C3C] rounded-full`}></div>
          <h3 className="font-bold">Dinner</h3>
        </div>
        <div className="inline-flex items-center gap-1">
          <div className={`w-[8px] h-[8px] bg-[#E74C3C] rounded-full`}></div>
          <h3 className="font-bold">Other</h3>
        </div>
      </div>
      <h3 className="text-2xl font-bold my-5">Weekly Summary</h3>
      <div className="flex gap-5">
        <SummaryCard stat={mealStats.totalCalorieTaken} unit="Kcal" textColor="#ef4444" pathColor="rgba(219,53,41)" title={"Calorie Taken"}/>
        <SummaryCard stat={11.7} unit="BMI" max={25} title="Body Mass Index (BMI)" />
        <SummaryCard stat={11.7} unit="BMI" max={25} title="Nutrient Ratios" />
      </div>
    </div>
  )
}
export default MealPlanner
