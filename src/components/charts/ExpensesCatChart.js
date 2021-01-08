import React, {useState} from 'react';
import { Bar} from 'react-chartjs-2';


const ExpensesCatChart = () => {
    const [chartData, setchartData] = useState({
        labels:['Boston', 'Colombo', 'Montreal', 'Toronto', 'Kandy'],
        datasets:[
            {label: 'Population',
                data:[405,124,405,122,5],
                backgroundColor:[
                    'rgba(255,99,132,0.6)',
                    'rgba(55,29,132,0.6)',
                    'rgba(55,0,232,0.6)',
                    'rgba(255,199,232,0.6)',
                    'rgba(255,9,232,0.6)'
                ]
        }
        ]
    })
  


    return(
        <div>
            <h4>Hello from Chart</h4>
            <Bar 
                data={chartData}
                options={{maintainAspectRatio: false}}

            />
        </div>
    )
}

export default ExpensesCatChart;