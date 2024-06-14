import PropTypes from 'prop-types';
import { useState } from 'react';
import FeedReactV1 from '../FeedReact/FeedReactV1';
import ReplyBox from '../ReplyBox';
import Options from './_components/Options';

function CommentCard({ hasReply = true }) {
    const [isShownReplyBox, setIsShownReplyBox] = useState(false);

    const toggleReplyBoxState = () => setIsShownReplyBox(!isShownReplyBox);

    return (
        <div className='commentCard'>
            <div className='commentCard-user'>
                <div className='commentCard-user__avatar'>
                    <img
                        className='fit'
                        src='https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/432773484_1123927692082227_4527695904993806609_n.jpg?stp=cp0_dst-jpg_p48x48&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QJayMbg4GisAb6D2Kg3&_nc_ht=scontent.fhan2-3.fna&oh=00_AfAYVrkKNo_9hqlhy8Woaqe9cBmltQdR55FiYZOZH-IlfA&oe=6626630F'
                        alt=''
                    />
                </div>
            </div>
            <div className='commentCard-body'>
                <div className='commentCard-content'>
                    <div className='commentCard-content__username'>
                        quanghuy.2205
                    </div>
                    <div className='commentCard-content__text'>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Ducimus neque magnam reprehenderit cum,
                        laudantium odio. Non assumenda quidem blanditiis
                        nisi.
                    </div>
                    <div className='commentCard-content__react-counts'>
                        <FeedReactV1 />
                        <span>1</span>
                    </div>
                </div>

                <div className='commentCard-bottom'>
                    <div>
                        <button className='commentCard-react'>
                            Thích
                        </button>

                        <button
                            className='commentCard-react'
                            onClick={toggleReplyBoxState}>
                            Trả lời
                        </button>

                        <span className='commentCard-time'>
                            25 ngày trước
                        </span>
                    </div>
                    <Options />
                </div>

                {isShownReplyBox && (
                    <ReplyBox toggleReplyBoxState={toggleReplyBoxState} />
                )}

                {hasReply && (
                    <div className='commentCard__replies'>
                        <CommentCard hasReply={false} />
                    </div>
                )}
            </div>
        </div>
    );
}

CommentCard.propTypes = {
    hasReply: PropTypes.bool,
};

export default CommentCard;
