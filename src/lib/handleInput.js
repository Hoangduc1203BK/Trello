export const getTitle=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      e.target.blur();
    }
  }
export const selectAllText=(e)=>{
    e.target.focus();
    e.target.select();
  }