import { useGlobalState } from "../context/GlobalState.jsx";
import History from "./History.jsx";

export default function Histories() {
  const {histories} = useGlobalState();

  return (
    <fieldset className="histories">
      <legend>Histories</legend>
      {histories.histories.map(
        (history)=> {
          return (
            <History 
              key={history.date}
              amount={history.amount}
              description={history.description}
            />
          )
        }
      )}
    </fieldset>
  )
}