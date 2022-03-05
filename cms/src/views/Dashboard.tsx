
import { useState } from "react";
import axios from 'axios';
// Components
import DefaultPage from "../components/Layout/DefaultPage";
// fuctions
import getApiUrl from "../functions/getApiUrl";

const Dashboard: React.FC = () => {
    
    interface generateRes {
        build_time: number
        pages_built: number
    }
    const [ siteBuilt, setSiteBuilt ] = useState(false);
    const [ publishRes, setPublishRes ] = useState<generateRes>({} as generateRes);

    const publishSite = () => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `query {
                generator {
                    site {
                        build_time
                        pages_built
                    }
                }
            }`
            }
        })
        .then((result) => {
            const data: generateRes = result.data.data.generator.site || {};
            setPublishRes(data);
            setSiteBuilt(true);
        })
        .catch((err) => {
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