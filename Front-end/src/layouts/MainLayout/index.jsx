import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';

function MainLayout({ children }) {
    return (
        <div className='main-layout'>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.element,
};

export default MainLayout;
