// Components
import Header from "../components/Layout/Header";
import Navigation from "../components/Layout/Navigation/Navigation";


const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="mainLayoutCon">
            {/* Header */}
            <Header></Header>
            {/* Navigation */}
            <Navigation></Navigation>
            {/* Main */}
            <main>
                { children }
            </main>
        </div>
    );
}

export default MainLayout;