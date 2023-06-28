export default function History({ data }) {
  
  return (
    <div className = { `history ${data.transactionType}` }> 
      {data.description} ${data.amount}
    </div>
  )
}