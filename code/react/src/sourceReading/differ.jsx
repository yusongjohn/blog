import React, {useState} from 'react';

export default function DifferAlgorithm(){
    const [data, setData] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

    return (
        <div>
            <div onClick={() => {
                setData(['A', 'B', 'G', 'F', 'B', 'D', 'E']);
            }}>setData
            </div>
            {
                data.map((item) => <div key={item}>{item}</div>)
            }
        </div>
    );
}
