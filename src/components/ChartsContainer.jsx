import Chart from "./Chart.jsx";

import { useGlobalState } from "../context/GlobalState.jsx";

export default function ChartsContainer() {
  const { histories } = useGlobalState();

  return (
    <fieldset className="chartsContainer">
      <legend>Chart</legend>
      { histories.histories.length === 0 ? <div>No data yet...</div> : <Chart/> }
    </fieldset>
  )
}