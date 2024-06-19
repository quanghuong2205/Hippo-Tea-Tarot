import ThreeDotsIcon from '../../../icons/ThreeDotsIcon';
import ToolTip from '../../../common/Tooltip';

function FeedbackOptions() {
    return (
        <div className='review-card__options'>
            <ToolTip
                TriggerComponent={() => (
                    <button>
                        <ThreeDotsIcon />
                    </button>
                )}
                DisplayComponent={() => (
                    <div>
                        <button className='review-card__option'>
                            Report
                        </button>
                    </div>
                )}
                hasDefaultStyle
                position={'bottom-right'}
                clickOnShow
            />
        </div>
    );
}

export default FeedbackOptions;
