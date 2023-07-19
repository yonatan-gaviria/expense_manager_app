import { useGlobalState } from "./context/GlobalState.jsx";
import InfoHeader from "./components/InfoHeader.jsx";
import Main from "./components/Main.jsx";
import FormNewHistory from "./components/FormNewHistory.jsx";

import "./App.css";

function App() {
  const {configuration} = useGlobalState();

  const closeAllForms = ()=> {
    const configData = { ...configuration.configurationData };

    configData.formChartEnabled = false;
    configData.infoChart = false;

    configuration.setConfigurationData(configData);
  }

  return (
    <div className="App" onClick={ closeAllForms }>
      <InfoHeader/>
      <Main/>
      { configuration.configurationData.formEnabled ? 
        <FormNewHistory/> : 
        null 
      }
    </div>
  );
}

export default App;
