import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import "./App.css";
import { laneForward } from "./crossGen/lane";
import tInit from "./threescript/threeMain";
import Manager from "./UIcompoments/Manager";

function App() {
  const container = useRef<HTMLDivElement>(null);
  const [update, setUpdate] = useState(0);
  const threeSet = useRef<ReturnType<typeof tInit> | null>(null);
  useEffect(() => {
    if (container.current && !threeSet.current) {
      threeSet.current = tInit(container.current, {
        camProj: "perspective",
        emulator: true,
        fps: true,
      });
      threeSet.current?.handlers.onChangeRoadinfo({
        tileUrl: "/terra_b3dms/tileset.json",
        walkCrossWidth: 0.6,
        cameraPos: new Vector3(0, 10, 0),
        cameraLookAt: new Vector3(0, -9, 0),
        rightLaneType: "divided",
        turnerWidth: 0.75,
        turnerLaneWidth: 0.3,
        turnerOffset: 5,

        islandOffset: 0.5,
        roadStartOffset: -0.03,
        roads: [
          {
            direction: new Vector3(-0.9040036576791641, 0, 0.4275247208088586),
            lanes: [
              {
                signType: laneForward.turnerAway,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.31,
              },

              {
                signType: laneForward.away,
                width: 0.31,
              },
              {
                signType: laneForward.away,
                width: 0.31,
              },
              {
                signType: laneForward.gelidai,
                width: 0.27,
                startOffset: 1.3,
              },
              {
                signType: laneForward.zuozhuan,
                width: 0.31,
              },

              {
                signType: laneForward.zhixing,
                width: 0.31,
              },
              {
                signType: laneForward.zhixing,
                width: 0.31,
              },
              {
                signType: laneForward.turnerRight,
                width: 0.3,
              },
            ],
          },
          {
            direction: new Vector3(0.5299863272000847, 0, 0.8480061868765845),
            lanes: [
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.zuozhuan,
                width: 0.3,
              },
              {
                signType: laneForward.zhixing,
                width: 0.3,
              },
              {
                signType: laneForward.zhixing,
                width: 0.3,
              },
            ],
          },
          {
            direction: new Vector3(0.9040036576791641, 0, -0.4275247208088586),
            lanes: [
              {
                signType: laneForward.turnerAway,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.31,
              },
              {
                signType: laneForward.away,
                width: 0.31,
              },
              {
                signType: laneForward.away,
                width: 0.31,
              },
              {
                signType: laneForward.gelidai,
                width: 0.27,
                startOffset: 1.0,
              },
              {
                signType: laneForward.zuozhuan,
                width: 0.31,
              },
              {
                signType: laneForward.zhixing,
                width: 0.31,
              },
              {
                signType: laneForward.zhixing,
                width: 0.31,
              },
              {
                signType: laneForward.turnerRight,
                width: 0.3,
              },
            ],
          },
          {
            direction: new Vector3(-0.5299863272000847, 0, -0.8480061868765845),
            lanes: [
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.away,
                width: 0.3,
              },
              {
                signType: laneForward.zuozhuan,
                width: 0.3,
              },
              {
                signType: laneForward.zhixing,
                width: 0.3,
              },
              {
                signType: laneForward.zhixing,
                width: 0.3,
              },
            ],
          },
        ],
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
