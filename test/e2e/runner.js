process.env.NODE_ENV = 'testing';
const server = require('../../build/dev-server.js');

server.ready.then(() => {
  let opts = process.argv.slice(2);
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightwatch.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  let spawn = require('cross-spawn');
  let runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

  runner.on('exit', function (code) {
    server.close();
    process.exit(code)
  });

  runner.on('error', function (err) {
    server.close();
    throw err
  })
});
