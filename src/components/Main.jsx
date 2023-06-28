import { useGlobalState } from "../context/GlobalState.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
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
      <ChartsContainer/>
      <Histories/>
      <div className="newHistory" onClick={ openForm }> + </div>
    </div>
  )
}