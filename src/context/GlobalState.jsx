import { createContext, useContext, useEffect, useState } from "react";

const historiesData = [];

const infoData = {
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalIncomePercentage: 60,
  totalExpensesPercentage: 40,
  categories: {
    income: {
      categories: ["Business", "Extra income", "Gifts", "Loans", "Others", "Salary"],
      colors: ["#006a00","#0000ff","#ffff00","#ff0000","#444444", "#00ff00"]
    },
    expense: {
      categories: ["Beatuy", "Bills", "Debts", "Education", "Entertainment", "Family", "Food and drink", "Gifts", "Health", "Home", "Others", "Personal", "Provisions", "Shopping", "Transportation", "Work"],
      colors: ["#ffd0d0", "#00a000", "#64ff64", "#2dabff", "#fe9c00", "#ffa8a8", "#685a44", "#491f81", "#900000", "#000085", "#ababab", "#ff5858", "#777065", "#9754ef", "#ffff00", "#595959"]
    }
  }
};

const configuration = {
  formEnabled: false
};

export const Context = createContext()

export const useGlobalState = ()=> {
  const context = useContext(Context)
  return context;
}

export const GlobalProvider = ({ children })=> {
  const [histories, setHistories] = useState(historiesData);
  const [informationData, setInformationData] = useState(infoData)
  const [configurationData, setConfigurationData] = useState(configuration);

  useEffect(()=> {
    let newIncome = 0;
    let newExpenses = 0;
    const newInformationData = {...informationData};

    histories.map(
      (history)=> {
        if(history.transactionType === "expense") {
          return newExpenses = newExpenses + history.amount;
        } else {
          return newIncome = newIncome + history.amount;
        }
      }
    );

    newInformationData.totalIncome = newIncome;
    newInformationData.totalExpenses = newExpenses;
    newInformationData.balance = newIncome - newExpenses;

    if(newIncome <= 0) {
      newInformationData.totalIncomePercentage = 60;
      newInformationData.totalExpensesPercentage = 40;
    } else { 
      const newPercentage = (newExpenses / newIncome) * 100;
      newInformationData.totalExpensesPercentage = newPercentage;
      newInformationData.totalIncomePercentage = 100 - newPercentage;
    }

    setInformationData(newInformationData);
  }, [histories]);

  return (
    <Context.Provider 
      value = {
        {
          histories: {histories, setHistories},
          informationData: informationData,
          configuration: {configurationData, setConfigurationData}
        } 
      }
    >
      {children}
    </Context.Provider>
  )
}