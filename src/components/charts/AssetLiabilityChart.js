import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';


const AssetLiabilityChart = (props) => {
    const [chartData, setchartData] = useState({
        labels:["Assets", "Liabilities"],
        datasets:props.accountChartData
    })

    return(
        <div>
            <h4>Hello from Accounts chart</h4>
            <Bar
                data={chartData}
                options={{
                    legend: {
                       position: 'right' // place legend on the right side of chart
                    },scales: {
                    xAxes: [{
                      stacked: true
                    }],
                    yAxes: [{
                      stacked: true
                    }]
                  }}}
            />
        </div>
    )
}


export default AssetLiabilityChart;