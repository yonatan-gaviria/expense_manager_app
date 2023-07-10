import { createContext, useContext, useEffect, useState } from "react";
import { Icons } from "../Icons.js";

const historiesData = [];

const infoData = {
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalIncomePercentage: 0,
  totalExpensesPercentage: 0,
  categories: {
    income: {
      categories: ["Business", "Extra income", "Gifts", "Loans", "Others", "Salary"],
      icons: [Icons.Business, Icons.ExtraIncome, Icons.Gifts, Icons.Loans, Icons.Others, Icons.Salary],
      colors: ["#006a00","#0000ff","#ffff00","#ff0000","#444444", "#00ff00"],
    },
    expense: {
      categories: ["Beatuy", "Bills", "Debts", "Education", "Entertainment", "Family", "Food and drink", "Gifts", "Health", "Home", "Others", "Personal", "Pets", "Provisions", "Shopping", "Transportation"],
      icons: [Icons.Beatuy, Icons.Bills, Icons.Debts, Icons.Education, Icons.Entertainment, Icons.Family, Icons.FoodAndDrink, Icons.Gifts, Icons.Health, Icons.Home, Icons.Others, Icons.Personal, Icons.Pets, Icons.Provisions, Icons.Shopping, Icons.Transportation],
      colors: ["#ffd0d0", "#00a000", "#64ff64", "#2dabff", "#fe9c00", "#ffa8a8", "#685a44", "#491f81", "#900000", "#000085", "#ababab", "#ff5858", "#595959", "#777065", "#9754ef", "#ffff00"],
    },
  },
};

const configuration = {
  formEnabled: false,
  formChartEnabled: false,
  chartConfig: {
    chartType: "pie",
    dataType: "income-expense",
    minDate: {
      year: 2000,
      month: 1,
      day: 1,
    },
    maxDate: {
      year: Number(new Date().getFullYear()),
      month: Number(new Date().getMonth()) + 1,
      day: Number(new Date().getDate()),
    },
  },
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
    const newInformationData = { ...informationData };

    histories.forEach(
      (history)=> {
        if(history.transactionType === "expense") {
          newExpenses = newExpenses + history.amount;
        } else {
          newIncome = newIncome + history.amount;
        }
      }
    );

    newInformationData.totalIncome = newIncome;
    newInformationData.totalExpenses = newExpenses;
    newInformationData.balance = newIncome - newExpenses;
  
    const IncomePercentage = ((newIncome - newExpenses) / newIncome) * 100;
    newInformationData.totalIncomePercentage = IncomePercentage;
    newInformationData.totalExpensesPercentage = 100 - IncomePercentage;

    setInformationData(newInformationData);
  }, [histories]);

  return (
    <Context.Provider 
      value={
        {
          histories: { histories, setHistories },
          informationData: informationData,
          configuration: { configurationData, setConfigurationData },
        } 
      }
    >
      { children }
    </Context.Provider>
  )
}