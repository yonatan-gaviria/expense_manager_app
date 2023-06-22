import { useGlobalState } from "../context/GlobalState.jsx";

export default function InfoHeader() {

  const {balance} = useGlobalState();

  return (
    <div className="infoHeader">
      Balance: ${balance.balanceInformation.balance}
    </div>
  )
}