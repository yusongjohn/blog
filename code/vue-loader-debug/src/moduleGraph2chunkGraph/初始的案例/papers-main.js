import {actionPoint} from './no-error';

export default {
    mounted() {
        import(/* webpackChunkName: "certificate" */'./certificate')
        import(/* webpackChunkName: "photo" */'./photo')
    },
    methods: {
        a() {
            actionPoint();
        },
    },
};

