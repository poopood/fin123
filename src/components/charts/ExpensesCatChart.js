import React, {useState} from 'react';
import { Bar} from 'react-chartjs-2';


const ExpensesCatChart = (props) => {
    console.log(props, 'expense chart')
    var eCats = props.result.map(e => {
        return e.name
    })
    var eCatCount = props.result.map(e => {
        return e.count
    })
    console.log(eCats, eCatCount)
    const [chartData, setchartData] = useState({
        labels:eCats,
        datasets:[
            {label: 'Expense Total by Category for the current month',
                data:eCatCount,
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