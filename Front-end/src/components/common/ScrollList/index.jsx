import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ScrollList({
    RenderComponent,
    title,
    link,
    itemLen = 10,
    maxVisibleItems = 9,
}) {
    return (
        <div className='scrollList'>
            <div className='scrollList__header'>
                <h3 className='scrollList__title'>{title}</h3>

                {itemLen > maxVisibleItems && (
                    <Link
                        className='scrollList__link'
                        to={link}>
                        Xem tất cả
                    </Link>
                )}
            </div>
            <div className='scrollList__content'>
                <div className='row gy-0 gx-3 gx-md-2'>
                    {RenderComponent()}
                </div>
            </div>
        </div>
    );
}

ScrollList.propTypes = {
    RenderComponent: PropTypes.func,
    title: PropTypes.string,
    link: PropTypes.string,
    itemLen: PropTypes.number,
    maxVisibleItems: PropTypes.number,
};

export default ScrollList;
