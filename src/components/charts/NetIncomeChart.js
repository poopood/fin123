import React, {useState} from 'react';
import { Bar,HorizontalBar } from 'react-chartjs-2';


const NetIncomeChart = (props) => {

    const [chartData, setchartData] = useState({
        labels:["Income", "Expenses", "Net Income"],
        datasets:[{
            label: 'Dataset 1',
            borderWidth: 1,
            data: [props.totalIncome, -(props.totalExpense), props.netIncome],
            backgroundColor: ["#669911", "#119966","#1A2066"],
            hoverBackgroundColor: ["#66A2EB", "#FCCE56","#FC2E56"]
        }]
    })
    return(
        <div id="chart-net-income">
            <p>Net Income Chart</p>
            <HorizontalBar
            data={chartData}
            options={{
                scales: {
                    xAxes: [{
                        
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                
 
              }}}
        />
        </div>
    )
}

export default NetIncomeChart;