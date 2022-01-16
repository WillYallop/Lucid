// Layout
import MainLayout from "../../layouts/MainLayout";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Components: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <MainLayout>
            <DefaultPage
            title="Components"
            body="Manage all of your components!"
            sidebar={siderbar}>
                <p>Lorem ipsum dolar</p>
            </DefaultPage>
        </MainLayout>
    );
}

export default Components;