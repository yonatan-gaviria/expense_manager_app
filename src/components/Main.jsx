import { useGlobalState } from "../context/GlobalState.jsx";
import Chart from "./Chart.jsx";
import Histories from "./Histories.jsx";

export default function Main() {
  const {configuration} = useGlobalState();

  return (
    <div className="main">
      <Chart/>
      <Histories/>
      <div className="newHistory" onClick={()=> configuration.setConfigurationData({formEnabled: true})}> + </div>
    </div>
  )
}