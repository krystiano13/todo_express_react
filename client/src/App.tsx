import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";

//views
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

//components
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <main className="w-[100vw] h-[100vh] bg-slate-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </UserContextProvider>
    </BrowserRouter>
  );
}
