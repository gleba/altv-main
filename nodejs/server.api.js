const ts = require('ts-node')

require("tsconfig-paths").register()

ts.register({
  transpileOnlY: true,
  typeCheck: false,
  //cacheDirectory: './srv',
  compilerOptions: {
    target: 'es2015',
    module: 'commonjs',
  }
})
require('./src-api')

