import Button from '../../../components/atoms/Button';
function ResetPass() {
    return (
        <Button
            linkTo={'/recovery'}
            className={'form__link pull-right'}>
            <span>Quên mật khẩu?</span>
        </Button>
    );
}

export default ResetPass;
