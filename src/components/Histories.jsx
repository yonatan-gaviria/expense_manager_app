import { useGlobalState } from "../context/GlobalState.jsx";
import History from "./History.jsx";

export default function Histories() {
  const {histories} = useGlobalState();
  const newHistories = histories.histories;

  return (
    <div className="histories">
      {newHistories.map(
        (history)=> {
          return (
            <History 
              key={crypto.randomUUID()}
              amount={history.amount}
              description={history.description}
            />
          )
        }
      )}
    </div>
  )
}