import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register"

function App() {
  return (
    <Routes>
      <Route index element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/homePage" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
