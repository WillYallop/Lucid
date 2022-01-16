// Layout
import MainLayout from "../../layouts/MainLayout";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Settings: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <MainLayout>
            <DefaultPage
            title="Settings"
            body="Manage your sites settings!"
            sidebar={siderbar}>
                <p>Lorem ipsum dolar</p>
            </DefaultPage>
        </MainLayout>
    );
}

export default Settings;