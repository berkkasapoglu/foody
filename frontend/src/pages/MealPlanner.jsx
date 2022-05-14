import Calendar from "@toast-ui/react-calendar"
import "tui-calendar/dist/tui-calendar.css"
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { useState } from "react";
function MealPlanner() {
  const [recipes, setRecipes] = useState([])
  return (
    <>
      <Calendar
        view="month"
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        schedules={[
          {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'allday',
            dueDateClass: '',
            start: new Date().toISOString(),
            end: new Date().toISOString()

          },
          {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'allday',
            dueDateClass: '',
            start: new Date().toISOString(),
            end: new Date().toISOString()

          },
          {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'allday',
            dueDateClass: '',
            start: new Date().toISOString(),
            end: new Date().toISOString()

          },
          {
            id: '1',
            calendarId: '0',
            title: 'TOAST UI Calendar Study',
            category: 'allday',
            dueDateClass: '',
            start: new Date().toISOString(),
            end: new Date().toISOString()
          }
        ]}
        useDetailPopup={true}
      />
    </>
  )
}
export default MealPlanner
