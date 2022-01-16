// Layout
import MainLayout from "../layouts/MainLayout";
// Components
import DefaultPage from "../components/Layout/DefaultPage";

const Dashboard: React.FC = () => {


    return (
        <MainLayout>
            <DefaultPage
            title="Dashboard"
            body="Welcome to Lucid!">
                <p>Lorem ipsum dolar</p>
            </DefaultPage>
        </MainLayout>
    );
}

export default Dashboard;