
interface editPageComponentProps {
    page_component: mod_page_componentModel
    exit: () => void
}

const EditPageComponent: React.FC<editPageComponentProps> = ({ page_component, exit }) => {

    console.log(page_component);

    return (
        <div className="body">
            <button onClick={exit}>exit</button>
            { page_component.component.name }
        </div>
    )
}

export default EditPageComponent;