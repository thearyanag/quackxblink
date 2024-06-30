import React from "react";

const LoginScreen: React.FC = () => {
  const createDucks = () => {
    const ducks = [];
    for (let i = 0; i < 150; i++) {
      ducks.push(
        <div
          key={i}
          className="absolute text-4xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          🦆
        </div>
      );
    }
    return ducks;
  };

  return (
    <div className="relative h-screen w-screen bg-yellow-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ducks */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {createDucks()}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative inline-block mb-4">
          <img src="/logo.png" alt="Quack Logo" className="relative z-10 w-64 h-64" />
          <div className="absolute inset-0 bg-yellow-400/5 z-0 scale-110 blur-sm"></div>
        </div>
        <h1 className="text-3xl font-bold text-yellow-800">Coming Soon</h1>
      </div>
    </div>
  );
};

export default LoginScreen;