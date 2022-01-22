interface ComponentRowProps {
    component: {
        date_added: string
        description: string
        name: string
        preview_url: string
        _id: string
    },
    expanded: boolean
}

const ComponentRow: React.FC<ComponentRowProps> = ({ component, expanded }) => {

    if(expanded) {
        return (
            <div className="blockCon">
                <p>Expanded</p>
                { component._id }
            </div>
        )
    }
    else {
        return (
            <div className="blockCon">
                { component._id }
            </div>
        )
    }
}

export default ComponentRow;