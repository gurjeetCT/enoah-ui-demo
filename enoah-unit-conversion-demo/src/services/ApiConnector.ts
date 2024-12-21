import axios from 'axios';
import {constants} from '../Utility/ApiConstants'

export default function ApiConnector(path: string, params: any, method: string, data: any, token: any) {
  var headers = {
    'Content-Type': 'application/json',    
    Authorization: `Bearer ${token}`,
  };  
    return axios({
      url: path,
      method: method,
      baseURL: constants.baseUrl,
      params: params,
      data: data,
      headers: headers,
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          //handleUnauthorizedError();
        }
        throw error;
      });
  }