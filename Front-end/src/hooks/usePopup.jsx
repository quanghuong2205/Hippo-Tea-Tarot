import { useState } from 'react';

function usePopup() {
    const [isShownPopup, setIsShownPopup] = useState(false);
    const showPopup = () => setIsShownPopup(true);
    const hiddenPopup = () => setIsShownPopup(false);
    return {
        isShownPopup,
        showPopup,
        hiddenPopup,
    };
}

export default usePopup;
