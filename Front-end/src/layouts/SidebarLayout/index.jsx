'use strict';
import PropTypes from 'prop-types';

import SideBar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

function SidebarLayout({ children }) {
    return (
        <div className='main-layout with-sidebar'>
            <Header />
            <main>
                <SideBar />
                <div className='content'>{children}</div>
            </main>
            <Footer />
        </div>
    );
}

SidebarLayout.propTypes = {
    children: PropTypes.element,
};

export default SidebarLayout;
