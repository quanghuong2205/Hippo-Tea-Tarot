import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useUpdateReply } from '../../../../queries/useFeedback';
import { IoChevronDown } from 'react-icons/io5';

const isAdmin = false;

function AdminResponse({ reply, user, feedbackID }) {
    const [replyText, setReplyText] = useState(reply);
    const [isEdit, setIsEdit] = useState(false);
    const [isShownResponse, setIsShownResponse] = useState(false);
    const { mutate, error, isSuccess } = useUpdateReply();

    const handleSendResponse = () => {
        mutate({
            replyText,
            id: feedbackID,
        });
    };

    useEffect(() => {
        if (!error && isSuccess) {
            setIsEdit(false);
        }
    }, [error, isSuccess]);

    return (
        <div className='review-card__response'>
            {!isAdmin && (
                <button
                    className={clsx({
                        'review-card__response__expand-btn': true,
                        narrow: !isShownResponse,
                    })}
                    onClick={() => setIsShownResponse(!isShownResponse)}>
                    <span>Phản hồi của người bán</span>
                    <IoChevronDown />
                </button>
            )}

            {!isAdmin && isShownResponse && (
                <div className='review-card__response__inner'>
                    <span className='review-card__response__title'>
                        Phản hồi từ Hippo:{' '}
                    </span>
                    <p className='review-card__response__content'>
                        {reply}
                    </p>
                </div>
            )}

            {isAdmin && (
                <div className='review-card__response__inner admin'>
                    <textarea
                        className={clsx({
                            disable: !isEdit,
                        })}
                        onChange={(e) => setReplyText(e.target.value)}
                        spellCheck={false}
                        name='review-content'
                        id='review-content'
                        value={replyText}
                        placeholder={
                            replyText === ''
                                ? `Trả lời phản hồi từ ${user.name}...`
                                : ''
                        }></textarea>

                    <div className='review-card__response__options'>
                        <button
                            onClick={
                                isEdit
                                    ? handleSendResponse
                                    : () => setIsEdit(true)
                            }
                            type='button'
                            className='pri-btn review-card__response__act-btn'>
                            {isEdit ? 'Hoàn thành' : 'Chỉnh sửa'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

AdminResponse.propTypes = {
    reply: PropTypes.string,
    feedbackID: PropTypes.string,
    user: PropTypes.object,
};

export default AdminResponse;
