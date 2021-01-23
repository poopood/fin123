import React, {useState} from 'react';
import { Bar,Doughnut } from 'react-chartjs-2';


const IncomeCatChart = (props) => {
    console.log(props, 'Income chart')
    var iCats = props.result1.map(e => {
        return e.name
    })
    var iCatCount = props.result1.map(e => {
        return e.count
    })
  
    const [chartData, setchartData] = useState({
        labels:iCats,
        datasets:[
            {label: 'Income Total by Category for the current month',
                data:iCatCount,
                backgroundColor:[
                    'rgba(255,99,12,0.6)',
                    'rgba(55,129,52,0.6)',
                    'rgba(55,0,232,0.6)',
                    'rgba(255,199,232,0.6)',
                    'rgba(255,9,232,0.6)'
                ]
        }
        ]
    })
  
  


    return(
        <div>
            <h4>Hello from Income Chart</h4>
            <Doughnut 
                data={chartData}
                options={{maintainAspectRatio: false}}

            />
        </div>
    )
}

export default IncomeCatChart;