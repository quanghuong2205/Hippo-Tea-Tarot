import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import fakeResults from './fakeData';

function Search() {
    const resultKeys = Object.keys(fakeResults);
    const resultValues = Object.values(fakeResults);

    return (
        <div className='search'>
            <div className='search-header'>
                <p className='search-title'>Tìm kiếm</p>
                <div className='search-box'>
                    <div className='search-box__inner'>
                        <button className='search-box__submit'>
                            <IoSearchOutline />
                        </button>
                        <input
                            spellCheck={false}
                            type='text'
                            className='search-box__input'
                            placeholder='Nhập nội dung tìm kiếm...'
                        />
                        <button className='search-box__clear'>
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                </div>
            </div>
            {/* <hr className='search-separator' /> */}

            <div className='search-result'>
                {resultKeys.map((key, i) => (
                    <div
                        className='search-result__group'
                        key={i}>
                        <div className='search-result__group__header'>
                            <h5>{key}</h5>
                            <a href='/'>Xem thêm</a>
                        </div>

                        <hr className='search-separator' />

                        <div className='search-result__list'>
                            {resultValues[i].map((result) => (
                                <div
                                    className='search-card'
                                    key={result.id}>
                                    <div className='search-card__inner'>
                                        <img
                                            src={
                                                result.image_url ||
                                                result.user_avatar
                                            }
                                            alt=''
                                            className='search-card__image'
                                        />
                                        <div className='search-card__infor'>
                                            <p className='search-card__title line-clamp'>
                                                {result.title}
                                            </p>
                                            <p
                                                className='search-card__desc line-clamp'
                                                style={{
                                                    '--line-clamp': 2,
                                                }}>
                                                {result.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
