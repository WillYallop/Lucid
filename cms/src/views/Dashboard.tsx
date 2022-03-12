
import { useState } from "react";
// Components
import DefaultPage from "../components/Layout/DefaultPage";
// data
import { generateSite } from '../data/generator';


const Dashboard: React.FC = () => {
    
    const [ siteBuilt, setSiteBuilt ] = useState(false);
    const [ publishRes, setPublishRes ] = useState<mod_generateSite>({} as mod_generateSite);

    const publishSite = () => {
        generateSite({
            __args: {},
            build_time: true,
            pages_built: true
        },
        (response) => {
            const data: mod_generateSite = response.data.data.generator.site || {};
            setPublishRes(data);
            setSiteBuilt(true);
        },
        (err) => {
            console.log(err);
        })
    }

    return (
        <DefaultPage
        title="dashboard"
        body="welcome to Lucid!">

            

            <button className="btnStyle1" onClick={publishSite}>Publish Site</button>
            { 
                siteBuilt ?
                    <>
                        <p>Build duration: { publishRes.build_time }</p>
                        <p>Pages built: { publishRes.pages_built }</p>
                        <a href="http://lucid.local/" target="_blank">Vist website</a>
                    </>
                : null 
            }
        </DefaultPage>
    );
}

export default Dashboard;