"use client";

import Rive from "@rive-app/react-canvas";

export default function Stage() {
  return (
    <div className="bg-white h-[100vh]">
      <Rive className="h-[100vh] w-[100vw]" artboard="ball2" src="/ball.riv" />
    </div>
  );
}
