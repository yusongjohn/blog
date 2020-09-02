import React, {useState, useLayoutEffect, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Test from './sourceReading/setStateTest.jsx'


function TestC(){
    const [state, setState] = useState(1);
    useLayoutEffect(function(){
        debugger
        setState(2);
    });

    return <div>{state}</div>
}

ReactDOM.render(<TestC/>, window.document.getElementById('root'));
