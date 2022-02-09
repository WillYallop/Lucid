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
// Functions
import getApiUrl from "../../functions/getApiUrl";
import formatLucidError from "../../functions/formatLucidError";
// Icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const { loadingState, setLoadingState } = useContext(LoadingContext);
    const [ postNameParam, setPostNameParam ] = useState(post_name);
    const [ post, setPost ] = useState<postType>({} as postType);

    if(post_name != postNameParam) {
        setPostNameParam(post_name)
    }
    

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
        setLoadingState(true);
        axios({
            url: getApiUrl(),
            method: 'post',
            data: {
                query: `query {
                    post {
                        get_single_by_name (
                            name: "${postNameParam}"
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
            setLoadingState(false);
        })
        .catch((err) => {
            console.log(err);
            setLoadingState(false);
        })
    }
    useEffect(() => {
        verifyPostType();
        return () => {
            setNotifications([]);
        }
    }, []);


    // Sidebar Element
    const siderbar = (
        <>
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