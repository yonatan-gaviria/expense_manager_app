import { VictoryPie } from "victory";
import { useGlobalState } from "../../context/GlobalState";

export default function IncomeCategoriesChart() {
  let totalIncomeAmount = 0;
  const { histories, informationData } = useGlobalState();
  const incomeCategoriesCopy = informationData.categories.income.categories;
  const colorCopy = informationData.categories.income.colors;
  const chartData = {
    data: [],
    categories: [],
    colors: []
  };
  
  histories.histories.map((history)=> {
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

  chartData.categories.map((category)=> {
    const indexColor = incomeCategoriesCopy.findIndex((categoryCopy)=> categoryCopy === category.category);
    chartData.colors.push(colorCopy[indexColor])

    const categoryPercentage = (category.amount / totalIncomeAmount) * 100;
    chartData.data.push({ x: category.category, y: categoryPercentage, label: `${ categoryPercentage.toFixed(2) }%` });
  });


  return (
    <VictoryPie
      colorScale = { chartData.colors }
      data = { chartData.data }
      animate = { { duration: 1000 } }
      innerRadius={ ({radius})=> radius / 2 }
      labelRadius = { ({ radius, innerRadius }) => (radius - (radius / 2)) + 5 }
      labelPlacement = { "parallel" }
      style = { { labels: { fill: "white", fontSize: 15, fontWeight: "bold" } } }
    />
  );
}