
interface illustationMessageProps {
    img: string
    title: string
    body: string
}

const IllustrationMessage: React.FC<illustationMessageProps> = ({ img, title, body }) => {

    return (
        <div className="illustationCon">
            <img src={img}/>
            <p className="title">{ title }</p>
            <p>{ body }</p>
        </div>
    );
}

export default IllustrationMessage;