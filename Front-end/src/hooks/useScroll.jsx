import { useRef } from 'react';

function useScroll() {
    const scrollToTop = useRef(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    return { scrollToTop: scrollToTop.current };
}

export default useScroll;
