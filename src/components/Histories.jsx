import { useGlobalState } from "../context/GlobalState.jsx";
import History from "./History.jsx";

export default function Histories() {
  const {histories} = useGlobalState();
  const newHistories = histories.histories;

  return (
    <fieldset className="histories">
      <legend>Histories</legend>
      {newHistories.map(
        (history)=> {
          return (
            <History 
              key={history.id}
              amount={history.amount}
              description={history.description}
            />
          )
        }
      )}
    </fieldset>
  )
}