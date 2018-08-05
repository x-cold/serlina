import * as path from 'path'
import * as webpack from 'webpack'
import makeWebpackConfig from '../config/webpack.config'
import Serlina from '../serlina'
import * as rimraf from 'rimraf'

exports.command = 'build <baseDir>'

exports.builder = {
  'baseDir': {
    description: 'baseDir. Relative to process.cwd()'
  },
  'outputPath': {
    description: 'assets file output path.'
  },
  'publicPath': {
    description: 'publicPath in webpack. Set it if you use CDN'
  }
}

exports.handler = argv => {
  const {
    baseDir,
    outputPath,
    publicPath
  } = argv

  const cwdResolve = p => {
    if (p) {
      return path.resolve(process.cwd(), p)
    } else {
      return p
    }
  }

  const options = Serlina._makeDefualtOptions({
    baseDir: cwdResolve(baseDir),
    outputPath: cwdResolve(outputPath),
    publicPath: publicPath,
    dev: false,
  })

  const webpackConfig = Serlina._makeWebpackConfig(options)

  rimraf.sync(options.outputPath)

  const compiler = webpack(webpackConfig)
  compiler.run()
}