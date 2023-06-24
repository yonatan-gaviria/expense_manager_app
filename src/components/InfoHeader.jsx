import { useGlobalState } from "../context/GlobalState.jsx";

export default function InfoHeader() {

  const {informationData} = useGlobalState();
  const balance = informationData.balance;

  return (
    <div className="infoHeader">
      Balance: ${balance}
    </div>
  )
}