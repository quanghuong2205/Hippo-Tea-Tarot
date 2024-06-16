import PropTypes from 'prop-types';
function LogoSkeleton({ slogan }) {
    return (
        <div className='logo skeleton'>
            <div className='logo__image skeleton-round'></div>

            {!slogan && <p className='logo__slogan skeleton-text'></p>}
        </div>
    );
}

LogoSkeleton.propTypes = {
    slogan: PropTypes.string,
};

export default LogoSkeleton;
