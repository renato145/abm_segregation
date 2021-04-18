import React from "react";
import { BaseCanvas } from "./components/BaseCanvas";

export const App = () => {
  return (
    <div className="h-screen w-screen p-10 bg-gray-700">
      <p className="font-bold text-xl text-gray-200">Show character try:</p>
      <BaseCanvas />
    </div>
  );
};
