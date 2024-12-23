export const constants = {
    apiEndPoints: {
        GET_ALL_UNIT_TYPES: 'UnitType',
        SAVE_UNIT_TYPE:'UnitType/AddUnitTypes',
        GET_UNITS_BY_TYPE:'UnitSubType/GetAllUnitSubTypes/{typeid}',
        SAVE_UNIT_DETAILS:'UnitSubType/AddUnitSubType',
        SAVE_CONVERSION_UNIT:'ConversionOps/AddConversions',
        GET_ALL_CONVERSIONS:'ConversionOps'
    },
    apiMethod: {
        GET: 'GET',
        POST: 'POST'        
      },
    baseUrl:'https://gurjeetunitconverter.azurewebsites.net/',
    statusCodes:{
        INTERNAL_SERVER_ERROR:500,
        SUCCESS:200
    },
    defaultMessage:'Record Saved Successfully'

};