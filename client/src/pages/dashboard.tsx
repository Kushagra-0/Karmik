import Navbar from "../components/navbar";
import DonorDashboard from "./donorDashboard";
import ReceiverDashboard from "./receiverDashboard";


const Dashboard = () => {
    const role = localStorage.getItem('role'); // Retrieve role from local storage

    if (!role) {
        return <p>Error: User role not found.</p>;
    }

    return (
        <div>
            <Navbar/>
            <h1>Dashboard</h1>
            {role === 'donor' && <DonorDashboard />}
            {role === 'receiver' && <ReceiverDashboard />}
        </div>
    );
};

export default Dashboard;
