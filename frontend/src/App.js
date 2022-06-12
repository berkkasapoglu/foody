import Sidebar from "./components/layout/Sidebar"
import Home from "./pages/Home"
import Header from "./components/layout/Header"
import Favorites from "./pages/Favorites"
import MealPlanner from "./pages/MealPlanner"
import Recipe from "./pages/Recipe"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateRecipe from "./pages/CreateRecipe"
import { AuthProvider } from "./context/authContext"
import { DndProvider } from "react-dnd"
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; // or any other pipeline
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
          <div className="bg-body md:ml-[250px] min-h-screen p-10">
            <div className="max-w-[1100px] mx-auto">
              <Header setIsSidebarOpen={setIsSidebarOpen} />
              <div className="mt-12">
                <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:categoryName" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/planner" element={<MealPlanner />} />
                    <Route path="/recipes/:recipeId" element={<Recipe />} />
                    <Route path="/recipes/new" element={<ProtectedRoute />}>
                      <Route path="" element={<CreateRecipe />} />
                    </Route>
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/profile" element={<ProtectedRoute />}>
                      <Route path="" element={<Profile />} />
                    </Route>
                  </Routes>
                </DndProvider>
              </div>
            </div>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
