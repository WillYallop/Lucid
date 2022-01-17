// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import ComponentList from "./Components/ComponentList";

const Components: React.FC = () => {

    const siderbar = (
        <p>I am a sidebar</p>
    )

    return (
        <DefaultPage
        title="Components"
        body="Manage all of your components!"
        sidebar={siderbar}>
            {/* Component List */}
            <ComponentList/>
        </DefaultPage>
    );
}

export default Components;