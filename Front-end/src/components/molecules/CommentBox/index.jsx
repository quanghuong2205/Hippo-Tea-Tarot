import FlyIcon from '../../icons/FlyIcon';
import EmotionIcon from '../../icons/EmotionIcon';
import { useState } from 'react';
import { clsx } from 'clsx';

function CommentBox() {
    const [commentText, setCommentText] = useState('');
    const setText = (event) => {
        setCommentText(event.target.value);
    };
    return (
        <div className='commentBox'>
            <div className='commentBox-user'>
                <div className='commentBox-user__avatar'>
                    <img
                        className='fit'
                        src='https://th.bing.com/th/id/OIP.jUhREZmYLBkJCe7cmSdevwHaEX?w=274&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                        alt=''
                    />
                </div>
            </div>

            <div className='commentBox-content'>
                <div className='commentBox__box'>
                    <textarea
                        value={commentText}
                        onChange={setText}
                        placeholder='Bình luận với tên quanghuong.2205'
                        spellCheck='false'></textarea>
                </div>
                <div className='commentBox__options'>
                    <div className='commentBox__options__left'>
                        <div className='commentBox__option'>
                            <EmotionIcon />
                        </div>
                    </div>

                    <div className='commentBox__options__right'>
                        <div
                            className={clsx({
                                commentBox__option: true,
                                disable: commentText === '',
                            })}>
                            <FlyIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentBox;
