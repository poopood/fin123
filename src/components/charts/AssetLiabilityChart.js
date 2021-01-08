import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';


const AssetLiabilityChart = () => {
    const [chartData, setchartData] = useState({
        labels:["Assets", "Liabilities"],
        datasets:[{
            label: 'Washing and cleaning',
            data: [0, 8],
            backgroundColor: '#22aa99'
         }, {
            label: 'Traffic tickets',
            data: [0, 2],
            backgroundColor: '#994499'
         }, {
            label: 'Tolls',
            data: [0, 1],
            backgroundColor: '#316395'
         }, {
            label: 'Parking',
            data: [5, 2],
            backgroundColor: '#b82e2e'
         }, {
            label: 'Car tax',
            data: [0, 1],
            backgroundColor: '#66aa00'
         }, {
            label: 'Repairs and improvements',
            data: [0, 2],
            backgroundColor: '#dd4477'
         }, {
            label: 'Maintenance',
            data: [6, 1],
            backgroundColor: '#0099c6'
         }, {
            label: 'Inspection',
            data: [0, 2],
            backgroundColor: '#990099'
         }, {
            label: 'Loan interest',
            data: [0, 3],
            backgroundColor: '#109618'
         }, {
            label: 'Depreciation of the vehicle',
            data: [0, 2],
            backgroundColor: '#109618'
         }, {
            label: 'Fuel',
            data: [0, 1],
            backgroundColor: '#dc3912'
         }, {
            label: 'Insurance and Breakdown cover',
            data: [4, 0],
            backgroundColor: '#3366cc'
         }]
    })

    return(
        <div>
            <h4>Hello from Stacked chart</h4>
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