
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Style: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="Style"
        body="Edit the style of your site!"
        sidebar={siderbar}>
            <p>Lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Style;