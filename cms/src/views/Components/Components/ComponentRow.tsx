interface ComponentRowProps {
    component: {
        date_added: string
        description: string
        name: string
        preview_url: string
        _id: string
    }
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component }) => {

    return (
        <div className="blockCon">
            { component._id }
        </div>
    )
}

export default ComponentRow;