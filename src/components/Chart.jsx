import { VictoryPie } from "victory";
import { useGlobalState } from "../context/GlobalState";
import FormChartConfig from "./FormChartConfig.jsx";
import { Icons } from "../Icons.js";

export default function Chart() {
  const {histories, informationData, configuration} = useGlobalState();

  const chartConfigCopy = {...configuration.configurationData.chartConfig};
  const historiesCopy = [...histories.histories];

  let chartData = {
    data: [],
    colors: [],
  };

  const filterByDataType = (data)=> {
    const historiesByType = chartConfigCopy.dataType === "income-expense" ? 
    data :
    data.filter((history)=> {
      return(history.transactionType === chartConfigCopy.dataType);
    })

    return(historiesByType);
  }

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

  const getHistories = ()=> {
    const filteredHistories = filterByDate(historiesCopy);
    const filteredData = filterByDataType(filteredHistories);

    if(filteredData.length !== 0) {
      if(chartConfigCopy.dataType === "income-expense") {
        let totalIncome = 0;
        let totalExpenses = 0;
        let incomePercentage = 0;
        let expensesPercentage = 0;
  
        filteredData.forEach(
          (history)=> {
            if(history.transactionType === "expense") {
              totalExpenses += history.amount;
            } else {
              totalIncome += history.amount;
            }
          }
        );
  
        incomePercentage = totalIncome === 0 ? 0 : ((totalIncome - totalExpenses) / totalIncome) * 100;
        expensesPercentage = 100 - incomePercentage;
  
        chartData = {
          data: [
            { x: "income", y: incomePercentage, label: `${ incomePercentage.toFixed(2) }%` },
            { x: "expenses", y: expensesPercentage, label: `${ expensesPercentage.toFixed(2) }%` },
          ],
          colors: ["#0F9D58aa", "#db4537aa"],
        };
      } else {
        const categoriesCopy = informationData.categories[chartConfigCopy.dataType].categories;
        const colorCopy = informationData.categories[chartConfigCopy.dataType].colors;
  
        let totalAmount = 0;
        const categories = [];
        const colors = [];
        const newData = [];
        
        filteredData.forEach((history)=> {
          totalAmount += history.amount;
  
          const index = categories.findIndex((element)=> element.category === history.category);
          if(index === -1) {
            categories.push({ category: history.category, amount: history.amount });
          } else {
            categories[index].amount += history.amount;
          }
        });
      
        categories.forEach((category)=> {
          const indexColor = categoriesCopy.findIndex((categoryCopy)=> categoryCopy === category.category);
          colors.push(colorCopy[indexColor]);
      
          const categoryPercentage = (category.amount / totalAmount) * 100;
          newData.push({ x: category.category, y: categoryPercentage, label: `${ categoryPercentage.toFixed(2) }%` });
        });
  
        chartData = {
          data: newData,
          colors: colors,
        };
      }
    }
  }

  const mostrar = (valor)=> {
    alert(valor)
  }

  const showChart = ()=> {
    getHistories();

    if(chartData.data.length === 0) {
      return(
        <div className="noChartData">
          No data in this range
        </div>
      );
    } else {
      return(
        <VictoryPie
          padAngle={ 2 }
          innerRadius={ 80 }
          labelRadius={ 85 }
          labelPlacement={ "parallel" } //"vertical"
          style={ { labels: { fill: "white", fontSize: 15, fontWeight: "bold" } } }
          events={[{
            target: "labels",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    mutation: ({ datum }) => {
                      return mostrar(datum.y);
                    }
                  }
                ]
              }
            }
          }]}
          colorScale={ chartData.colors }
          data={ chartData.data }
        />
      )
    }
  }

  const openChartForm = ()=> {
    const configData = { ...configuration.configurationData };
    configData.formChartEnabled = !configData.formChartEnabled;
    configuration.setConfigurationData(configData);
  }

  return (
    <div className="chart">
      <div className="chartConfigInfo">
        <div className="chartConfigIcon">
          <img className="configImg" src={ Icons.Configuration } alt="configIcon" onClick={ openChartForm }/>
          { configuration.configurationData.formChartEnabled ? <FormChartConfig/> : null }
        </div>
        <div className="infoDataType">{ configuration.configurationData.chartConfig.dataType }</div>
      </div>

      { showChart() }

    </div>
  );
}