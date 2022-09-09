import React, { useEffect, useState } from "react";
import road from "../crossGen/road";

export default function Manager(props: {
  onChangeRoadInfo(data: { width: number; angle: number }[]): void;
}) {
  let [roadCount, setRoadCount] = useState(4);
  let [roadInfo, setRoadInfo] = useState<{ width: number; angle: number }[]>([
    { width: 1.4, angle: 10 },
    { width: 1.4, angle: 110 },
    { width: 1.5, angle: 190 },
    { width: 1.5, angle: 290 },
  ]);

  useEffect(() => {
    let newRoadInfo = roadInfo;
    if (roadInfo.length > roadCount) {
      newRoadInfo = roadInfo.slice(0, roadCount);
    } else if (roadInfo.length < roadCount) {
      newRoadInfo.push(
        ...new Array(roadCount - roadInfo.length)
          .fill(0)
          .map((v, i) => ({ width: 1.2, angle: 30 * (i + roadInfo.length) }))
      );
    }

    setRoadInfo(newRoadInfo);
  }, [roadCount]);

  useEffect(() => {}, [roadInfo]);

  function roadInfoHandler(
    index: number,
    type: "width" | "angle",
    value: number
  ) {
    roadInfo[index][type] = value;
    props.onChangeRoadInfo && props.onChangeRoadInfo(roadInfo);
    setRoadInfo([...roadInfo]);
  }

  return (
    <div>
      (<label>道路数量</label>
      <input
        value={roadCount}
        min={0}
        max={10}
        onInput={(event) => setRoadCount(+event.currentTarget.value)}
        type={"number"}
      ></input>
      )
      {roadInfo.map((v, i) => (
        <div key={i}>
          <div>
            (<label>宽度</label>
            <input
              value={v["width"]}
              min={0}
              max={50}
              step={0.1}
              onInput={(event) =>
                roadInfoHandler(i, "width", +event.currentTarget.value)
              }
              type={"number"}
            ></input>
            )
          </div>
          <div>
            <label>角度</label>
            <input
              value={v["angle"]}
              min={0}
              max={360}
              onInput={(event) =>
                roadInfoHandler(i, "angle", +event.currentTarget.value)
              }
              type={"number"}
            ></input>
          </div>
        </div>
      ))}
    </div>
  );
}
