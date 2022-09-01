import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./App.css";
import tInit from "./threescript/threeMain";

function App() {
  const container = useRef<HTMLDivElement>(null);
  const threeSet = useRef<ReturnType<typeof tInit> | null>(null);
  useEffect(() => {
    if (container.current) {
      threeSet.current = tInit(container.current);
    }
    console.log("start");
    return () => {
      console.log(threeSet.current, "stop");
    };
  }, []);

  return <div ref={container} className="App"></div>;
}

export default App;
