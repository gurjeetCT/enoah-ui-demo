import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { KeyValueList } from "../Utility/CommonProps";


type UnitDetails = {
  unitName: string
  unitShortName: string;
  unitTypeId:number;
  numberOfBaseUnits:number;
}
const UnitDetails: React.FC = () => {
  
  const {register, handleSubmit, formState: { errors }, formState } = useForm<UnitDetails>()  
  const [dropdown, setDropdown] = useState([]);
  const [unitTypeState, setUnitTypeId] = useState<any>({});

    const fetchUnitTypes = async () => {
      var url = constants.apiEndPoints.GET_ALL_UNIT_TYPES;        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');    
      setDropdown(resp.map((s:any) => ({value: s.unitTypeId, label:s.unitTypeName})));      
    };

    const fetchUnitSubTypes = async (unitTypeId:any) => {
      setUnitTypeId(unitTypeId);
      var url = constants.apiEndPoints.GET_UNITS_BY_TYPE.replace('{typeid}',unitTypeId);        
      const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');     
    };
  
    
    const saveSubTypes = handleSubmit((data:UnitDetails) => {           
      data.unitTypeId=unitTypeState.value;
      var url = constants.apiEndPoints.SAVE_UNIT_DETAILS;        
      return ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
    })
  
    useEffect(()=>{
       fetchUnitTypes();      
    },[]);
  
  return (
    <div>
      <h1>Save Unit Types</h1>
      <form onSubmit={saveSubTypes}>    
     

        <div>
          <label htmlFor="unitTypeId">Select Unit Type</label>  
          <Select
                        className="item"                        
                        value={unitTypeState|| unitTypeState.label || ''}
                        options={dropdown}
                        onChange={(evt:any)=>{                          
                          setUnitTypeId(evt);}}
                        defaultValue={unitTypeState || unitTypeState.value}
                    />
        </div>
        <div>
              <label htmlFor="unitName">Name</label>
              <input
                {...register("unitName", { required: "Name is required" })}
                type="text"
                id="name"
              />
              {errors.unitName && <p>{errors.unitName.message}</p>}
        </div>

        <div>
            <label htmlFor="unitShortName">Short Name</label>
            <input
              {...register("unitShortName", { required: "Name is required" })}
              type="text"
              id="name"
            />
            {errors.unitShortName && <p>{errors.unitShortName.message}</p>}
        </div>     

        <div>
            <label htmlFor="numberOfBaseUnits">Base Unit Factor</label>
            <input
              {...register("numberOfBaseUnits", { required: "Factor is required" })}
              type="number"
              id="name"
            />
            {errors.numberOfBaseUnits && <p>{errors.numberOfBaseUnits.message}</p>}
        </div>  
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
};

export default UnitDetails;