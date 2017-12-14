const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  let loaders = exports.cssLoaders(options);
  for (let extension in loaders) {
    let loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
};

//获取多级的入口文件
exports.getMultiEntry = function (globPath) {
  let entries = {}, basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-4);

    let pathsrc = tmp[0] + '/' + tmp[1];
    if ( tmp[0] === 'src' ) {
      pathsrc = tmp[1];
    }

    pathname = pathsrc + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });

  return entries;
};

const fs = require('fs'), copyStat = fs.stat;

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
const fileCopy = function(src, dst){
  // 读取目录中的所有文件/目录
  fs.readdir(src, function(err, paths){
    if (err) {
      throw err;
    }
    paths.forEach(function( path ){
      let _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;
      copyStat( _src, function( err, st ){
        if (err) {
          throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream( _src );
          // 创建写入流
          writable = fs.createWriteStream( _dst );
          // 通过管道来传输流
          readable.pipe( writable );
        } else if (st.isDirectory()) { // 如果是目录则递归调用自身
          exports.startCopy( _src, _dst );
        }
      });
    });
  });
};

//在复制目录前需要判断该目录是否存在，不存在需要先创建目录
exports.startCopy = function( src, dst ){
  fs.exists( dst, function( exists ){
    if (exists) {  // 已存在
      fileCopy( src, dst );
    } else { // 不存在
      fs.mkdir( dst, function(){
        fileCopy( src, dst );
      });
    }
  });
};

// 项目根目录
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

exports.root = root;


