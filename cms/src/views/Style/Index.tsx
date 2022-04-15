
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Style: React.FC = () => {

    const siderbar = (
        <p>i am a sidebar</p>
    )

    return (
        <DefaultPage
        title="style"
        body="edit the style of your site!"
        sidebar={siderbar}>
            <p>lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Style;