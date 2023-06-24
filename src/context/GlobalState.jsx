import { createContext, useContext, useEffect, useState } from "react";

const historiesData = [];

const infoData = {
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalIncomePercentage: 60,
  totalExpensesPercentage: 40,
  categories: {
    income: ["Extra income", "Business", "Loans", "Gifts", "Salary", "others"],
    expense: ["Beatuy", "Food and drink", "Shopping", "Sports", "hobbies", "Education", "Entertainment", "Debts", "Bills", "Family", "personal", "Home", "Provisions", "Gifts", "Health", "Work", "Transportation", "Vehicle", "others"]
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
      const newPercentage = (newExpenses / newIncome) * 100; //.toFixed(2)
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