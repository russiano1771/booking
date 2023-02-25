import './Home.scss'
import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import Covid from "../../components/covid/Covid";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import {Link} from "react-router-dom";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
const Home = () => {
    return (
        <div className={'home'}>
          <NavBar/>
            <Header/>
                <div className="homeContainer">
                    <Covid/>
                    <Featured/>
                    <h1 className="homeTitle">Поиск по типу размещения</h1>
                    <PropertyList/>
                    <div className={'lovelyPl'}>
                        <h1 className="homeTitle">Дома, которые нравятся гостям</h1>
                        <Link className={'Link'} to={''}>Посмотреть дома и апартаменты</Link>
                    </div>
                    <FeaturedProperties/>
                    <MailList/>
                    <Footer/>
                </div>



        </div>
    );
};

export default Home;