
import React, { useContext, ReactElement, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
// Components
import CoreIcon from "../../Core/Icon";
import NewPostTypeForm from "../../../views/Posts/Components/NewPostTypeForm";
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
    template_path: string
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
            title: 'register a new post type',
            size: 'standard',
            body: 'a post type is a category of page that can only use one template file.',
            element: <NewPostTypeForm callback={addPostCallback}/>
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
                            template_path
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
    const addPostCallback = () => {
        setPosts([]);
        getAllPosts();
        setModalState({
            ...modalState,
            state: false
        });
    }

    let postLinks: Array<ReactElement> = [];
    posts.forEach((post) => {
        let path = `/posts/${post.name}`;
        let ele = (
            <li className="navItem" key={post._id}>
                <NavLink to={path} className={(navData) => navData.isActive ? "active" : "" }>
                    <CoreIcon icon={faFile}/> { post.name.replace('_', ' ') }
                </NavLink>
            </li>
        );
        postLinks.push(ele);
    });

    return (
        <div className="pagesSubSection">
            { postLinks }
            <button className="btnStyle1" onClick={() => openModal()}>new post type</button>
        </div>
    )
}

export default NavigationPostLinks;