import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/tasks" element={<Tasks isCollapsed={isCollapsed} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
