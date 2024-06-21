import STORAGE_KEYS from '../constants/storage-key.constant';
import {
    clearFromLocalstorage,
    extractFromLocalstorage,
    saveToLocalstorage,
} from '../utils';

function useTheme() {
    const setThemeBasedOnUserPreference = () => {
        const htmlNode = document.documentElement;

        /* Get theme from local storage */
        const themeFromLocalStorage = extractFromLocalstorage({
            key: STORAGE_KEYS.THEME,
        });

        if (themeFromLocalStorage) {
            htmlNode.setAttribute('data-theme', themeFromLocalStorage);

            return;
        }

        /* Set theme by user system */
        const isPreferDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        if (isPreferDarkScheme.matches) {
            htmlNode.setAttribute('data-theme', 'dark');
            return;
        }

        htmlNode.setAttribute('data-theme', 'light');
    };

    const setTheme = ({ theme }) => {
        if (theme === '') throw new Error('Not provide theme to set');

        /* Set theme */
        document.documentElement.setAttribute('data-theme', theme);

        /* Save local */
        saveToLocalstorage({
            key: STORAGE_KEYS.THEME,
            data: theme,
        });
    };

    const setSystemTheme = () => {
        /* Clear theme from local storage */
        clearFromLocalstorage({
            key: STORAGE_KEYS.THEME,
        });

        /* Set theme by user system */
        const htmlNode = document.documentElement;
        const isPreferDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        if (isPreferDarkScheme.matches) {
            htmlNode.setAttribute('data-theme', 'dark');
            return;
        }

        htmlNode.setAttribute('data-theme', 'light');
    };

    return { setThemeBasedOnUserPreference, setTheme, setSystemTheme };
}

export default useTheme;
