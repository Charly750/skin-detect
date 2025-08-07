// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4 font-sans">
        <nav className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">SkinDetect</Link>
          <Link to="/classes" className="text-sm text-indigo-500 hover:underline">
            Voir les classes détectées
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
