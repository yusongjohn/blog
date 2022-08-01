import { actionPoint } from './no-error';
export default {
  mounted() {
    import(/* webpackChunkName: "certificate" */'./certificate')
  },
  methods: {
    a () {
      actionPoint();
    },
  },
};

