'use strict';

import { FaRegCalendarAlt } from 'react-icons/fa';

function FeedCard() {
    return (
        <div className='feed-card'>
            <div className='feed-card__media'>
                <img
                    src='https://th.bing.com/th/id/OIP.aBRor-CKT568KkaYq0lPRAHaEK?w=306&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                    alt=''
                />
            </div>
            <h3 className='feed-card__title'>
                <a
                    href='#'
                    className='line-clamp'
                    style={{
                        '--line-clamp': '2',
                    }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Amet, nesciunt?
                </a>
            </h3>
            <p className='feed-card__time'>
                <FaRegCalendarAlt />
                <span>15/04/2024, 12:07</span>
            </p>
            <div className='feed-card__user'>
                <div className='feed-card__user__avatar'>
                    <a href='#'>
                        <img
                            className='fit'
                            src='https://th.bing.com/th/id/OIP.jUhREZmYLBkJCe7cmSdevwHaEX?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                            alt=''
                        />
                    </a>
                </div>
                <h4 className='feed-card__user__name'>
                    <a href='#'>quanghuong2205</a>
                </h4>
            </div>
        </div>
    );
}

export default FeedCard;
