
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Settings: React.FC = () => {

    const siderbar = (
        <p>i am a sidebar</p>
    )

    return (
        <DefaultPage
        title="settings"
        body="manage your sites settings!"
        sidebar={siderbar}>
            <p>lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Settings;