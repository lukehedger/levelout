const fsbx = require('fuse-box');
const isDevelopment = process.env.NODE_ENV === 'development';

const rootFile = '>index.js';

const fuseBox = new fsbx.FuseBox({
  homeDir: 'app/',
  sourceMap: {
    bundleReference: 'sourcemaps.js.map',
    outFile: './public/sourcemaps.js.map',
  },
  outFile: './public/app.js',
  plugins: [fsbx.BabelPlugin(), fsbx.JSONPlugin()],
});

if (isDevelopment) {
  fuseBox.devServer(rootFile);
} else {
  fuseBox.bundle(rootFile);
}
