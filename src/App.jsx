import React from "react";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-400 to-white flex flex-col items-center p-6">
      <div className=" bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 ">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-6 animate-fade-in">
        Weather Forecast App🌤️
      </h1>
      <Weather />
      </div>
    </div>
  );
}

export default App;