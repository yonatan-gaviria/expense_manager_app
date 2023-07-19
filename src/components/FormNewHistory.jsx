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

  const dateNumberToString = ()=> {
    const newDate = {
      year: 0,
      month: 0,
      day: 0,
    }

    const today = {
      month: Number(new Date().getMonth()) + 1,
      day: Number(new Date().getDate()),
    };
    
    newDate.year = new Date().getFullYear();
    newDate.month = today.month < 10 ? `0${ today.month }` : `${ today.month }`;
    newDate.day = today.day < 10 ? `0${ today.day }` : `${ today.day }`;
    
    return (`${newDate.year}-${newDate.month}-${newDate.day}`);
  }

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
    e.stopPropagation();

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
    e.stopPropagation();
    const newConfiguration = {...configuration.configurationData};
    
    newConfiguration.formEnabled = false;
    configuration.setConfigurationData(newConfiguration);
  }

  return (
    <div className="formNewHistory" onClick={ (e)=>closeForm(e) }>
      <form className="transactionForm" onClick={ (e)=> e.stopPropagation() }>
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
          <input 
            type="date" 
            defaultValue={ dateNumberToString() } 
            min="2000-01-01"
            max={ dateNumberToString() }
            onChange={ (e)=> addNewData("date", e.target.value) }
          />
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
          <button onClick={ (e)=>addNewHistory(e) }> Add </button>
          <button onClick={ (e)=>closeForm(e) }> Cancel </button>
        </div>
      </form>
    </div>
  )
}