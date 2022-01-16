// Layout
import MainLayout from "../../layouts/MainLayout";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Media: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <MainLayout>
            <DefaultPage
            title="Media"
            body="Manage all of your media!"
            sidebar={siderbar}>
                <p>Lorem ipsum dolar</p>
            </DefaultPage>
        </MainLayout>
    );
}

export default Media;