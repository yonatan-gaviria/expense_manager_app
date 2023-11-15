import { useState } from "react";
import { useGlobalState } from "../context/GlobalState"

export default function FormNewHistory() {
  const { histories, informationData, configuration } = useGlobalState();
  const [categories, setCategories] = useState(configuration.configurationData.onEdit ? 
    informationData.categories[configuration.configurationData.transactionTypeHistoryToEdit].categories : 
    informationData.categories.expense.categories
  );
  const [data, setData] = useState({
    id: "",
    amount: configuration.configurationData.onEdit ? configuration.configurationData.amountHistoryToEdit : "",
    description: configuration.configurationData.onEdit && configuration.configurationData.descriptionHistoryToEdit !== "NO DESCRIPTION" ? 
        configuration.configurationData.descriptionHistoryToEdit : "",
    transactionType: configuration.configurationData.onEdit ? configuration.configurationData.transactionTypeHistoryToEdit : "expense",
    category: configuration.configurationData.onEdit ? configuration.configurationData.categoryHistoryToEdit : categories[0],
    date: configuration.configurationData.onEdit ? configuration.configurationData.dateHistoryToEdit :
    {
      year: Number(new Date().getFullYear()),
      month: Number(new Date().getMonth()) + 1,
      day: Number(new Date().getDate()),
    },
    color: "",
    icon: "",
    percentage: "",
  });

  const dateNumberToString = (year, month, day)=> {
    const newDate = {
      newYear: 0,
      newMonth: 0,
      newDay: 0,
    }
    
    newDate.newYear = year;
    newDate.newMonth = month < 10 ? `0${ month }` : `${ month }`;
    newDate.newDay = day < 10 ? `0${ day }` : `${ day }`;
    
    return (`${ newDate.newYear }-${ newDate.newMonth }-${ newDate.newDay }`);
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
      description: data.description === "" ? "NO DESCRIPTION" : data.description,
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

    const newConfiguration = { ...configuration.configurationData };
    
    if(newConfiguration.onEdit) {
      const index = newHistories.findIndex((history)=> history.id === newConfiguration.idHistoryToEdit);
      newHistories[index] = newHistory;
    } else {
      newHistories = [newHistory, ...newHistories];
    }
    
    newConfiguration.idHistoryToEdit = "";
    newConfiguration.onEdit = false;
    newConfiguration.formEnabled = false;
    configuration.setConfigurationData(newConfiguration);
    histories.setHistories(newHistories);
  }

  const closeForm = (e)=> {
    e.preventDefault();
    e.stopPropagation();
    const newConfiguration = { ...configuration.configurationData };
    
    newConfiguration.idHistoryToEdit = "";
    newConfiguration.onEdit = false;
    newConfiguration.formEnabled = false;
    configuration.setConfigurationData(newConfiguration);
  }

  return (
    <div className="formNewHistory" onClick={ (e)=>closeForm(e) }>
      <form className="transactionForm" onClick={ (e)=> e.stopPropagation() }>
        <div>
          <fieldset className="formTransactionType" onChange={ (e)=> addNewData("transactionType", e.target.value) }>
            <legend>Transaction type</legend>
            <label>
              { configuration.configurationData.onEdit && configuration.configurationData.transactionTypeHistoryToEdit === "income" ?
                <input type="radio" name="transactionType" value="income" defaultChecked/> : 
                <input type="radio" name="transactionType" value="income" />
              }
              Income 
            </label>

            <label>
              { configuration.configurationData.onEdit && configuration.configurationData.transactionTypeHistoryToEdit === "income" ?
                <input type="radio" name="transactionType" value="expense" /> : 
                <input type="radio" name="transactionType" value="expense" defaultChecked/>
              }
              Expense 
            </label>
          </fieldset>

          <fieldset className="formCategory">
            <legend>Category</legend>
            <select name="category" onChange={ (e)=> addNewData("category", e.target.value) }>
              { categories.map((category, index)=> {
                if(configuration.configurationData.onEdit) {
                  return (
                    configuration.configurationData.categoryHistoryToEdit === category ?
                    <option key={ index } selected={true}> { category } </option> : 
                    <option key={ index }> { category } </option>
                  )
                } else {
                  return(<option key={ index }> { category } </option>)
                }
              }) }
            </select>
          </fieldset>

          <fieldset className="formDate">
            <legend>Date</legend>
            <input 
              type="date" 
              defaultValue={ dateNumberToString( data.date.year, data.date.month, data.date.day ) } 
              min="2000-01-01"
              max={ dateNumberToString( Number(new Date().getFullYear()), Number(new Date().getMonth()) + 1, Number(new Date().getDate()) ) }
              onChange={ (e)=> addNewData("date", e.target.value) }
            />
          </fieldset>

          <fieldset className="formAmount">
            <legend>Amount</legend>
            <input 
              type="number" 
              onChange={ (e)=> addNewData("amount", Math.abs(Number(e.target.value))) } 
              defaultValue={ data.amount }
            />
          </fieldset>

          <fieldset className="formDescription">
            <legend>Description</legend>
            <input type="text" onChange={ (e)=> addNewData("description", e.target.value) } defaultValue={ data.description } /> 
          </fieldset>
        </div>
        

        
        <div className="formButtonContainer">
          <button onClick={ (e)=>addNewHistory(e) }>
            { configuration.configurationData.onEdit ? "Update" : "Add" }
          </button>
          <button onClick={ (e)=>closeForm(e) }> Cancel </button>
        </div>
      </form>
    </div>
  )
}