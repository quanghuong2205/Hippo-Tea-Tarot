import PropTypes from 'prop-types';
import NavItem from './NavItem';
import useUserMenu from '../../../../hooks/useUserMenu';
function NavList({ list, openSub }) {
    const { getHandler } = useUserMenu();

    return (
        <ul className='mobile-navbar__list'>
            {list.map((item) => (
                <NavItem
                    key={`mobile-navbar-item/${item.id}`}
                    item={item}
                    handleOnClick={
                        item?.sub
                            ? openSub({
                                  sub: item.sub,
                                  title: item.label,
                                  icon: item?.icon,
                              })
                            : getHandler({ id: item.id })
                    }
                />
            ))}
        </ul>
    );
}

NavList.propTypes = {
    list: PropTypes.array,
    openSub: PropTypes.func,
};

export default NavList;
