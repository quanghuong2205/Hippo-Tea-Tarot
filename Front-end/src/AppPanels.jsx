import { PANELS } from './constants/panel.constant';
import usePanel from './hooks/usePanel';
import Panel from './components/common/Panel';

function AppPanels() {
    /* Panel */
    const {
        OpenedPanelComponent,
        handleHiddenPanel,
        direction,
        outOfDom,
        isVisible,
        setIsVisisble,
    } = usePanel({
        panelItems: PANELS,
    });

    return (
        <>
            {OpenedPanelComponent && (
                <Panel
                    handleHiddenPanel={handleHiddenPanel}
                    direction={direction}
                    animationTime={400}
                    outOfDom={outOfDom}
                    isVisible={isVisible}
                    setIsVisisble={setIsVisisble}>
                    <OpenedPanelComponent />
                </Panel>
            )}
        </>
    );
}

export default AppPanels;
