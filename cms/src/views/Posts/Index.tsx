
// Components
import DefaultPage from "../../components/Layout/DefaultPage";

const Posts: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="posts"
        body="create and manage all of your blog posts!"
        sidebar={siderbar}>
            <p>lorem ipsum dolar</p>
        </DefaultPage>
    );
}

export default Posts;