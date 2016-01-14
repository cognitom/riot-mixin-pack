import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  dest: 'dist/riot-mixin-pack.cjs.js',
  format: 'cjs',
  plugins: [
    babel()
  ]
}
