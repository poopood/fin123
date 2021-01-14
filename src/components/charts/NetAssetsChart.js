import React, {useState} from 'react';
import { Bar,HorizontalBar } from 'react-chartjs-2';


const NetAssetChart = () => {

    const [chartData, setchartData] = useState({
        labels:["Income", "Expenses", "Net Income"],
        datasets:[{
            label: 'Dataset 1',
            borderWidth: 1,
            data: [100, -75, 32],
            backgroundColor: ["#669911", "#119966","#1A2066"],
            hoverBackgroundColor: ["#66A2EB", "#FCCE56","#FC2E56"]
        }]
    })
    return(
        <div>
            <h4>Hello from Net Asset Chart</h4>
            <HorizontalBar
            data={chartData}
            options={{
                scales: {
                    xAxes: [{
                        ticks: {
                            min: -100
                        }
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                
 
              }}}
        />
        </div>
    )
}

export default NetAssetChart;