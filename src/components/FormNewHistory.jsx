import { useState } from "react";
import { useGlobalState } from "../context/GlobalState"
export default function FormNewHistory() {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const {histories, configuration} = useGlobalState();

  const addNewHistory = (e)=> {
    e.preventDefault();
    let newHistories = histories.histories;
    newHistories = [...newHistories, {amount: amount, description: description}];
    histories.setHistories(newHistories);
    configuration.setConfigurationData({formEnabled: false});
  }

  return (
    <div className="formNewHistory">
      <form className="transactionForm">
        <div className="amount">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" onChange={(e)=> setAmount(Number(e.target.value))}/>
        </div>

        <div className="description">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={(e)=> setDescription(e.target.value)}/>
        </div>

        <button onClick={addNewHistory}> create history </button>
      </form>
    </div>
  )
}