import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

export default function App() {
  return (
    <main className="w-[100vw] h-[100vh] bg-slate-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
