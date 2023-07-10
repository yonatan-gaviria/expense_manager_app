import { VictoryPie, VictoryLine, VictoryBar } from "victory";
import { useGlobalState } from "../context/GlobalState";
import FormChartConfig from "./FormChartConfig.jsx";
import { Icons } from "../Icons.js";

export default function Chart() {
  const {histories, informationData, configuration} = useGlobalState();

  const chartConfigCopy = {...configuration.configurationData.chartConfig};
  const historiesCopy = [...histories.histories];

  /* const incomeCategoriesCopy = informationData.categories.income.categories; */
  /* const colorCopy = informationData.categories.income.colors; */
  const chartData = {
    data: [
      { x: "Cats", y: 35 },
      { x: "Dogs", y: 40 },
      { x: "Birds", y: 55 }
    ],
    colors: []
  };

  const filterByDate = (data)=> {
    function getDateTime(year, month, day) {
      const monthDate = new Date(year, month, 0).getDate();
      const time = (year * 365) + (month * monthDate) + day;
      return (time);
    }

    const result = [];
    data.forEach((history)=> {
      const historyTime = getDateTime(history.date.year, history.date.month, history.date.day);
      const minTime = getDateTime(chartConfigCopy.minDate.year, chartConfigCopy.minDate.month, chartConfigCopy.minDate.day);
      const maxTime = getDateTime(chartConfigCopy.maxDate.year, chartConfigCopy.maxDate.month, chartConfigCopy.maxDate.day);

      if(historyTime >= minTime && historyTime <= maxTime) {
        result.push(history);
      }
    })
    return (result);
  }

  const getHistories = (type)=> {
    const historiesByType = type === "income-expense" ? 
    historiesCopy :
    historiesCopy.filter((history)=> {
      return(history.transactionType === type);
    })

    const result = filterByDate(historiesByType);
    return(result);
  }

  const chartSelector = ()=> {
    switch (chartConfigCopy.chartType) {
      case "bar":
        return(
          <VictoryBar
            colorScale={ chartData.colors }
            data={ chartData.data }
          />
        )

      case "line":
        return(
          <VictoryLine
            colorScale={ chartData.colors }
            data={ chartData.data }
          />
        )
      
      case "pie":
        return(
          <VictoryPie
            colorScale={ chartData.colors }
            data={ chartData.data }
          />
        )

      default:
        break;
    }
  }

  const openChartForm = ()=> {
    const configData = {...configuration.configurationData};
    configData.formChartEnabled = !configData.formChartEnabled;
    configuration.setConfigurationData(configData);
  }
  
  /* histories.histories.forEach((history)=> {
    if(history.transactionType === "income") {
      totalIncomeAmount += history.amount;
      const index = chartData.categories.findIndex((element)=> element.category === history.category);
      if(index === -1) {
        chartData.categories.push({ category: history.category, amount: history.amount });
      } else {
        chartData.categories[index].amount += history.amount;
      }
    }
  });

  chartData.categories.forEach((category)=> {
    const indexColor = incomeCategoriesCopy.findIndex((categoryCopy)=> categoryCopy === category.category);
    chartData.colors.push(colorCopy[indexColor])

    const categoryPercentage = (category.amount / totalIncomeAmount) * 100;
    chartData.data.push({ x: category.category, y: categoryPercentage, label: `${ categoryPercentage.toFixed(2) }%` });
  }); */

  const filteredHistories = getHistories(chartConfigCopy.dataType);

  return (
    <div className="chart">
      <div className="chartConfigInfo">
        <div className="chartConfigIcon">
          <img className="configImg" src={Icons.Configuration} alt="configIcon" onClick={openChartForm}/>
          { configuration.configurationData.formChartEnabled ? <FormChartConfig/> : null }
        </div>
        <div className="infoDataType">{ configuration.configurationData.chartConfig.dataType }</div>
      </div>

      { chartSelector() }
    </div>
  );
}