import PropTypes from 'prop-types';
function LockIcon({ className }) {
    return (
        <svg
            className={className}
            width='18'
            height='18'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M13.4228 7.44804V5.30104C13.4228 2.78804 11.3848 0.750045 8.87176 0.750045C6.35876 0.739045 4.31276 2.76704 4.30176 5.28104V5.30104V7.44804'
                stroke='#9E9DA8'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.683 19.2498H5.042C2.948 19.2498 1.25 17.5528 1.25 15.4578V11.1688C1.25 9.07383 2.948 7.37683 5.042 7.37683H12.683C14.777 7.37683 16.475 9.07383 16.475 11.1688V15.4578C16.475 17.5528 14.777 19.2498 12.683 19.2498Z'
                stroke='#9E9DA8'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M8.8623 12.2031V14.4241'
                stroke='#9E9DA8'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

LockIcon.propTypes = {
    className: PropTypes.string,
};

export default LockIcon;
