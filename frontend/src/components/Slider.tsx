import React from "react";

interface Props {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<Props> = ({
  className,
  min = 1,
  max = 100,
  step = 1,
  value = 50,
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <input
        className="slider appearance-none outline-none w-full h-1.5 hover:bg-green-50 focus:ring ring-green-600 ring-opacity-50 rounded-full shadow-md"
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onChange={({ target }) => onChange(+target.value)}
      />
    </div>
  );
};
