import { useGlobalState } from "../context/GlobalState.jsx";
import Chart from "./charts/Chart.jsx";
import Histories from "./Histories.jsx";

export default function Main() {
  const {configuration} = useGlobalState();

  const openForm = ()=> {
    const configData = {...configuration.configurationData};
    configData.formEnabled = true;
    configuration.setConfigurationData(configData);
  }

  return (
    <div className="main">
      <Chart/>
      <Histories/>
      <div className="newHistory" onClick={ openForm }> + </div>
    </div>
  )
}