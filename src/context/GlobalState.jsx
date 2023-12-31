import { createContext, useContext, useState } from "react";
import { Icons } from "../Icons.js";

const historiesData = [];

const configuration = {
  idHistoryToEdit: "",
  categoryHistoryToEdit: "",
  dateHistoryToEdit: { year: 0, month: 0, day: 0 },
  amountHistoryToEdit: 0,
  descriptionHistoryToEdit: "",
  transactionTypeHistoryToEdit: "",
  onEdit: false,
  infoChart: false,
  formEnabled: false,
  formChartEnabled: false,
  chartConfig: {
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
  const [configurationData, setConfigurationData] = useState(configuration);

  const informationData = {
    categories: {
      income: {
        categories: ["Business", "Extra income", "Gifts", "Loans", "Others", "Salary"],
        icons: [Icons.Business, Icons.ExtraIncome, Icons.Gifts, Icons.Loans, Icons.Others, Icons.Salary],
        colors: ["#006a00","#0000ff","#ffff00","#ff0000","#444444", "#00ff00"],
      },
      expense: {
        categories: ["Beauty", "Bills", "Debts", "Education", "Entertainment", "Family", "Food and drink", "Gifts", "Health", "Home", "Others", "Personal", "Pets", "Provisions", "Shopping", "Transportation"],
        icons: [Icons.Beatuy, Icons.Bills, Icons.Debts, Icons.Education, Icons.Entertainment, Icons.Family, Icons.FoodAndDrink, Icons.Gifts, Icons.Health, Icons.Home, Icons.Others, Icons.Personal, Icons.Pets, Icons.Provisions, Icons.Shopping, Icons.Transportation],
        colors: ["#ffd0d0", "#00a000", "#64ff64", "#2dabff", "#fe9c00", "#ffa8a8", "#685a44", "#491f81", "#900000", "#000085", "#ababab", "#ff5858", "#595959", "#777065", "#9754ef", "#ffff00"],
      },
    },
  };

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