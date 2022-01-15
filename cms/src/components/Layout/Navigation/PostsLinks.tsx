
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import UtilityLoading from "../../Ultility/Loading";
// Icons
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { ReactElement } from "react";


// Types
interface cont_post_postDeclaration {
    _id: string
    name: string
    template_name: string
}

// Get multiple posts query
const GET_MULTIPLE_POSTS = gql`query {
    post {
        get_multiple
        (
            all: true
        )
        {
            _id
            name
            template_name
        }
    }
}`;

const NavigationPostLinks: React.FC = () => {

    // -----------------------------------------
    // handle post links 
    // -----------------------------------------
    const { loading, error, data } = useQuery(GET_MULTIPLE_POSTS);

    if (loading) return (
        <div className="pagesSubSection">
            <div className="postsLoadingCon">
                <UtilityLoading mode="dark"/>
            </div>
        </div>
    )
    if(error) console.log(error);

    let postLinks: Array<ReactElement> = [];
    if(data && data.post) {
        let posts: Array<cont_post_postDeclaration> = data.post.get_multiple;
        if(posts) {
            posts.forEach((postObj) => {
                let path = `/posts/${postObj.name}`;
                let ele = (
                    <li className="navItem" key={postObj._id}>
                        <NavLink to={path} className={(navData) => navData.isActive ? "active" : "" }>
                            <CoreIcon icon={faFile}/> { postObj.name }
                        </NavLink >
                    </li>
                );
                postLinks.push(ele);
            });
        }
    }

    // -----------------------------------------
    // handle add post type
    // -----------------------------------------
    const addPostType = () => {
        console.log('hello!')
    }


    return (
        <div className="pagesSubSection">
            { postLinks }
            <button className="btnStyle1" onClick={addPostType}>New post type</button>
        </div>
    )
}

export default NavigationPostLinks;