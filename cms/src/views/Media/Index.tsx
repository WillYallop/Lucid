
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Media: React.FC = () => {

    const siderbar = (
        <p>i am a sidebar</p>
    )

    return (
        <DefaultPage
        title="media"
        body="manage all of your media!"
        sidebar={siderbar}>
            <p>lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Media;