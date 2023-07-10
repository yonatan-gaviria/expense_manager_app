import { useState } from "react";
import { useGlobalState } from "../context/GlobalState"

export default function FormNewHistory() {
  const {histories, informationData, configuration} = useGlobalState();
  const [categories, setCategories] = useState(informationData.categories.expense.categories);
  const [data, setData] = useState({
    id: "",
    amount: 0,
    description: "NO DESCRIPTION",
    transactionType: "expense",
    category: categories[0],
    date: {
      year: Number(new Date().getFullYear()),
      month: Number(new Date().getMonth()) + 1,
      day: Number(new Date().getDate()),
    },
    color: "",
    icon: "",
    percentage: "",
  });

  const addNewData = (valueType, value)=> {
    const dataCopy = data;

    if(valueType === "transactionType") {
      dataCopy[valueType] = value;
      dataCopy.category = informationData.categories[value].categories[0];
      setCategories(informationData.categories[value].categories);

    } else if(valueType === "date") {
      const dateArray = value.split("-");
      dataCopy.date.year = Number(dateArray[0]);
      dataCopy.date.month = Number(dateArray[1]);
      dataCopy.date.day = Number(dateArray[2]);

    } else {
      dataCopy[valueType] = value;
    }

    setData(dataCopy);
  }

  const addNewHistory = (e)=> {
    e.preventDefault();

    const transactionCopy = informationData.categories[data.transactionType];
    const index = transactionCopy.categories.findIndex((element)=> element === data.category);
    let newHistories = histories.histories;
    const newHistory = {
      id: new Date(),
      amount: data.amount,
      description: data.description,
      transactionType: data.transactionType,
      category: data.category,
      date: {
        year: data.date.year,
        month: data.date.month,
        day: data.date.day,
      },
      color: transactionCopy.colors[index],
      icon: transactionCopy.icons[index],
      percentage: ""
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
        <fieldset className="formTransactionType" onChange={ (e)=> addNewData("transactionType", e.target.value) }>
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

        <fieldset className="formCategory">
          <legend>Category</legend>
          <select name="category" onChange={ (e)=> addNewData("category", e.target.value) }>
            {categories.map((category, index)=> {
              return (
                <option key={ index }> { category } </option>
              )
            })}
          </select>
        </fieldset>

        <fieldset className="formDate">
          <legend>Date</legend>
          <input type="date" onChange={ /* (e)=> console.log(e.target.value) */(e)=> addNewData("date", e.target.value) }/>
        </fieldset>

        <fieldset className="formAmount">
          <legend>Amount</legend>
          <input type="number" onChange={ (e)=> addNewData("amount", Math.abs(Number(e.target.value))) } />
        </fieldset>

        <fieldset className="formDescription">
          <legend>Description</legend>
          <input type="text" onChange={ (e)=> addNewData("description", e.target.value) } />
        </fieldset>

        
        <div className="formButtonContainer">
          <button onClick={addNewHistory}> Add </button>
          <button onClick={closeForm}> Cancel </button>
        </div>
      </form>
    </div>
  )
}