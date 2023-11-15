import { useGlobalState } from "../context/GlobalState";

export default function History({ data }) {
  const { histories, configuration } = useGlobalState();

  const deleteHistory = ()=> {
    const historiesCopy = [...histories.histories];
    const newHistories = historiesCopy.filter((history)=> history.id !== data.id);

    histories.setHistories(newHistories);
  }

  const enableEditMode = (e)=> {
    e.preventDefault();
    e.stopPropagation();

    const configurationCopy = { ...configuration.configurationData };
    configurationCopy.idHistoryToEdit = data.id;
    configurationCopy.categoryHistoryToEdit = data.category;
    configurationCopy.dateHistoryToEdit = data.date;
    configurationCopy.amountHistoryToEdit = data.amount;
    configurationCopy.descriptionHistoryToEdit = data.description;
    configurationCopy.transactionTypeHistoryToEdit = data.transactionType;
    configurationCopy.onEdit = true;
    configurationCopy.formEnabled = true;

    configuration.setConfigurationData(configurationCopy);
  }
  
  return (
    <div className="historyContainer" onContextMenu={ (e)=> enableEditMode(e) }>
      <div className="categoryContainer" style={ { backgroundColor: data.color } }>
        <img src={ data.icon } alt="category icon"/>
      </div>
      <div className="history"> 
        <div className="amountAndDate">
          <div className={ `amount ${ data.transactionType }` }> 
            $ { data.transactionType === "expense" ? data.amount * -1 : data.amount }
          </div> 
          <div className="dateAndDelete">
            <div className="date">{ `${ data.date.day }/${ data.date.month }/${ data.date.year }` }</div>
            <div className="deleteHistory" onClick={ deleteHistory }> X </div>
          </div>
        </div>
        
        <div className="description">
          <p className="descriptionText">{ data.description }</p>
        </div>

        <div className="category">{ data.category }</div>
      </div>
    </div>
  )
}