import { VictoryLabe, VictoryPie, VictoryLine, VictoryChart, VictoryBar} from "victory";

function Chart() {
  return (
    <div className="chart">
      <VictoryPie
        colorScale={["#e74c3c", "#2ecc71", "#281245"]}
        data={[
          { x: "Cats", y: 35},
          { x: "Dogs", y: 40},
          { x: "Birds", y: 55}
        ]}
        animate={true}
        /* labelComponent={[]} */
      />
    </div>
  )
}

export default Chart;