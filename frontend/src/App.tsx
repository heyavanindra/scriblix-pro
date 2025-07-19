import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<SignUp></SignUp>}></Route>
      <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App