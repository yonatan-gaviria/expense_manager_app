import { useGlobalState } from "../context/GlobalState.jsx";
import History from "./History.jsx";

export default function Histories() {
  const { histories, configuration } = useGlobalState();

  const openForm = (e)=> {
    e.stopPropagation();
    const configData = { ...configuration.configurationData };
    configData.formEnabled = true;
    configData.onEdit = false;
    configuration.setConfigurationData(configData);
  }

  return (
    <fieldset className="histories">
      <legend>Record</legend>
      <div className="newHistory" onClick={ (e)=>openForm(e) }> Add a new history </div>
      { histories.histories.map(
        (history)=> {
          return (
            <History 
              key={ history.id }
              data={ history }
            />
          )
        }
      ) }
    </fieldset>
  )
}