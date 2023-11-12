import * as React from "react";
import { Settings } from "../utils";

const { AcceptedMeasurements } = Settings;

const css = `
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal div {
  padding: 20px 0;
}

.modal .Title {
  width: 100%;
  flex-grow: 1;

  font-size: var(--font-ui-larger);
  font-weight: var(--font-bold);
}

.modal .Input {
  width: 100%;
  flex-grow: 4;

  display: flex;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
}

.modal .Input button {
  flex-grow: 2;
}

.modal .Input .number {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly
}

.modal .Button {
  width: 100%;
  flex-grow: 1;
}

.modal .Button .Add {
  width: 100%;
}

`;

export const ModalComponent = (props) => {
  let [amount, cAmount] = React.useState(props.settings.AutoConsumptionAmount);
  let [meas, cMeas] = React.useState(Settings.DefaultSettings.Measurement.full);

  React.useEffect(() => console.log(amount, meas), [amount]);

  const UpdateAmount = (op) => cAmount(Math.abs(eval(`${amount} ${op} 1`)));

  const Submit = () => {
    props.submit(amount, AcceptedMeasurements[meas]);
    props.modal?.close();
  };

  return (
    <>
      <style>{css}</style>
      <div className="Title">Add Water Consumption</div>
      <div className="Input">
        <button className="Less" onClick={() => UpdateAmount("-")}>
          -
        </button>
        <div className="number">
          <input
            className="Amount"
            type="number"
            min={0}
            max={999}
            value={amount}
            onChange={(e) => cAmount(e.target.value)}
          />
          <select
            name="measurement"
            id="mmt"
            value={meas.full}
            onChange={(e) => cMeas(e.target.selectedOptions[0].value)}
          >
            {Object.keys(AcceptedMeasurements).map((mm) => (
              <option value={mm} key={mm}>
                {AcceptedMeasurements[mm].measurement}
              </option>
            ))}
          </select>
        </div>
        <button className="More" onClick={() => UpdateAmount("+")}>
          +
        </button>
      </div>
      <div className="Button">
        <button className="Add" onClick={Submit}>
          Add
        </button>
      </div>
    </>
  );
};
