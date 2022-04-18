import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Search from "./components/Search"
function App() {
  return (
    <>
      <Sidebar />
      <div className="bg-body ml-[270px] min-h-screen p-10">
        <div className="max-w-[1280px] mx-auto">
          <Search />
          <Home />
        </div>
      </div>
    </>
  )
}

export default App
