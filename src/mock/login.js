import uniqueString from '../utils/uniqueString';

export default {
  login: config => {
    const data = JSON.parse(config.body);
    console.log(data);
    return {
      data: {
        token: uniqueString()
      },
      meta: {
        code: 200,
        message: 'OK'
      }
    }
  }
}
