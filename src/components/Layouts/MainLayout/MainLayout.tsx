import Header from "@/components/Header/Header";
import { MainLayoutProps } from "./MainLayoutProps";
import Footer from "@/components/Footer/Footer";

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
    <>
        <Header/>
            {children}
        <Footer/>
    </>);
}

export default MainLayout;