import PropTypes from 'prop-types';
function ThreeDotsIcon({ classaName }) {
    return (
        <svg
            className={classaName}
            aria-label='More options'
            fill='currentColor'
            height='24'
            role='img'
            viewBox='0 0 24 24'
            width='24'>
            <title>More options</title>
            <circle
                cx='12'
                cy='12'
                r='1.5'></circle>
            <circle
                cx='6'
                cy='12'
                r='1.5'></circle>
            <circle
                cx='18'
                cy='12'
                r='1.5'></circle>
        </svg>
    );
}

ThreeDotsIcon.propTypes = {
    classaName: PropTypes.string,
};

export default ThreeDotsIcon;
