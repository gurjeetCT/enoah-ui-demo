export interface KeyValueList{
    label:string;
    value:string;
}

export type UnitTypeRecord = {
  unitTypeName: string
  unitTypeDescription: string
}

export type UnitDetailsRecord = {
    unitName: string
    unitShortName: string;
    unitTypeId:number;
    numberOfBaseUnits:number;
  }

export type ConversionRecord = {
  sourceUnitId: number;
  targetUnitId: number;
  unitTypeId:number;
  inputValue:number;
  userName:string;
}

export type AppModalProps = {
    title: string
    content: string;    
    isShow?:boolean;
    handleShow?:any;
  }