import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./App.css";
import tInit from "./threescript/threeMain";
import Manager from "./UIcompoments/Manager";

function App() {
  const container = useRef<HTMLDivElement>(null);
  const [update, setUpdate] = useState(0);
  const threeSet = useRef<ReturnType<typeof tInit> | null>(null);
  useEffect(() => {
    if (container.current && !threeSet.current) {
      threeSet.current = tInit(container.current, {
        tileUrl: "/terra_b3dms/tileset.json",
        tileCenter: [114.1228453832, 30.4627878417, 12],
        camProj: "perspective",
        emulator: true,
        fps: true,
      });
      setUpdate(Math.random());
    }
    console.log("start");
    return () => {
      console.log(threeSet.current, "stop");
    };
  }, []);

  return (
    <div className="App">
      <div ref={container} className="App"></div>

      <div className="UI">
        {/* <Manager
          onChangeRoadInfo={threeSet.current?.handlers.onChangeRoadinfo!}
        ></Manager> */}
      </div>
    </div>
  );
}

export default App;
