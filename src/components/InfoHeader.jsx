import { useGlobalState } from "../context/GlobalState.jsx";

export default function InfoHeader() {
  const { histories } = useGlobalState();
  
  let balance = 0;
  let newIncome = 0;
  let newExpenses = 0;

  histories.histories.forEach(
    (history)=> {
      if(history.transactionType === "expense") {
        newExpenses = newExpenses + history.amount;
      } else {
        newIncome = newIncome + history.amount;
      }
    }
  );
  balance = newIncome - newExpenses;

  return (
    <div className="infoHeader">
      Balance: ${ balance }
    </div>
  )
}