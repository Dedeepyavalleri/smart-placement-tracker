import Navbar from "../components/Navbar";
import {
    useState,
    useEffect
}
from "react";

import StatusChart from "../components/StatusChart";

import PieChart from "../components/PieChart";
import Footer from "../components/Footer";

import {
    getDashboardStats
}
from "../services/dashboardService";
function Dashboard() {
    const [stats,setStats]=useState(null);
    const fetchDashboard =
async () => {

    try {

        const data =
            await getDashboardStats();

        console.log(data);

        setStats(data);

    } catch (error) {

        console.log(error);

    }

};
useEffect(() => {

    fetchDashboard();

}, []);

if (!stats) {

    return <h2>Loading...</h2>;

}
    return (
    <>
        <Navbar />

        <div className="container">

            <h1 className="dashboard-title">
                Dashboard
            </h1>

            <div className="stats-grid">

                <div className="stat-card applications-card">
                    <h3>Applications</h3>

                    <h2>
                        {stats.totalApplications}
                    </h2>
                </div>

                <div className="stat-card offers-card">
                    <h3>Offers</h3>

                    <h2>
                        {stats.totalOffers}
                    </h2>
                </div>

                <div className="stat-card rejections-card">
                    <h3>Rejections</h3>

                    <h2>
                        {stats.totalRejections}
                    </h2>
                </div>

                <div className="stat-card interviews-card">
                    <h3>Interviews</h3>

                    <h2>
                        {stats.totalInterviews}
                    </h2>
                </div>

            </div>

            <div className="chart-section">

                <h2>
                    Status Chart
                </h2>

                <StatusChart
                    statusSummary={
                        stats.statusSummary
                    }
                />

            </div>

            <div className="chart-section">

                <h2>
                    Status Distribution
                </h2>

                <PieChart
                    statusSummary={
                        stats.statusSummary
                    }
                />

            </div>

        </div>
        <Footer />
    </>
);

}

export default Dashboard;