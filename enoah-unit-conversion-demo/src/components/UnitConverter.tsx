import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
import Select from "react-select";

type UnitConverter = {
  sourceUnitId: number;
  targetUnitId: number;
  unitTypeId:number;
  inputValue:number;
  userName:string;
}
const UnitConverter: React.FC = () => {
  
  const {register, handleSubmit, formState: { errors }, formState } = useForm<UnitConverter>()  
  const [unitSubTypes, setUnitSubTypes] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [unitTypeState, setUnitTypeId] = useState<any>({});
  const [sourceUnitState, setsourceUnitId] = useState<any>({label:'',value:-1});
  const [targetUnitState, setTargetUnitId] = useState<any>({});
    
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
  
    
    const saveConversionRecord = handleSubmit((data:UnitConverter) => {    
      if(sourceUnitState.value==-1 || targetUnitState.value==-1)alert('Select both units');
      else if(sourceUnitState.value==targetUnitState.value)alert('Select different units');
      else{
      data.unitTypeId=unitTypeState.value;
      data.sourceUnitId=sourceUnitState.value;
      data.targetUnitId=targetUnitState.value;      
      var url = constants.apiEndPoints.SAVE_CONVERSION_UNIT;        
      return ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
      }
    })
  
    useEffect(()=>{
       fetchUnitTypes();      
    },[unitTypeState]);
  
  return (
    <div>
      <h1>Unit Converter</h1>
      <form onSubmit={saveConversionRecord}>          
        <div>
          <label htmlFor="unitTypeId">Select Unit Type</label>  
          <Select
                        className="item"                        
                        value={unitTypeState || unitTypeState.label || ''}
                        options={unitTypes}
                        onChange={(evt:any)=>{    
                          console.log(evt);                      
                          setUnitTypeId(evt);
                          fetchUnitSubTypes(evt.value);
                        }}
                        defaultValue={unitTypeState || unitTypeState.value}
                    />
        </div>
        <div>
          <label htmlFor="sourceUnitId">Select Source</label>              
            <Select
                        className="item"                        
                        value={sourceUnitState || sourceUnitState.label || ''}
                        options={unitSubTypes}
                        onChange={(evt:any)=>{                          
                          setsourceUnitId(evt);                          
                        }}
                        defaultValue={sourceUnitState || sourceUnitState.value}
                    />
        </div>

        <div>
          <label htmlFor="targetUnitId">Select Target</label>  
          <Select
                        className="item"                        
                        value={targetUnitState||targetUnitState.label || ''}
                        options={unitSubTypes}
                        onChange={(evt:any)=>{                          
                          setTargetUnitId(evt);                          
                        }}
                        defaultValue={targetUnitState||targetUnitState.value}
                    />
        </div>   

        <div>
            <label htmlFor="inputValue">Input Value</label>
            <input
              {...register("inputValue", { required: "Input is required" })}
              type="number"
              id="inputValue"
            />
            {errors.inputValue && <p>{errors.inputValue.message}</p>}
        </div>  

        <div>
            <label htmlFor="userName">User Name</label>
            <input
              {...register("userName", { required: "userName is required" })}
              type="text"
              id="userName"
            />
            {errors.userName && <p>{errors.userName.message}</p>}
        </div>  
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
};

export default UnitConverter;