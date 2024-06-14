import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, linkTo, className, onClick, urlState = {} }) {
    if (linkTo) {
        return (
            <Link
                onClick={onClick}
                className={className}
                to={linkTo}
                state={urlState}>
                {children}
            </Link>
        );
    }
    return (
        <button
            type='button'
            onClick={onClick}
            className={className}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.element,
    linkTo: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    urlState: PropTypes.object,
};

export default Button;
