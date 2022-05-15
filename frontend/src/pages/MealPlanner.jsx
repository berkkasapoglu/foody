import { useEffect, useState } from "react"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { useUser } from "../hooks/useUser"
const localizer = momentLocalizer(moment)

function MealPlanner() {
  const [meals, setMeals] = useState([])
  const { data: user } = useUser()
  useEffect(() => {
    if (user.planner) {
      getUserEvents()
    }
  }, [user])
  const getUserEvents = () => {
    const allEvents = []
    for (let event of user.planner) {
      console.log(event)
      event.meals.map((item) => {
        allEvents.push({
          title: item.title,
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate(),
        })
      })
    }
    setMeals(allEvents)
  }
  console.log(meals)
  return (
    <>
      <Calendar
        defaultView="month"
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        resizable
        events={meals}
        style={{ height: "70vh" }}
        // views={{
        //   month: true
        // }}
      />
    </>
  )
}
export default MealPlanner
