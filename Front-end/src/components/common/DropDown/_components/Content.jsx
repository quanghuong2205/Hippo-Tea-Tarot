import PropTypes from 'prop-types';
function Content({ children }) {
    return (
        <div
            className='dropdown-content'
            style={{ top: 'calc(100% + 10px)', right: '0' }}>
            {children}
        </div>
    );
}

Content.propTypes = {
    children: PropTypes.element,
};

export default Content;
