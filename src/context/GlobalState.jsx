import { createContext, useContext, useEffect, useState } from "react";

const historiesData = [];

const balanceInfo = {
  balance: 0,
  totalIncome: 0,
  totalExpenses: 0
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
  const [balanceInformation, setBalanceInformation] = useState(balanceInfo)
  const [configurationData, setConfigurationData] = useState(configuration);

  useEffect(()=> {
    let newIncome = 0;
    let newExpenses = 0;
    const newBalanceInfo = {...balanceInformation};

    histories.map(
      (history)=> {
        if(history.amount < 0) {
          newExpenses = newExpenses + (history.amount * -1);
        } else {
          newIncome = newIncome + history.amount;
        }
      }
    );

    newBalanceInfo.income = newIncome;
    newBalanceInfo.Expenses = newExpenses;
    newBalanceInfo.balance = newIncome - newExpenses;

    setBalanceInformation(newBalanceInfo);
  }, [histories]);

  return (
    <Context.Provider 
      value={
        {
          histories: {histories, setHistories},
          balance: {balanceInformation, setBalanceInformation},
          configuration: {configurationData, setConfigurationData}
        } 
      }
    >
      {children}
    </Context.Provider>
  )
}