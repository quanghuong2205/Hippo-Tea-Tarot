import Button from '../../../components/atoms/Button';
import { useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../../constants/header.const';
import { clsx } from 'clsx';

function Navigate() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='navigate'>
            <ul>
                {NAV_LINKS.map((link) => (
                    <li
                        className={clsx({
                            active: currentPath === link.path,
                        })}
                        key={link.path}>
                        <Button
                            className={'navigate__link'}
                            linkTo={link.path}>
                            <>
                                <link.icon className='navigate__icon' />
                                <span className='navigate__text'>
                                    {link.label}
                                </span>
                            </>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navigate;
