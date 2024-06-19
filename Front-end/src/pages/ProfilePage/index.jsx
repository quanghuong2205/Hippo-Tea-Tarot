import { useRef } from 'react';
import Tooltip from '../../components/common/Tooltip';

function ProfilePage() {
    const ref = useRef(null);

    return (
        <div
            style={{
                marginLeft: '20px',
                marginTop: '20px',
            }}>
            <h1>Profile Page</h1>

            <Tooltip
                DisplayComponent={() => (
                    <div
                        style={{
                            width: 'fit-content',
                            height: 'fit-content',
                        }}>
                        Hello can you see me ?
                    </div>
                )}
                shownByEvent
                eventName={'testEvent'}
                animation={'slideUp'}
            />

            <div
                style={{
                    height: '50vh',
                    backgroundColor: '#f5f5f5',
                    overflow: 'scroll',
                }}>
                <div
                    style={{
                        height: '200px',
                        backgroundColor: 'cyan',
                    }}></div>

                <div
                    style={{
                        height: '200px',
                        width: '200px',
                        backgroundColor: 'red',
                    }}
                    ref={ref}></div>

                <div
                    style={{
                        height: '200px',
                        backgroundColor: 'green',
                    }}></div>
            </div>
        </div>
    );
}

export default ProfilePage;
