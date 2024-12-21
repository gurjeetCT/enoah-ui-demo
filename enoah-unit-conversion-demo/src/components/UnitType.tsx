import React, { useState, useEffect } from "react";
import ApiConnector from '../services/ApiConnector'
import { constants } from "../Utility/ApiConstants";
import { useForm } from "react-hook-form";
type UnitTypes = {
  unitTypeName: string
  unitTypeDescription: string
}
const UnitType: React.FC = () => {
  const {register, handleSubmit, formState: { errors }, formState } = useForm<UnitTypes>()  

  const fetchUnitTypes = async () => {
    var url = constants.apiEndPoints.GET_ALL_UNIT_TYPES;        
    const resp = await ApiConnector(url, null, constants.apiMethod.GET, null, 'dummyToken');
    console.log({dataRcvd:resp,method:'fetch'});
  };

  
  const saveUnitTypes = handleSubmit((data) => {    
    var url = constants.apiEndPoints.SAVE_UNIT_TYPE;        
    return ApiConnector(url, null, constants.apiMethod.POST, JSON.stringify(data), 'dummyToken');
  })

  useEffect(()=>{
    fetchUnitTypes();
  },[]);

  return (
    <div>
    <h1>Save Unit Types</h1>
      <form onSubmit={saveUnitTypes}>      
        <div>
              <label htmlFor="unitTypeName">Name</label>
              <input
                {...register("unitTypeName", { required: "Name is required" })}
                type="text"
                id="name"
              />
              {errors.unitTypeName && <p>{errors.unitTypeName.message}</p>}
        </div>

        <div>
            <label htmlFor="unitTypeDescription">Description</label>
            <input
              {...register("unitTypeDescription", { required: "Name is required" })}
              type="text"
              id="name"
            />
            {errors.unitTypeDescription && <p>{errors.unitTypeDescription.message}</p>}
        </div>     

        <button type="submit">Submit</button>
      </form>
  </div>
  );
};

export default UnitType;