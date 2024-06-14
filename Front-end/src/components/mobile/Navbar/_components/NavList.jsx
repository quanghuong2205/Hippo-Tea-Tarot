import PropTypes from 'prop-types';
import NavItem from './NavItem';
function NavList({ list, openSub }) {
    return (
        <ul className='mobile-navbar__list'>
            {list.map((item) => (
                <NavItem
                    key={`mobile-navbar-item/${item.id}`}
                    item={item}
                    onClick={
                        item?.sub
                            ? openSub({
                                  sub: item.sub,
                                  title: item.label,
                                  icon: item?.icon,
                              })
                            : null
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
