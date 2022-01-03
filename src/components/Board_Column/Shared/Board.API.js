import { Http } from "../../../Http/http";
const ENDPOINT_API={
    getFullBoard:'/v1/boards/getBoard',
    createColumn:'/v1/columns/createColumn',
    updateColumnOrder:'/v1/boards/updateColumnOrder',
    updateCardOrder:'/v1/cards/updateCardOrder',
}
class BoardAPI{
    constructor(){}
    getFullBoard = (payload)=>{
        return Http.get(ENDPOINT_API.getFullBoard+`?id=${payload}`)
    }
    createColumn = (payload)=>{
        return Http.post(ENDPOINT_API.createColumn,payload)
    }
    updateColumnOrder=(id,payload)=>{
        return Http.put(ENDPOINT_API.updateColumnOrder+`?id=${id}`,payload)
    }
    updateCardOrder = (id,payload)=>{
        return Http.put(ENDPOINT_API.updateCardOrder+`?id=${id}`,payload)
    }
}
export const boardApi=new BoardAPI();