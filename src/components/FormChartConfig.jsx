import { useState } from "react";
import { useGlobalState } from "../context/GlobalState";

export default function FormChartConfig() {
  const { configuration } = useGlobalState();
  const [state, setState] = useState(configuration.configurationData.chartConfig);

  const updateState = (element, value)=> {
    const configurationCopy = {...configuration.configurationData}
    const stateCopy = { ...state };
    stateCopy[element] = value;
    configurationCopy.chartConfig = stateCopy;

    setState(stateCopy);
    configuration.setConfigurationData(configurationCopy);
  }

  const updateDateState = (object, value)=> {
    const configurationCopy = {...configuration.configurationData};

    const dateArray = value.split("-");
    
    configurationCopy.chartConfig[object].year = Number(dateArray[0]);
    configurationCopy.chartConfig[object].month = Number(dateArray[1]);
    configurationCopy.chartConfig[object].day = Number(dateArray[2]);

    configuration.setConfigurationData(configurationCopy);
  }


  const dateNumberToString = (object)=> {
    const newDate = {
      year: 0,
      month: 0,
      day: 0,
    }

    if(object === "today") {
      const today = {
        month: Number(new Date().getMonth()) + 1,
        day: Number(new Date().getDate()),
      };
      
      newDate.year = new Date().getFullYear();
      newDate.month = today.month < 10 ? `0${ today.month }` : `${ today.month }`;
      newDate.day = today.day < 10 ? `0${ today.day }` : `${ today.day }`;
    } else {
      const stateCopy = { ...state };

      newDate.year = `${ stateCopy[object].year }`;
      newDate.month = stateCopy[object].month < 10 ? `0${ stateCopy[object].month }` : `${ stateCopy[object].month }`;
      newDate.day = stateCopy[object].day < 10 ? `0${ stateCopy[object].day }` : `${ stateCopy[object].day }`;
    }
    
    return (`${newDate.year}-${newDate.month}-${newDate.day}`);
  }

  return (
    <div className="selectsContainer">
      <div className="chartSelector">
        <label>
          Chart
          <select className="chartType" onChange={ (e)=> updateState("chartType", e.target.value) } value={ state.chartType }>
            <option>bar</option>
            <option>line</option>
            <option>pie</option>
          </select>
        </label>
      </div>

      <div className="dataSelector">
        <label>
          Transaction
          <select className="dataType" onChange={ (e)=> updateState("dataType", e.target.value) } value={ state.dataType }>
            <option>expense</option>
            <option>income</option>
            <option>income-expense</option>
          </select>
        </label>
      </div>

      <hr></hr>

      <div>
        <label>Date range
          <div>
            From
            <input 
              type="date" 
              defaultValue={ dateNumberToString("minDate") } 
              min="2000-01-01"
              max={ dateNumberToString("today") }
              onChange={ (e)=> updateDateState("minDate", e.target.value) }
            />
          </div>
          <div>
            To
            <input 
              type="date" 
              defaultValue={ dateNumberToString("maxDate") } 
              min={ dateNumberToString("minDate") }
              max={ dateNumberToString("today") }
              onChange={ (e)=> updateDateState("maxDate", e.target.value) }
            />
          </div>
        </label>
      </div>
    </div>
  )
}