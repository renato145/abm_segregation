import React from "react";

interface Props {
  title?: string;
  showValue?: number;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<Props> = ({
  title,
  showValue,
  className,
  min = 1,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <div className="group p-2 pb-3 flex flex-col bg-gray-400 bg-opacity-60 border-2 border-opacity-25 hover:border-opacity-30 border-gray-400 shadow rounded">
        {title !== undefined ? (
          <p className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
            {title}{" "}
            {showValue !== undefined ? (
              <span className="opacity-0 group-hover:opacity-100">
                ({showValue})
              </span>
            ) : null}
          </p>
        ) : null}
        <input
          className="mt-2.5 slider appearance-none outline-none w-full h-1.5 hover:bg-green-50 focus:ring ring-green-600 ring-opacity-50 rounded-full shadow-md"
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onChange={({ target }) => onChange(+target.value)}
        />
      </div>
    </div>
  );
};
