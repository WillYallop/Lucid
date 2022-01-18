
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Posts: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="Posts"
        body="Create and manage all of your blog posts!"
        sidebar={siderbar}>
            <p>Lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Posts;