import {
    Pie
}
from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
}
from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({ statusSummary }) {

    const data = {

        labels:
            statusSummary.map(
                item => item.status
            ),

        datasets: [
            {
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
                width: "400px"
            }}
        >

            <Pie data={data} />

        </div>

    );

}

export default PieChart;