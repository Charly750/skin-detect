// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";

function App() {
  return (
    <Router>
      {/* flex-col pour empiler nav, contenu et footer */}
      <div className="flex flex-col min-h-screen bg-gray-100 p-4 font-sans">
        
        {/* Navigation */}
<nav className="mb-6 bg-gray-200 shadow-lg">
  <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
    <Link
      to="/"
      className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent hover:from-indigo-300 hover:to-blue-400 transition"
    >
      SkinDetect
    </Link>

    <img
      src="/logo512.png"
      alt="SkinDetect Logo"
      className="w-10 h-10 object-contain"
    />

    <Link
      to="/classes"
      className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent hover:from-indigo-300 hover:to-blue-400 transition"
    >
      Les classes   </Link>
  </div>
</nav>


        {/* Contenu */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
          </Routes>
        </div>

        {/* Footer collé en bas */}
        <footer className="mt-auto bg-gray-200 rounded-xl shadow-inner px-6 py-4 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} SkinDetect — Développé à titre expérimental.
          </p>
          <p className="mt-1">
            Les résultats fournis ne remplacent pas un avis médical professionnel.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
