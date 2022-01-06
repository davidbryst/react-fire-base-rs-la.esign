import { atom } from 'recoil';

export default atom({
    key: 'user',
    default: {
        isConnect: false,
        user: {},
    },
});