import { useToasts } from 'react-toast-notifications';
// Components
import DefaultPage from "../components/Layout/DefaultPage";

const Dashboard: React.FC = () => {

    const { addToast } = useToasts();

    return (
        <DefaultPage
        title="dashboard"
        body="welcome to Lucid!">

            <button
            onClick={() => {
                addToast('This is an example success notification!', {
                    appearance: 'success'
                });
            }}>
                ADD SUCCESS
            </button>

            <button
            onClick={() => {
                addToast('This is an example error notification!', {
                    appearance: 'error'
                });
            }}>
                ADD ERROR
            </button>

            <button
            onClick={() => {
                addToast('This is an example warning notification!', {
                    appearance: 'warning'
                });
            }}>
                ADD WARNING
            </button>

        </DefaultPage>
    );
}

export default Dashboard;