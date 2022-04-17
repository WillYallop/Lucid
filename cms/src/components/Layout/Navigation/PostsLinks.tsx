
import React, { useContext, ReactElement, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
// Components
import CoreIcon from "../../Core/Icon";
import NewPostTypeForm from "../../../views/Posts/Components/NewPostTypeForm";
// Icons
import { faFile } from '@fortawesome/free-solid-svg-icons';
// Context
import { ModalContext } from "../../../helper/Context";
// data
import { getMultiplePosts } from '../../../data/post';

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
        getMultiplePosts({
            __args: {
                all: true
            },
            _id: true,
            name: true,
            template_path: true
        },
        (response) => {
            const allPosts: Array<cont_post_postDeclaration> = response.data.data.post.get_multiple || [];
            setPosts((posts) => [
                ...posts,
                ...allPosts
            ]);
        },
        (err) => {
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
        const linkTarget = {
            pathname: path,
            key: post._id,
        };
        let ele = (
            <li className="navItem" key={post._id}>
                <NavLink to={linkTarget} className={(navData) => navData.isActive ? "active" : "" }>
                    <CoreIcon icon={faFile} style={'transparent'}/> { post.name.replace('_', ' ') }
                </NavLink>
            </li>
        );
        postLinks.push(ele);
    });

    return (
        <div className="pagesSubSection">
            { postLinks }
            <button className="btnStyle1 btnStyle1--thin" onClick={() => openModal()}>new post type</button>
        </div>
    )
}

export default NavigationPostLinks;