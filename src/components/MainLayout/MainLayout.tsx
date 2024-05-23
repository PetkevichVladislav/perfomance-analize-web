import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import { MainLayoutProps } from "./MainLayoutProps";

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
    <>
        <Header/>
            {children}
        <Footer/>
    </>);
}

export default MainLayout;