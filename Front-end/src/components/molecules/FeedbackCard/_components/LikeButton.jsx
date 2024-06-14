import PropTypes from 'prop-types';
import HeartIcon from '../../../icons/HeartIcon';
import {
    useLikeFeedback,
    useUnlikeFeedback,
} from '../../../../queries/useFeedback';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

function LikeButton({ hasLike, feedbackID, totalLikes }) {
    const [isLike, setIsLike] = useState(hasLike);
    const [likeNums, setLikeNums] = useState(totalLikes);

    /* Mutate query */
    const {
        mutate: LFMutate,
        isSuccess: LFIsSuccess,
        reset: LFReset,
    } = useLikeFeedback();
    const {
        mutate: ULFMutate,
        isSuccess: ULFIsSuccess,
        reset: ULFReset,
    } = useUnlikeFeedback();

    /* Like and Unlike handler */
    const handleReaction = () => {
        if (isLike) {
            ULFMutate({
                id: feedbackID,
            });

            return;
        }

        LFMutate({
            id: feedbackID,
        });
    };

    useEffect(() => {
        if (LFIsSuccess) {
            setIsLike(true);
            setLikeNums((prev) => prev + 1);
            LFReset();
            return;
        }

        if (ULFIsSuccess) {
            setIsLike(false);
            setLikeNums((prev) => prev - 1);
            ULFReset();
            return;
        }
    }, [LFIsSuccess, ULFIsSuccess, LFReset, ULFReset]);

    console.log(totalLikes);
    return (
        <button
            className={clsx({
                'review-card__like': true,
                liked: isLike,
            })}
            onClick={handleReaction}>
            <HeartIcon isBold={isLike} />
            <span>{likeNums}</span>
        </button>
    );
}

LikeButton.propTypes = {
    hasLike: PropTypes.bool,
    feedbackID: PropTypes.string,
    totalLikes: PropTypes.number,
};

export default LikeButton;
