import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Context
import { 
    PageNotificationContext, PageNotificationContextNoticationsObj,
    ModalContext
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
import formatLucidError from "../../functions/formatLucidError";
// Icons
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
// data
import { getSinglePostViaName } from '../../data/post';

const Pages: React.FC = () => {

    const navigate = useNavigate();
    const { post_name } = useParams();

    // -------------------------------------------------------
    // State
    // -------------------------------------------------------
    const [ allowSave, setAllowSave ] = useState(false);
    const [ pageLoaded, setPageLoaded ] = useState(false);
    const [ postNameParam, setPostNameParam ] = useState(post_name);
    const [ post, setPost ] = useState<mod_postObject>({} as mod_postObject);



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
        if(post_name != undefined) {
            getSinglePostViaName({
                __args: {
                    name: post_name
                },
                _id: true,
                name: true,
                template_path: true
            },
            (response) => {
                const post = response.data.data.post.get_single_by_name || undefined;
                if(post) {
                    setPost(post);
                }
                else {
                    navigate(`/404`);
                    addNotification(formatLucidError(response.data.errors[0].message).message, 'error');
                }
                setPageLoaded(true);
            },
            (err) => {
                console.log(err);
                setPageLoaded(true);
            })
        }
    }
    useEffect(() => {
        verifyPostType();
        return () => {
            setNotifications([]);
            setPost({} as mod_postObject)
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
                        _id={post._id}
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