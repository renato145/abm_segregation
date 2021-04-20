import React from "react";

interface Props {
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<Props> = ({
  title,
  className,
  min = 1,
  max = 100,
  step = 1,
  value = 50,
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <div className="group p-2 pb-3 flex flex-col bg-gray-400 bg-opacity-60 border-2 border-opacity-25 hover:border-opacity-30 border-gray-400 shadow rounded">
        {title !== undefined ? (
          <p className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
            {title}
          </p>
        ) : null}
        <input
          className="mt-2.5 slider appearance-none outline-none w-full h-1.5 hover:bg-green-50 focus:ring ring-green-600 ring-opacity-50 rounded-full shadow-md"
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={value}
          onChange={({ target }) => onChange(+target.value)}
        />
      </div>
    </div>
  );
};