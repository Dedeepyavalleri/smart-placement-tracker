import {
    Bar
}
from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
}
from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function StatusChart({ statusSummary }) {

    const chartData = {

        labels:
            statusSummary.map(
                item => item.status
            ),

        datasets: [
            {
                label:
                    "Applications",

                data:
                    statusSummary.map(
                        item => item.count
                    )
            }
        ]
    };

    return (

        <div
            style={{
                width: "600px"
            }}
        >

            <Bar
                data={chartData}
            />

        </div>

    );

}

export default StatusChart;