import {Http} from '../../../Http/http.js'

const ENDPOINT_API={
    createCard:'/v1/cards/createCard',
    updateTitleColumn:'/v1/columns/update'
}
class ColumnAPI{
    constructor(){}
    createCard=(payload)=>{
        return Http.post(ENDPOINT_API.createCard,payload)
    }
    updateColumn=(id,payload)=>{
        return Http.put(ENDPOINT_API.updateTitleColumn+`?id=${id}`,payload)
    }
}
export const columnApi=new ColumnAPI();