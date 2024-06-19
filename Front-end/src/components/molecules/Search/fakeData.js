'use strict';
import images from '../../../../assets/img';
const fakeResults = {
    products: [
        {
            id: 'P-01',
            image_url: images.drink,
            title: 'Trà sữa chân trâu',
        },

        {
            id: 'P-02',
            image_url: images.drinkB,
            title: ' Hồng trà sữa',
        },
    ],

    blogs: [
        {
            id: 'B-01',
            user_id: images.avatar,
            user_avatar: images.avatar,
            title: 'Trà sữa trân trâu đường đen siêu HOT',
            desc: 'Nội dung bài viết về trà sữa trân châu đường đen mới ra mắt vào tháng trước tại Hippo',
            slug: 'tra-sua-tran-chau-duong-den',
        },

        {
            id: 'B-02',
            user_id: images.avatar,
            user_avatar: '',
            image_url: images.drinkB,
            title: 'Trà sữa trân trâu đường đen siêu HOT',
            desc: 'Nội dung bài viết về trà sữa trân châu đường đen mới ra mắt vào tháng trước tại Hippo',
            slug: 'tra-sua-tran-chau-duong-den',
        },
    ],
};

export default fakeResults;
