var gulp = require('gulp');
var webpack = require('gulp-webpack');

var SRC = 'src';
var SRC_JS= './src/js/';
var DEST_JS= './dist/js/';
var NONE = '';

var JS_ENTRIES = (() => {

      // ここにビルド対象のJSファイル名を配列で定義します。
      var JS_ENTRY_SRC = [
          "app.js"
      ];

      var js_entry_map = {};
      JS_ENTRY_SRC.forEach((src) => {
          js_entry_map[src] = SRC_JS + src
      });

    /*
      作成されるオブジェクトの例
      {
        app.js : './dist/js/app.js',
      }
      */
      return js_entry_map;
})();


gulp.task('default', () => {

    // Just create a stream
    return gulp.src(NONE)
        .pipe(webpack({
            // 監視を有効にします。
            watch: true,
            //  上記で作成したオブジェクトをソースとして投入します。
            entry: JS_ENTRIES,
            //  outputにはそのまま、投入したファイルの名前を流用します。
            output: {
                filename: '[name]'
            },
            // モジュールの定義。babelのローダーを使います。
            module: {
                loaders: [
                    {test: /\.js$/,  loader: 'babel-loader'}
                ]
            }
        }))
        // 作成したファイルを ./dist/js/ 以下に吐き出します。
        .pipe(gulp.dest(DEST_JS));
});
