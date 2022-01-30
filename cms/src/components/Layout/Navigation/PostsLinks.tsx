
import React, { useContext, ReactElement, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
// Components
import CoreIcon from "../../Core/Icon";
import UtilityLoading from "../../Ultility/Loading";
import NewPostTypeForm from "../../Modal/NewPostTypeForm";
// Icons
import { faFile } from '@fortawesome/free-solid-svg-icons';
// Context
import { ModalContext } from "../../../helper/Context";
// Functions
import getApiUrl from "../../../functions/getApiUrl";

// Types
interface cont_post_postDeclaration {
    _id: string
    name: string
    template_name: string
}

const NavigationPostLinks: React.FC = () => {
    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);

    const openModal = () => {
        setModalState({
            ...modalState,
            state: true,
            title: 'Register a new post type',
            body: 'A post type is a category of page that can only use one template file.',
            element: <NewPostTypeForm/>
        });
    }

    // -----------------------------------------
    // handle post links 
    // -----------------------------------------
    const [ posts, setPosts ] = useState<Array<cont_post_postDeclaration>>([]);

    useEffect(() => {
        getAllPosts();
        return () => {
            setPosts([]);
        }
    }, []);

    const getAllPosts = () => {
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
              query: `
                query {
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
                }`
            }
        })
        .then((result) => {
            const allPosts: Array<cont_post_postDeclaration> = result.data.data.post.get_multiple || [];
            setPosts((posts) => [
                ...posts,
                ...allPosts
            ]);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    let postLinks: Array<ReactElement> = [];
    if(posts.length) {
        posts.forEach((post) => {
            let path = `/posts/${post.name}`;
            let ele = (
                <li className="navItem" key={post._id}>
                    <NavLink to={path} className={(navData) => navData.isActive ? "active" : "" }>
                        <CoreIcon icon={faFile}/> { post.name }
                    </NavLink >
                </li>
            );
            postLinks.push(ele);
        });
    } 
    else {
        return (
            <div className="pagesSubSection">
                <div className="postsLoadingCon">
                    <UtilityLoading mode="dark"/>
                </div>
            </div>
        )
    }


    return (
        <div className="pagesSubSection">
            { postLinks }
            <button className="btnStyle1" onClick={() => openModal()}>New post type</button>

        </div>
    )
}

export default NavigationPostLinks;