"use client";

import Rive, {
  useRive,
  useStateMachineInput,
  RiveEventType,
  EventType,
} from "@rive-app/react-canvas";
import { useEffect } from "react";

export default function Stage() {
  const { rive, RiveComponent } = useRive({
    src: "/beavers.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    artboard: "beaversInTheWild",
  });

  const playSound = (soundName: string) => {
    try {
      console.log("PLAYING");
      const audio = new Audio(`/${soundName}`);
      // LOOP LOGIC
      // audio.addEventListener(
      //   "ended",
      //   function () {
      //     this.currentTime = 0;
      //     this.play();
      //   },
      //   false
      // );
      audio && audio.play();
    } catch (err) {
      console.log("ERROR PLAYING MUSIC: ", err);
    }
  };

  // useEffect(() => {
  //   playSound("jazz_happy.mp3");
  // }, []);

  const onRiveEventReceived = (riveEvent: any) => {
    // console.log('EVENT:')
    const eventData = riveEvent.data;
    const eventProperties = eventData.properties;
    if (eventData.type === RiveEventType.General) {
      console.log("Event name", eventData.name);
      if (eventData.name === "gameStarted") {
        playSound("jazz_happy.mp3");
      }
      // playSound(eventData.name);
      // Added relevant metadata from the event
      // console.log("Rating", eventProperties.rating);
      // console.log("Message", eventProperties.message);
    } else if (eventData.type === RiveEventType.OpenUrl) {
      console.log("Event name", eventData.name);
      // Handle OpenUrl event manually
      window.location.href = eventData.url;
    }
  };

  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
    }
  }, [rive]);

  return (
    <div className="bg-[#254562] h-[100vh]">
      <RiveComponent className="h-[100vh] w-[100vw]" />
    </div>
  );
}
