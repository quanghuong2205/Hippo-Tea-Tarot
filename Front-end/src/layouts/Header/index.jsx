import Logo from '../../components/molecules/Logo';
import HeaderOnMobile from '../../components/mobile/Header';
import HeaderRight from './_components/HeaderRight';
const isMobile = true;
function Header() {
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    {!isMobile ? (
                        <>
                            <div className='header-left'>
                                <Logo slogan={''} />
                            </div>
                            <HeaderRight />
                        </>
                    ) : (
                        <HeaderOnMobile />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
