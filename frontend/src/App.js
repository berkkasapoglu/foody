import Sidebar from "./components/layout/Sidebar"
import Home from "./pages/Home"
import Header from "./components/layout/Header"
import Favorites from "./pages/Favorites"
import MealPlanner from "./pages/MealPlanner"
import Recipe from "./pages/Recipe"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Page404 from "./pages/Page404"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/privateRoutes/ProtectedRoute"
import AdminRoute from "./components/privateRoutes/AdminRoute"
import CreateRecipe from "./pages/CreateRecipe"
import { AuthProvider } from "./context/authContext"
import { DndProvider } from "react-dnd"
import MultiBackend from "react-dnd-multi-backend"
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch" // or any other pipeline
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"
import FavoritePreview from "./components/FavoritePreview"
import MetaDecorator from "./components/MetaDecorator"
import metadata from "./metadata.json"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <MetaDecorator
        title={`Foodie`}
        description={metadata.baseDescription}
        url={metadata.sitename}
      />
      <AuthProvider>
        <Sidebar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="bg-body md:ml-[250px] min-h-screen p-10">
          <div className="max-w-[1100px] mx-auto">
            <Header setIsSidebarOpen={setIsSidebarOpen} />
            <div className="mt-12">
              <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <FavoritePreview />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="category/:categoryName" element={<Home />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/planner" element={<MealPlanner />} />
                  <Route path="/recipes/:slug" element={<Recipe />} />
                  <Route path="/recipes/new" element={<AdminRoute />}>
                    <Route path="" element={<CreateRecipe />} />
                  </Route>
                  <Route path="/sign-in" element={<Login />} />
                  <Route path="/sign-up" element={<Register />} />
                  <Route path="/profile" element={<ProtectedRoute />}>
                    <Route path="" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </DndProvider>
            </div>
          </div>
        </div>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
