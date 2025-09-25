import React, { useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const TARGET_RADIUS = 100; // px
const POINT_RADIUS = 5; // px

const Target: React.FC = () => {
  const [point, setPoint] = useState<Point | null>(null);
  const [input, setInput] = useState<Point>({ x: 0, y: 0 });

  // Center of the target
  const center = { x: TARGET_RADIUS, y: TARGET_RADIUS };

  // Converts logical coordinates to SVG coordinates
  const getSvgCoords = (x: number, y: number) => ({
    cx: center.x + x,
    cy: center.y - y,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSetPoint = () => {
    setPoint({ ...input });
  };

  return (
    <div>
      <svg width={TARGET_RADIUS * 2} height={TARGET_RADIUS * 2}>
        {/* Target Circle */}
        <circle
          cx={center.x}
          cy={center.y}
          r={TARGET_RADIUS}
          fill="#eee"
          stroke="#333"
          strokeWidth={2}
        />
        {/* Point */}
        {point && (
          <circle
            {...getSvgCoords(point.x, point.y)}
            r={POINT_RADIUS}
            fill="red"
          />
        )}
      </svg>
      <div style={{ marginTop: 16 }}>
        <label>
          X:&nbsp;
          <input
            type="number"
            name="x"
            value={input.x}
            onChange={handleInputChange}
            min={-TARGET_RADIUS}
            max={TARGET_RADIUS}
          />
        </label>
        &nbsp;
        <label>
          Y:&nbsp;
          <input
            type="number"
            name="y"
            value={input.y}
            onChange={handleInputChange}
            min={-TARGET_RADIUS}
            max={TARGET_RADIUS}
          />
        </label>
        &nbsp;
        <button onClick={handleSetPoint}>Set Point</button>
      </div>
    </div>
  );
};

export default Target;