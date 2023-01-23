import React from "react";
const Noti = ({msg, type}) => {
    if(msg === null){
        return null
    }
    console.log(type);
    return(
        <div className={`${type} info`}>
            <p>{msg}</p>
        </div>
    );
}
export default Noti