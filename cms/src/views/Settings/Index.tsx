
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Settings: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="Settings"
        body="Manage your sites settings!"
        sidebar={siderbar}>
            <p>Lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Settings;