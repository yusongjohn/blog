
import { uploadImage } from './uploadv2';
import { actionPoint } from './no-error';

export default {
  options: {
    virtualHost: true,
  },
  methods: {
    a () {
      uploadImage();
      actionPoint();
    },
  },
};
