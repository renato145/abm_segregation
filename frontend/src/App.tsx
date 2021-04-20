import React from "react";
import { BaseCanvas } from "./components/BaseCanvas";
import { Description } from "./components/Description";

export const App = () => {
  return (
    <div className="h-screen w-screen p-4">
      <div className="flex h-full">
        <Description className="w-1/4 bg-gray-200 rounded-lg" />
        <BaseCanvas className="ml-2 flex-1 bg-gray-900" />
      </div>
    </div>
  );
};
