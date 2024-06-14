import ScrollList from '../../components/common/ScrollList';
import FeedCard from '../../components/molecules/FeedCard';
function Home() {
    return (
        <div className='home page'>
            <div className='container'>
                <div className='home-slideshow slideshow'>
                    <div className='slideshow-left'>
                        <h3 className='slideshow__title'>
                            Sữa chua nếp nha đam
                        </h3>
                        <p className='slideshow__desc'>
                            Sản phẩm sữa chua nếp nha đam là sự kết hợp
                            tinh tế giữa
                        </p>
                        <a
                            href='#'
                            className='slideshow__link'>
                            Sản phẩm mới
                        </a>
                    </div>

                    <div className='slideshow-right'>
                        <div className='slideshow__image'></div>
                    </div>
                </div>

                <div className='home-content'>
                    <ScrollList
                        title={'Tin mới'}
                        RenderComponent={() => (
                            <>
                                <div className='col col-3 col-md-10'>
                                    <FeedCard />
                                </div>

                                <div className='col col-3 col-md-10'>
                                    <FeedCard />
                                </div>

                                <div className='col col-3 col-md-10'>
                                    <FeedCard />
                                </div>

                                <div className='col col-3 col-md-10'>
                                    <FeedCard />
                                </div>
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
