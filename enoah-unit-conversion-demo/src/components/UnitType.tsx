import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import { AppModalProps, UnitTypeRecord } from "../Utility/CommonProps";
import AppModal from "../AppModal";
import { Table } from "react-bootstrap";


const UnitType: React.FC = () => {
  const {register, handleSubmit, formState: { errors }, formState } = useForm<UnitTypeRecord>()  
  const defaultModal : AppModalProps= {title:'Unit Type', content:constants.defaultMessage,isShow:false};
  const [modalContent, setModalContent] = useState<AppModalProps>(defaultModal);
  const [data, setData] = useState([]);

  const fetchUnitTypes = async () => {
    var url = constants.apiEndPoints.GET_ALL_UNIT_TYPES;        
    var response = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');
    console.log(response);
    setData(response);
  };

  
  const saveUnitTypes = handleSubmit(async (data) => {     
    var url = constants.apiEndPoints.SAVE_UNIT_TYPE;        
    var response = await ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
    if(response.StatusCode == constants.statusCodes.INTERNAL_SERVER_ERROR)
      defaultModal.content = response.Message;    
    defaultModal.isShow = true; 
    setModalContent(defaultModal);    
  })

  useEffect(()=>{
    fetchUnitTypes();
  },[]);

  return (
    <div>    
      <form onSubmit={saveUnitTypes}>      
        <div className="mb-3">
              <label className="form-label" htmlFor="unitTypeName">Name</label>
              <input className="form-control"
                {...register("unitTypeName", { required: "Name is required" })}
                type="text"
                id="name"
              />
              {errors.unitTypeName && <p>{errors.unitTypeName.message}</p>}
        </div>

        <div className="mb-3">
            <label className="form-label" htmlFor="unitTypeDescription">Description</label>
            <input className="form-control"
              {...register("unitTypeDescription", { required: "Name is required" })}
              type="text"
              id="name"
            />
            {errors.unitTypeDescription && <p>{errors.unitTypeDescription.message}</p>}
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
              <th>Description</th>          
            </tr>
          </thead>
          <tbody>
            {data.map((unitTypeRecord:any) => {        
            return (
            <tr>
            <td>{unitTypeRecord.unitTypeName}</td>
            <td>{unitTypeRecord.unitTypeDescription}</td>        
          </tr>
          )})}
          </tbody>
        </Table>
    </div>
  </div>
  );
};

export default UnitType;