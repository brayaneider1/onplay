import { Token } from '../Storage/Token';
import { store } from '../../index'
import {auth} from '../../services/Auth/AuthActions';

//Contiene los metodos estandarizados para realizar peticiones fetch 
export class Api{

  //Metodo estandar post

  post(url, data, header){
      let dataBody = JSON.stringify(data);
      
      return fetch(`${"https://api.onplay.com.co"}${url}`, {
        method: 'POST',
        mode:'cors',
        headers: (header ? header: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Aauthorization': `Bearer ${ Token.getToken() }`
        }),
        body: dataBody
      }).then(async response => {
        if(response.status === 401){
          store.dispatch(auth.logout()); 
          return response;
        }
        response.payload = await response.json()
        return response;
      }).catch(err => err)
  }
  //Metodo estandar put

  put(url, data, header){
    let isFormData = data instanceof FormData;
    
    return fetch(`${"https://api.onplay.com.co"}${url}`, {
      method: 'PUT',
      headers: (header ? header: 
        isFormData? 
        { 'Authorization': `Bearer ${ Token.getToken() }` }
        : 
        {
          'Accept': isFormData? '': 'application/json',
          'Content-type': isFormData? '': 'application/json',
          'Authorization': `Bearer ${Token.getToken() }`
        }
      ),
      body: isFormData? data: JSON.stringify(data) 
    }).then(async response => {
      if(response.status === 401) {
        store.dispatch(auth.logout()); 
        return response;
      }
      response.payload = await response.json()
      return response;
    }).catch(err => err)
  }
  
  //Metodo estandar get


  get(url, params){ 
      url = new URL(`${"https://api.onplay.com.co"}${url}`);
      if(params)
          Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      return fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${Token.getToken() }`
          }
      }).then(async response => {
        if(response.status === 401) {
          store.dispatch(auth.logout()); 
          return response;
        }
        response.payload = await response.json()
        return response;
      }).catch(err => err)
  }
}
  
export default new Api();