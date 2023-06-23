import { useState } from "react";
import { useGlobalState } from "../context/GlobalState"

const myCategories = {
  income: ["ingresos extra", "negocios", "pago de seguro", "prestamo", "regalos", "salario", "otros"],
  expense: ["nada", "otro nada", "que mas quiere", "talan talan", "y ya"]
}

export default function FormNewHistory() {
  const {histories, configuration} = useGlobalState();
  const [categories, setCategories] = useState(myCategories.expense);
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
      dataCopy.category = myCategories[value][0];
      setCategories(myCategories[value]);
    }

    setData(dataCopy);
  }

  const addNewHistory = (e)=> {
    e.preventDefault();
    let newHistories = histories.histories;
    const newConfiguration = configuration.configurationData;
    const newHistory = {
      id: crypto.randomUUID(),
      amount: data.amount,
      description: data.description,
      transactionType: data.transactionType,
      category: data.category,
      date: new Date()
    }
    
    newHistories = [newHistory, ...newHistories];
    console.log(newHistories)
    histories.setHistories(newHistories);
    newConfiguration.formEnabled = false;
    /* configuration.setConfigurationData(newConfiguration); */
  }

  return (
    <div className="formNewHistory">
      <form className="transactionForm">
        <fieldset className="amount">
          <legend>Amount</legend>
          <input type="number" onChange={ (e)=> addNewData("amount", Number(e.target.value)) } />
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
                <option key={index}>{category}</option>
              )
            })}
          </select>
        </fieldset>

        <button onClick={addNewHistory}> create history </button>
      </form>
    </div>
  )
}