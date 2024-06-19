import PropTypes from 'prop-types';
import HeartIcon from '../../../icons/HeartIcon';
import {
    useLikeFeedback,
    useUnlikeFeedback,
} from '../../../../queries/useFeedback';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import useRequireAuth from '../../../../hooks/useRequireAuth';
import CircleLoading from '../../../loaders/CircleLoading';

function LikeButton({ likes = [], feedbackID }) {
    const { requireSignIn } = useRequireAuth();
    /* Auth state */
    const auth = useSelector((state) => state.auth);
    const userID = auth.user?._id;

    const [isLike, setIsLike] = useState(likes.includes(userID));
    const [likeNums, setLikeNums] = useState(likes.length);

    /* Mutate query */
    const {
        mutate: LFMutate,
        isFinished: LFIsFinished,
        isLoading: LFIsLoading,
        reset: LFReset,
    } = useLikeFeedback();
    const {
        mutate: ULFMutate,
        isFinished: ULFIsFinished,
        isLoading: ULFIsLoading,
        reset: ULFReset,
    } = useUnlikeFeedback();

    /* Like and Unlike handler */
    const handleReaction = () => {
        if (!requireSignIn()) return;

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
        if (LFIsFinished) {
            setIsLike(true);
            setLikeNums((prev) => prev + 1);
            LFReset();
            return;
        }

        if (ULFIsFinished) {
            setIsLike(false);
            setLikeNums((prev) => prev - 1);
            ULFReset();
            return;
        }
    }, [LFIsFinished, ULFIsFinished, LFReset, ULFReset]);

    return (
        <button
            className={clsx({
                'review-card__like': true,
                liked: isLike,
                loading: LFIsLoading || ULFIsLoading,
            })}
            onClick={handleReaction}>
            {LFIsLoading || ULFIsLoading ? (
                <CircleLoading />
            ) : (
                <>
                    <HeartIcon isBold={isLike} />
                    <span>{likeNums}</span>
                </>
            )}
        </button>
    );
}

LikeButton.propTypes = {
    likes: PropTypes.array,
    feedbackID: PropTypes.string,
};

export default LikeButton;
