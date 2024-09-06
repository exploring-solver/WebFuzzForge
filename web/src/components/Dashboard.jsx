import { Container } from "@mui/material";

const Dashboard = ({ token }) => {
    return (
        <Container className="flex justify-center items-center text-4xl">
            <h1>Welcome to the Dashboard, please navigate to respective tools/services.</h1>
            {/* Add Report Generation component here */}
        </Container>
    );
};

export default Dashboard;