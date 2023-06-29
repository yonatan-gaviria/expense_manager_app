export default function History({ data }) {
  const dateString = `${data.date.getDate()}/${data.date.getMonth() + 1}/${data.date.getFullYear()}`;
  
  return (
    <div className = "historyContainer">
      <div className = "categoryContainer">
        <img src = { data.icon }/>
      </div>
      <div className = "history"> 
        <div className = "amountAndDate">
          <div className = { `amount ${data.transactionType}` }>${ data.transactionType === "expense" ? data.amount * -1 : data.amount }</div> 
          <div className = "date">{ dateString }</div>
        </div>
        
        <div className = "description">
          <p className = "descriptionText">{ data.description }</p>
        </div>

        <div className="category">{ data.category }</div>
      </div>
    </div>
  )
}