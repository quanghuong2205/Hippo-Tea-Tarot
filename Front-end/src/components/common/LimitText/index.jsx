import PropTypes from 'prop-types';
function LimitText({ className }) {
    const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate officia praesentium deserunt veritatis esse eum velit quas dolorum adipisci.`;
    return (
        <div className='limit-text'>
            <p className={className}>{content}</p>

            <button className='limit-text__expand-btn'>Xem thêm</button>
        </div>
    );
}

LimitText.propTypes = {
    className: PropTypes.string,
};

export default LimitText;
