// 后端地址配置数据
const ApiAddress = {
  mock: 'https://api-dev',
  development: '192.168.0.84:21000', // 开发环境
  test: '120.27.165.213:5001', // 测试环境
  pretest: '47.93.119.31:16666',  // 预发环境
  production: '47.93.77.75:16666' // 正式环境
};

// 获取后端地址
export default function() {
  const ip = location.hostname;
  let serverAddress = null;

  // 开发
  if (ip === 'localhost') {
    serverAddress = ApiAddress.mock;
    return serverAddress;
  } else if (ip === '127.0.0.1') {
    serverAddress = ApiAddress.development;
  }

  if (!serverAddress) {
    serverAddress = ApiAddress.development;
  }

  return 'http://' + serverAddress + '/';
}
