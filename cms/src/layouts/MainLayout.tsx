// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";
import Modal from "../components/Modal/Modal";

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="mainLayoutCon">
            {/* Header */}
            <Header></Header>
            {/* Navigation */}
            <Navigation></Navigation>
            {/* Modal */}
            <Modal></Modal>
            {/* Main */}
            <main>
                { children }
            </main>
        </div>
    );
}

export default MainLayout;