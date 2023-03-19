// import { actionPoint } from '@/utils/no-error'

const retryConfig = {
    beforeRetry: () => true,
    count: 1,
  };
  
  const MaxRetryCount = 100;
  
  export default class Retry {
    constructor (task, params = [], { beforeRetry = retryConfig.beforeRetry, count = 1 } = retryConfig) {
      if (typeof task !== 'function') {
        return Promise.reject(new Error('retry module: invalid params, task must be function'));
      }
  
      if (!Array.isArray(params)) {
        return Promise.reject(new Error('retry module: invalid params, params must be array'));
      }
  
      this.task = task;
      this.params = params || [];
      this.beforeRetry = beforeRetry;
      this.count = Math.min(count, MaxRetryCount);
    }
  
    start () {
      let returnPromise = null;
      try {
        const res = this.task(...this.params);
        returnPromise = Promise.resolve(res);
      } catch (e) {
        returnPromise = Promise.reject(e);
      }
  
      // 只有异常的情况才会进行重试
      return returnPromise.catch(async (error) => {
        if (this.count <= 0) {
          return Promise.reject(error);
        }
  
        const retryOrNot = await this.beforeRetry(error);
        if (retryOrNot) {
          return this.again();
        }
  
        return Promise.reject(error);
      });
    }
  
    async again () {
      this.count--;
      return this.start();
    }
  }
  