import { actionPoint } from './no-error';

export default {
  mounted(){
    import(/* webpackChunkName: "photo" */'./photo')
  },
  methods: {
    a () {
      actionPoint();
    },
  },
};
