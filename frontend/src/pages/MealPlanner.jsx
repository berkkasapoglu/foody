import { useEffect, useMemo, useState } from "react"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { useUser } from "../hooks/useUser"
import CalendarPopOver from "../components/planner/CalendarPopOver"
import SummaryCard from "../components/planner/SummaryCard"
import LineBar from "../components/planner/LineBar"
import CircleBar from "../components/planner/CircleBar"
import DatePicker from "react-datepicker"
import { AiOutlineCalendar } from "react-icons/ai"
import "react-datepicker/dist/react-datepicker.css"
const localizer = momentLocalizer(moment)

const mealTimeStyle = {
  breakfast: "#1ABC9C",
  lunch: "#3498DB",
  dinner: "#E74C3C",
  other: "#E74C3C",
}

const calculateWeeklyStats = (
  weeklyMeals,
  personalInformation,
  selectedWeek
) => {
  const stats = {
    totalCalorieTaken: 0,
    totalFatTaken: 0,
    totalCarbTaken: 0,
    totalProteinTaken: 0,
    BMI: 0,
  }

  const filteredWeeklyMeals = weeklyMeals.filter((meal) => {
    return (
      meal.start >= selectedWeek.firstDay && meal.end <= selectedWeek.lastDay
    )
  })

  filteredWeeklyMeals.length &&
    filteredWeeklyMeals.forEach((mealData) => {
      stats.totalCalorieTaken += mealData.meal.calories
      stats.totalFatTaken += mealData.meal.nutritions[0].total
      stats.totalCarbTaken += mealData.meal.nutritions[1].total
      stats.totalProteinTaken += mealData.meal.nutritions[2].total
    })
  if (personalInformation) {
    const { height, weight } = personalInformation
    if (height && weight) {
      stats.BMI = (weight / Math.pow(height / 100, 2)).toFixed(2)
    } else {
      stats.BMI = 23.0
    }
  }
  const needs = calculateNeeds(personalInformation)
  stats.needs = needs || {}
  return stats
}

function MealPlanner() {
  const [meals, setMeals] = useState([])
  const { data: user, setData: setUser } = useUser({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [selectedWeek, setSelectedWeek] = useState({
    firstDay: new Date(today.setDate(today.getDate() - today.getDay() + 1)),
    lastDay: new Date(today.setDate(today.getDate() - today.getDay() + 7)),
  })
  useEffect(() => {
    if (user && user.planner) {
      const getUserEvents = () => {
        const allEvents = []
        for (let dailyPlan of user.planner) {
          if (dailyPlan.meals) {
            dailyPlan.meals.forEach((item) => {
              if (item.meal) {
                for (let i = 0; i < item.count; i++) {
                  allEvents.push({
                    title: item.meal.title,
                    start: moment(dailyPlan.day).toDate(),
                    end: moment(dailyPlan.day).toDate(),
                    meal: item.meal,
                    mealTime: item.mealTime,
                    _id: item._id,
                  })
                }
              }
            })
          }
        }
        setMeals(allEvents)
      }
      getUserEvents()
    }
  }, [user])

  const onWeekSelect = (selected) => {
    selected.setHours(0, 0, 0, 0)
    setSelectedDate(new Date(selected))
    const firstDayOfWeek = new Date(
      selected.setDate(selected.getDate() - (selected.getDay() - 1))
    )

    const lastDayOfWeek = new Date(
      selected.setDate(firstDayOfWeek.getDate() + 6)
    )
    setSelectedWeek({
      firstDay: firstDayOfWeek,
      lastDay: lastDayOfWeek,
    })
  }
  const weeklyStats = useMemo(
    () => calculateWeeklyStats(meals, user.personalInformation, selectedWeek),
    [meals, user.personalInformation, selectedWeek]
  )

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: mealTimeStyle[event.mealTime],
    }
    return {
      style: style,
    }
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
        components={{
          event: (props) => (
            <CalendarPopOver {...props} user={user} setUser={setUser} />
          ),
        }}
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
      <div className="flex flex-col items-center justify-between my-5 gap-4 md:flex-row">
        <h3 className="text-2xl font-bold">Weekly Summary</h3>
        <div className="flex items-center">
          <h4 className="text-lg font-bold mr-3">Choose Week: </h4>
          <div className="relative">
            <AiOutlineCalendar className="text-primary text-xl absolute left-2 top-[50%] -translate-y-[55%] z-20 pointer-events-none" />
            <DatePicker
              selected={selectedDate}
              onChange={onWeekSelect}
              value={`${selectedWeek.firstDay.toLocaleDateString()} to ${selectedWeek.lastDay.toLocaleDateString()}`}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-between gap-5 flex-wrap">
        <SummaryCard title="Total Calorie Taken">
          <CircleBar
            stat={weeklyStats.totalCalorieTaken}
            text="Kcal"
            barColor="rgba(219,53,41)"
            max={weeklyStats.needs.calorie}
          />
        </SummaryCard>
        <SummaryCard title="Body Mass Index">
          <CircleBar
            stat={weeklyStats.BMI}
            checkResult={checkBMI(weeklyStats.BMI)}
            text="BMI"
            barColor={mealTimeStyle.breakfast}
            max={50}
          />
        </SummaryCard>
        <div className="flex-1 min-w-[300px]">
          <SummaryCard title="Nutritions">
            <div className="flex gap-2">
              <h3 className="font-bold text-sm md:text-base min-w-[110px]">Protein</h3>
              <LineBar
                stat={weeklyStats.totalProteinTaken}
                max={weeklyStats.needs.protein}
                barColor={mealTimeStyle.breakfast}
              />
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold text-sm md:text-base min-w-[110px]">Carbohydrate</h3>
              <LineBar
                stat={weeklyStats.totalCarbTaken}
                max={weeklyStats.needs.carb}
                barColor={mealTimeStyle.lunch}
              />
            </div>
            <div className="flex gap-2">
              <h3 className="font-bold text-sm md:text-base min-w-[110px]">Fat</h3>
              <LineBar
                stat={weeklyStats.totalFatTaken}
                max={weeklyStats.needs.fat}
                barColor={mealTimeStyle.dinner}
              />
            </div>
          </SummaryCard>
        </div>
      </div>
    </div>
  )
}

const calculateNeeds = (personalInformation) => {
  if (personalInformation) {
    const { weight, height, age, gender } = personalInformation
    if (!weight || !height || !age || !gender) return
    const needs = {}
    if (gender === "Male") {
      needs.calorie = (66.5 + 13.8 * weight + 5.0 * height - 6.8 * age) * 7
    } else if (gender === "Female") {
      needs.calorie = (655.1 + 9.6 * weight + 1.9 * height - 4.7 * age) * 7
    }
    needs.carb = parseInt(needs.calorie * 0.55 * 0.13) * 7
    needs.fat = parseInt(needs.calorie * 0.3 * 0.13) * 7
    needs.protein = parseInt(needs.calorie * 0.25 * 0.13) * 7
    return needs
  }
}

const checkBMI = (BMIValue) => {
  let BMIResult
  switch (true) {
    case BMIValue < 18.5:
      BMIResult = { status: "Underweight", color: "text-blue-400" }
      break
    case BMIValue < 24.9:
      BMIResult = { status: "Normalweight", color: "text-green-500" }
      break
    case BMIValue < 29.9:
      BMIResult = { status: "Overweight", color: "text-orange-500" }
      break
    default:
      BMIResult = { status: "Obesity", color: "text-red-500" }
      break
  }
  return BMIResult
}

export default MealPlanner
