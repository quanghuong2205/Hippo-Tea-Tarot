import Button from '../../../components/atoms/Button';

function LoginButton() {
    return (
        <Button
            className={'header__login-btn normal-btn'}
            linkTo={'/auth'}>
            <span>Đăng nhập</span>
        </Button>
    );
}

export default LoginButton;
