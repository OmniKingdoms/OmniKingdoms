import React, { useState, useEffect } from "react";


const Test = props => {

    //console.log(props.contract)

    const readFunc = async() => {
        console.log('hitting in test')
        const tmp = await props.extention.getMessage();
        console.log(tmp)
    }

return (
    <div>
        <button onClick={readFunc}>press this button</button>
    </div>
)

};

export default Test;