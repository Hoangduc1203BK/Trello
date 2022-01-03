import {BASE_URL} from '../lib/constance/const.js'
import axios from 'axios'
export class Http{
    constructor(){}
   static get=(endpoint)=>{
       return axios.get(BASE_URL+endpoint);
   }
   static post=(endpoint,data)=>{
       return axios.post(BASE_URL+endpoint,data)
   }
   static put=(endpoint,data)=>{
       return axios.put(BASE_URL+endpoint,data)
   }
}
