import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { constants } from '../Utility/ApiConstants';
import ApiConnector from '../services/ApiConnector';

function ConversionHistory() {
    const [data, setData] = useState([]);
    const fetchHistory = async () => {
          var url = constants.apiEndPoints.GET_ALL_CONVERSIONS;        
          const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');    
          setData(resp);      
        };
    useEffect(()=>{
        fetchHistory();      
        },[]);
  return (
    <div className="mtop20">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Source</th>
            <th>Target</th>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {data.map((historyRecord:any) => {        
          return (
          <tr>
          <td>{historyRecord.userName}</td>
          <td>{historyRecord.sourceUnitName}</td>
          <td>{historyRecord.targetUnitName}</td>
          <td>{historyRecord.inputValue}</td>
          <td>{historyRecord.outputValue}</td>
        </tr>
        )})}
        </tbody>
      </Table>
     </div> 
  );
}

export default ConversionHistory;