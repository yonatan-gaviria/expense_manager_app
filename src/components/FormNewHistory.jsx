import { useState } from "react";
import { useGlobalState } from "../context/GlobalState"

export default function FormNewHistory() {
  const {histories, informationData, configuration} = useGlobalState();
  const [categories, setCategories] = useState(informationData.categories.expense.categories);
  const [data, setData] = useState({
    amount: 0,
    description: "Without description...",
    transactionType: "expense",
    category: categories[0],
    date: ""
  });

  const addNewData = (valueType, value)=> {
    const dataCopy = data;
    dataCopy[valueType] = value;

    if(valueType === "transactionType") {
      dataCopy.category = informationData.categories[value].categories[0];
      setCategories(informationData.categories[value].categories);
    }

    setData(dataCopy);
  }

  const addNewHistory = (e)=> {
    e.preventDefault();
    let newHistories = histories.histories;
    const newHistory = {
      amount: data.amount,
      description: data.description,
      transactionType: data.transactionType,
      category: data.category,
      date: new Date()
    }

    const newConfiguration = {...configuration.configurationData};
    newConfiguration.formEnabled = false;
    configuration.setConfigurationData(newConfiguration);
    
    newHistories = [newHistory, ...newHistories];

    histories.setHistories(newHistories);
  }

  const closeForm = (e)=> {
    e.preventDefault();
    const newConfiguration = {...configuration.configurationData};
    
    newConfiguration.formEnabled = false;
    configuration.setConfigurationData(newConfiguration);
  }

  return (
    <div className="formNewHistory">
      <form className="transactionForm">
        <fieldset className="amount">
          <legend>Amount</legend>
          <input type="number" onChange={ (e)=> addNewData("amount", Math.abs(Number(e.target.value))) } />
        </fieldset>

        <fieldset className="description">
          <legend>Description</legend>
          <input type="text" onChange={ (e)=> addNewData("description", e.target.value) } />
        </fieldset>

        <fieldset className="transactionType" onChange={ (e)=> addNewData("transactionType", e.target.value) }>
          <legend>Transaction type</legend>
          <label>
            <input type="radio" name="transactionType" value="income" /> 
            Income 
          </label>

          <label>
            <input type="radio" name="transactionType" value="expense" defaultChecked/> 
            Expense 
          </label>
        </fieldset>

        <fieldset className="category">
          <legend>Category</legend>
          <select name="category" onChange={ (e)=> addNewData("category", e.target.value) }>
            {categories.map((category, index)=> {
              return (
                <option key={index}> {category} </option>
              )
            })}
          </select>
        </fieldset>

        <div className="formButtonContainer">
          <button onClick={addNewHistory}> Add </button>
          <button onClick={closeForm}> Cancel </button>
        </div>
      </form>
    </div>
  )
}