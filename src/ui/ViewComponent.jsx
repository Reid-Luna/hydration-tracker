import * as React from "react";
import { Status, Conversion, Settings } from "../utils";
import { setIcon } from "obsidian";

const css = `
.view {
  height: 100%;
  width: 100%;
  background-color: var(--color-base-10);
}

.container {
  height: 100%;
  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
}

.intake-graph {
  height: 200px;
  width: 200px;
  background: conic-gradient(var(--color-blue) 5deg, var(--color-base-100) 0.1deg);
  border-radius: 50%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.intake-graph::before {
  content: "";
  position: absolute;
  height: 190px;
  width: 190px;
  background-color: var(--color-base-05);
  border-radius: 50%;
}

.intake-graph .text {
  z-index: 1000;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.intake-graph .text .amount {
  font-weight: var(--font-bold);
  font-size: 70px;
  flex: 4;
}

.intake-graph .text .amount small {
  font-weight: var(--font-light);
  font-size: var(--font-ui-medium);
}

.intake-graph .text .goal {
  font-weight: var(--font-extralight);
  font-size: var(--font-ui-small);
  flex: 1;
}
`;

export const ViewComponent = (props) => {
  const [log, cLog] = React.useState(props.log);
  const [total, cTotal] = React.useState(0);
  props.view.setViewData = (data, clear) => cLog(data);

  React.useEffect(() => {
    const [o, l, p] = Status.getTotalsDirectly(log);

    let ntotal = Number(o) + Conversion.LToOz(l) + Conversion.PToOz(p);
    cTotal(ntotal);
  }, [log]);

  return (
    <div className="view">
      <style>{css}</style>
      <div className="container">
        <div
          className="intake-graph"
          style={{
            background: `conic-gradient(var(--color-blue) ${
              (total / Settings.DefaultSettings.Goal) * 360
            }deg, var(--color-base-100) 0.1deg)`,
          }}
        >
          <div className="text">
            <div className="amount">
              {total}
              <small>oz</small>
            </div>
          </div>
        </div>

        <div className="message">
          You have drank {total} ounces of your {Settings.DefaultSettings.Goal}{" "}
          ounce goal. Keep going!
        </div>

        <div className="note" id="note">
          press{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="svg-icon lucide-edit-3"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>{" "}
          to edit the log manually.
        </div>
      </div>
    </div>
  );
};
