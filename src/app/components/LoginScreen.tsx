import React from "react";

interface LoginScreenProps {
  onGoogleLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGoogleLogin }) => {
  const createDiagonalDucks = () => {
    const ducks = [];
    for (let i = -5; i < 20; i++) {
      ducks.push(
        <div
          key={i}
          className="absolute whitespace-nowrap text-2xl"
          style={{
            top: `${i * 10}%`,
            left: `-10%`,
            transform: "rotate(-45deg)",
            width: "150%",
          }}
        >
          {"🦆".repeat(20)}
        </div>
      );
    }
    return ducks;
  };

  return (
    <div className="relative h-screen w-screen bg-yellow-100 flex items-center justify-center overflow-hidden">
      {/* Background ducks */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {createDiagonalDucks()}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-80 p-8 rounded-lg bg-yellow">
        <div className="relative inline-block">
          <img src="/logo.png" alt="Quack Logo" className="relative z-10" />
          <div className="absolute inset-0 bg-yellow-400/5 z-0 scale-10 blur-sm"></div>
        </div>
        <button
          onClick={onGoogleLogin}
          className="w-full py-2 px-4 bg-yellow-400 text-black rounded hover:bg-gray-200 transition-colors"
        >
          <strong>Login via Google</strong>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
