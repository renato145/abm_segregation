import React from "react";
import { BaseCanvas } from "./components/BaseCanvas";
import { Description } from "./components/Description";

export const App = () => {
  return (
    <div className="min-h-screen w-screen p-4">
      <div className="flex h-full">
        <Description className="w-1/3 bg-gray-200 rounded-lg" />
        {/* <BaseCanvas className="ml-2 flex-1 miin-h-screen bg-gray-900" /> */}
      </div>
    </div>
  );
};
