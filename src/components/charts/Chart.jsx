import { VictoryLabe, VictoryPie, VictoryLine, VictoryChart, VictoryBar} from "victory";
import { useGlobalState } from "../../context/GlobalState";

function Chart() {
  const { informationData } = useGlobalState();
  const incomePercentage = informationData.totalIncomePercentage;
  const expensesPercentage = informationData.totalExpensesPercentage;
  let colors = null;

  if (informationData.totalIncome !== 0) {
    colors = ["#0F9D58", "#DB4437"];
  }

  return (
    <div className="chart">
      <VictoryPie
        colorScale = { informationData.totalIncome === 0 ? null : ["#0F9D58", "#DB4437"] }
        data = {[
          { x: "income", y: incomePercentage },
          { x: "expenses", y: expensesPercentage }
        ]}
        animate={true}
      />
    </div>
  )
}

export default Chart;