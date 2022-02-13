
interface editPageComponentFormProps {
    component: mod_componentModel
}

const EditPageComponentForm: React.FC<editPageComponentFormProps> = ({ component }) => {

    console.log(component);

    return (
        <div className="body">
            { component.name }
        </div>
    )
}

export default EditPageComponentForm;