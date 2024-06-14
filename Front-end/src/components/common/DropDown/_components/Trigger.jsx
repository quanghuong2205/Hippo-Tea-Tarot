import PropTypes from 'prop-types';
function Trigger({ children, handleShowOrHidden }) {
    return (
        <div
            onClick={handleShowOrHidden}
            className='dropdown-trigger'>
            {children}
        </div>
    );
}

Trigger.propTypes = {
    children: PropTypes.element,
    handleShowOrHidden: PropTypes.func,
};

export default Trigger;
