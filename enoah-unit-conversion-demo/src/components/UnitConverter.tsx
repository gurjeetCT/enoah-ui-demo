import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import { AppModalProps, ConversionRecord } from "../Utility/CommonProps";
import AppModal from "../AppModal";


const UnitConverter: React.FC = () => {
  
  const {register, handleSubmit, formState: { errors }, formState } = useForm<ConversionRecord>()  
  const [unitSubTypes, setUnitSubTypes] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [unitTypeState, setUnitTypeId] = useState<any>({});
  const [sourceUnitState, setsourceUnitId] = useState<any>({label:'',value:-1});
  const [targetUnitState, setTargetUnitId] = useState<any>({});
  const defaultModal : AppModalProps= {title:'Unit Conversion', content:constants.defaultMessage,isShow:false};
  const [modalContent, setModalContent] = useState<AppModalProps>(defaultModal);
    
    const fetchUnitTypes = async () => {
      var url = constants.apiEndPoints.GET_ALL_UNIT_TYPES;        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');
      setUnitTypes(resp.map((s:any) => ({value: s.unitTypeId, label:s.unitTypeName})));     
    };

    const fetchUnitSubTypes = async (unitTypeId:any) => {      
      var url = constants.apiEndPoints.GET_UNITS_BY_TYPE.replace('{typeid}',unitTypeId);        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');
      setUnitSubTypes(resp.map((s:any) => ({value: s.unitDetailsId, label:s.unitName})));      
    };
  
    const SetModal = (msg:string, flag:boolean) => {
      console.log(msg);
      defaultModal.content = msg;    
      defaultModal.isShow = flag; 
      setModalContent(defaultModal);    
    };
    
    
    const saveConversionRecord = handleSubmit(async (data:ConversionRecord) => {    
      if(sourceUnitState.value ==-1 || targetUnitState.value == -1)        
        SetModal('Select both units', true);
              
      else if(sourceUnitState.value==targetUnitState.value)        
        SetModal('Select different units', true);
      
      else {
        data.unitTypeId=unitTypeState.value;
        data.sourceUnitId=sourceUnitState.value;
        data.targetUnitId=targetUnitState.value;      
        var url = constants.apiEndPoints.SAVE_CONVERSION_UNIT;        
        const response = await ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
        console.log(response);
        if(response.StatusCode == constants.statusCodes.INTERNAL_SERVER_ERROR)
          SetModal(response.Message, true); 
        else if(response.outputValue)  
          SetModal('Result : ' + response.outputValue, true);        
      }
    })
  
    useEffect(()=>{
       fetchUnitTypes();      
    },[unitTypeState]);
  
  return (
    <div>      
      <form onSubmit={saveConversionRecord}>          
        <div className="mb-3">
          <label className="form-label" htmlFor="unitTypeId">Select Unit Type</label>  
          <Select
                        className="form-control item"                                              
                        value={unitTypeState || unitTypeState.label || ''}
                        options={unitTypes}
                        onChange={(evt:any)=>{                                                  
                          setUnitTypeId(evt);
                          fetchUnitSubTypes(evt.value);
                        }}
                        defaultValue={unitTypeState || unitTypeState.value}
                    />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="sourceUnitId">Select Source</label>              
            <Select
                        className="form-control item"                                              
                        value={sourceUnitState || sourceUnitState.label || ''}
                        options={unitSubTypes}
                        onChange={(evt:any)=>{                          
                          setsourceUnitId(evt);                          
                        }}
                        defaultValue={sourceUnitState || sourceUnitState.value}
                    />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="targetUnitId">Select Target</label>  
          <Select className="form-control item"                                              
                        value={targetUnitState||targetUnitState.label || ''}
                        options={unitSubTypes}
                        onChange={(evt:any)=>{                          
                          setTargetUnitId(evt);                          
                        }}
                        defaultValue={targetUnitState||targetUnitState.value}
                    />
        </div>   

        <div className="mb-3">
            <label className="form-label" htmlFor="inputValue">Input Value</label>
            <input className="form-control"
              {...register("inputValue", { required: "Input is required" })}
              type="number"
              step={0.001}
              id="inputValue"
            />
            {errors.inputValue && <p>{errors.inputValue.message}</p>}
        </div>  

        <div className="mb-3">
            <label className="form-label" htmlFor="userName">User Name</label>
            <input className="form-control"
              {...register("userName", { required: "userName is required" })}
              type="text"
              id="userName"              
            />
            {errors.userName && <p>{errors.userName.message}</p>}
        </div>  
        <Button variant="primary" type="submit">Submit</Button>
      </form>
      {modalContent.isShow &&
       <AppModal content={modalContent.content} title={modalContent.title} isShow={modalContent.isShow}
       handleShow={()=>setModalContent({...modalContent,isShow:false})}       
       />}
    </div>
  );
};

export default UnitConverter;