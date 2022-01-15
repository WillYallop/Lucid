
import React, { useState, ReactElement } from 'react';
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import UtilityLoading from "../../Ultility/Loading";
import Modal from "../../Modal/Modal";
import NewPostTypeForm from "../../Modal/NewPostTypeForm";
// Icons
import { faFile } from '@fortawesome/free-solid-svg-icons';


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
    const [state, toggleState] = useState(false);

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
    if(error) return null;

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

    return (
        <div className="pagesSubSection">
            { postLinks }
            <button className="btnStyle1" onClick={() => toggleState(!state)}>New post type</button>
            <Modal 
            state={state} 
            toggleState={() => toggleState(!state)}
            title='Register a new post type'
            body='A post type is a category of page that can only use one template file.'>
                <NewPostTypeForm></NewPostTypeForm>
            </Modal>
        </div>
    )
}

export default NavigationPostLinks;