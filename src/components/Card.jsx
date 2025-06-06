import React from "react";

export function Card({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}