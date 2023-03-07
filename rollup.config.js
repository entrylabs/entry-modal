import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' assert { type: 'json' };

export default {
    input: 'src/component.jsx',
    output: [
        {
            file: pkg.main,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        commonjs(),
        nodeResolve(),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**/*.(ts|tsx|js|jsx)',
            include: 'src/**/*.(ts|tsx|js|jsx)',
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.es6', '.mjs'],
        }),
    ],
};
