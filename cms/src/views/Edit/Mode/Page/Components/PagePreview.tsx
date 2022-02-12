

const PagePreview: React.FC = () => {

    const setIframeContent = `<p>hello</p>`;

    return (
        <div>
            <iframe srcDoc={setIframeContent} sandbox=""></iframe>
        </div>
    )
}

export default PagePreview;