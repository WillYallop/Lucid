import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj,
    ModalContext, LoadingContext
} from "../../helper/Context";
// Components
import DefaultPage from "../../components/Layout/DefaultPage";
import PageList from "../../components/Pages/PageList";
import SidebarButton from "../../components/Layout/Sidebar/SidebarBtn";
import NewPageForm from "../Pages/Components/NewPageForm";
import SidebarLayout from "../../components/Layout/Sidebar/SidebarLayout";
import UpdatePostTypeForm from "./Components/UpdatePostForm";
import SidebarFormSubmit from "../../components/Layout/Sidebar/SidebarFormSubmit";
// Functions
import getApiUrl from "../../functions/getApiUrl";
import formatLucidError from "../../functions/formatLucidError";
// Icons
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

interface postType {
    _id: string
    name: string
    template_path: string
}

const Pages: React.FC = () => {

    const navigate = useNavigate();
    const { post_name } = useParams();

    // -------------------------------------------------------
    // State
    // -------------------------------------------------------
    const [ allowSave, setAllowSave ] = useState(false);
    const [ pageLoaded, setPageLoaded ] = useState(false);
    const [ postNameParam, setPostNameParam ] = useState(post_name);
    const [ post, setPost ] = useState<postType>({} as postType);



    // -------------------------------------------------------
    // Notification 
    // -------------------------------------------------------
    const { notifications, setNotifications } = useContext(PageNotificationContext);
    const addNotification = (message: string, type: 'error' | 'warning' | 'success') => {
        setNotifications((array: Array<PageNotificationContextNoticationsObj>) => [
            ...array,
            {
                message: message,
                type: type
            }
        ]);
    }

    // -------------------------------------------------------
    // Modal 
    // -------------------------------------------------------
    const { modalState, setModalState } = useContext(ModalContext);


    // -------------------------------------------------------
    // Data
    // -------------------------------------------------------

    // Verify the post type exists
    // Set post template file
    const verifyPostType = () => {
        setPageLoaded(false);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `query {
                    post {
                        get_single_by_name (
                            name: "${post_name}"
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
            const post: postType = result.data.data.post.get_single_by_name || undefined;
            if(post) {
                setPost(post);
            }
            else {
                navigate(`/404`);
                addNotification(formatLucidError(result.data.errors[0].message).message, 'error');
            }
            setPageLoaded(true);
        })
        .catch((err) => {
            console.log(err);
            setPageLoaded(true);
        })
    }
    useEffect(() => {
        verifyPostType();
        return () => {
            setNotifications([]);
            setPost({} as postType)
        }
    }, []);

    if(post_name != postNameParam) {
        verifyPostType();
        setPostNameParam(post_name);
        // window.location.reload();
    }

    // Sidebar Element
    const siderbar = (
        <>
            {
                allowSave
                ?
                <SidebarFormSubmit
                    text="save changes"
                    formID={'updatePostForm'}
                    icon={faSave}/>
                :
                null
            }
            <SidebarButton 
                text="new post page"
                action={() => { 
                    setModalState({
                        ...modalState,
                        state: true,
                        title: 'add new post page',
                        size: 'standard',
                        body: 'create and configure a new page',
                        element: <NewPageForm
                                    type={'post'}
                                    post_name={post_name}
                                    post_template={post.template_path}/>
                    });
                }}
                icon={faPlus}/>
            {
                pageLoaded ?
                <SidebarLayout>
                    <UpdatePostTypeForm 
                        name={post.name}
                        template={post.template_path}
                        post_id={post._id}
                        callback={setAllowSave}/>
                </SidebarLayout>
                : null
            }
        </>
    );

    return (
        <DefaultPage key={postNameParam}
        title={`post type - ${postNameParam}`}
        body={`create and manage all of your pages for the post type: ${postNameParam}!`}
        sidebar={siderbar}>
            <PageList
                type={'post'}
                post_name={postNameParam}/>
        </DefaultPage>
    );
}

export default Pages;