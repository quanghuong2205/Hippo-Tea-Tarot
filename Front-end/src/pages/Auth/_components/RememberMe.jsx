function RemembeMe() {
    return (
        <div className='form__checkbox-input'>
            <label>
                <input
                    type='checkbox'
                    hidden
                />
                <span className='form__checkbox-input__custom'></span>
                <span>Remember me</span>
            </label>
        </div>
    );
}

export default RemembeMe;
