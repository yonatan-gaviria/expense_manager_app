import { useGlobalState } from "./context/GlobalState.jsx";
import InfoHeader from "./components/InfoHeader.jsx";
import Main from "./components/Main.jsx";
import FormNewHistory from "./components/FormNewHistory.jsx";

import "./App.css";

function App() {
  const {configuration} = useGlobalState();
  return (
    <div className="App">
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
