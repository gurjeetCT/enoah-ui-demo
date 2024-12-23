import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { AppModalProps, UnitDetailsRecord } from "../Utility/CommonProps";
import AppModal from "../AppModal";
import { Table } from "react-bootstrap";


const UnitDetails: React.FC = () => {
  
  const {register, handleSubmit, formState: { errors }, formState } = useForm<UnitDetailsRecord>()  
  const [dropdown, setDropdown] = useState([]);
  const [unitTypeState, setUnitTypeId] = useState<any>({});
  const defaultModal : AppModalProps= {title:'Unit SubType', content:constants.defaultMessage,isShow:false};
  const [modalContent, setModalContent] = useState<AppModalProps>(defaultModal);
  const [data, setData] = useState([]);

    const fetchUnitTypes = async () => {
      var url = constants.apiEndPoints.GET_ALL_UNIT_TYPES;        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');    
      setDropdown(resp.map((s:any) => ({value: s.unitTypeId, label:s.unitTypeName})));      
    };

    const fetchUnitSubTypes = async (unitTypeId:any) => {
      setUnitTypeId(unitTypeId);
      var url = constants.apiEndPoints.GET_UNITS_BY_TYPE.replace('{typeid}',unitTypeId);        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');     
      console.log(resp);
      setData(resp);
    };
  
    
    const saveSubTypes = handleSubmit(async (data:UnitDetailsRecord) => {           
      data.unitTypeId=unitTypeState.value;
      var url = constants.apiEndPoints.SAVE_UNIT_DETAILS;        
      const response = await ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
      if(response.StatusCode == constants.statusCodes.INTERNAL_SERVER_ERROR)
            defaultModal.content = response.Message;    
          defaultModal.isShow = true; 
          setModalContent(defaultModal);    
    })
  
    useEffect(()=>{
       fetchUnitTypes();   
       fetchUnitSubTypes(0);   
    },[]);
  
  return (
    <div>      
      <form onSubmit={saveSubTypes}>         
        <div className="mb-3">
          <label className="form-label" htmlFor="unitTypeId">Select Unit Type</label>  
          <Select className="form-control item"                                              
                        value={unitTypeState|| unitTypeState.label || ''}
                        options={dropdown}
                        onChange={(evt:any)=>{                          
                          setUnitTypeId(evt);}}
                        defaultValue={unitTypeState || unitTypeState.value}
                    />
        </div>
        <div className="mb-3">
              <label className="form-label" htmlFor="unitName">Name</label>
              <input className="form-control"
                {...register("unitName", { required: "Name is required" })}
                type="text"
                id="name"
              />
              {errors.unitName && <p>{errors.unitName.message}</p>}
        </div>

        <div className="mb-3">
            <label className="form-label" htmlFor="unitShortName">Short Name</label>
            <input className="form-control"
              {...register("unitShortName", { required: "Name is required" })}
              type="text"
              id="name"
            />
            {errors.unitShortName && <p>{errors.unitShortName.message}</p>}
        </div>     

        <div className="mb-3">
            <label className="form-label" htmlFor="numberOfBaseUnits">Base Unit Factor</label>
            <input className="form-control"
              {...register("numberOfBaseUnits", { required: "Factor is required" })}
              type="number" step={0.001}
              id="name"
            />
            {errors.numberOfBaseUnits && <p>{errors.numberOfBaseUnits.message}</p>}
        </div>  
        <Button variant="primary" type="submit">Submit</Button>
      </form>
      {modalContent.isShow &&
       <AppModal content={modalContent.content} title={modalContent.title} isShow={modalContent.isShow}
        handleShow={()=>setModalContent({...modalContent,isShow:false})}       
       />}
       <div className="mtop20">
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>UnitType</th>
              <th>Unit Name</th>          
              <th>Base Units</th>          
            </tr>
          </thead>
          <tbody>
            {data.map((unitDetailsRecord:any) => {        
            return (
            <tr>
            <td>{unitDetailsRecord.unitTypeName}</td>
            <td>{unitDetailsRecord.unitName}</td>      
            <td>{unitDetailsRecord.numberOfBaseUnits}</td>  
          </tr>
          )})}
          </tbody>
        </Table>
    </div>
    </div>
  );
};

export default UnitDetails;