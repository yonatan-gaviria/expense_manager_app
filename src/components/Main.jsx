import { useGlobalState } from "../context/GlobalState.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import Histories from "./Histories.jsx";

export default function Main() {
  const { configuration } = useGlobalState();

  const openForm = (e)=> {
    e.stopPropagation();
    const configData = { ...configuration.configurationData };
    configData.formEnabled = true;
    configData.onEdit = false;
    configuration.setConfigurationData(configData);
  }

  return (
    <div className="main">
      <ChartsContainer/>
      <Histories/>
      <div className="newHistory" onClick={ (e)=>openForm(e) }> + </div>
    </div>
  )
}