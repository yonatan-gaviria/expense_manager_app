import IncomeCategoriesChart from "./charts/IncomeCategoriesChart.jsx";

import { useGlobalState } from "../context/GlobalState.jsx";

export default function ChartsContainer() {
  const { histories } = useGlobalState();

  return (
    <fieldset className="chartsContainer">
      <legend>Charts</legend>
      
      {histories.histories.length === 0 ?
        <div>No data yet...</div> :
        <div className="chart">
          <IncomeCategoriesChart/>
        </div>
      }
    </fieldset>
  )
}