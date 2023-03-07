import sass from 'sass';
import postcss from 'postcss';
import prefixer from 'postcss-prefixer';
import fs from 'node:fs/promises';
import path from 'node:path';
import base64 from 'postcss-base64';

const entryPoint = [
    {
        output: 'entry/entry-modal.css',
        file: './src/styles/entry/index.scss',
    },
    {
        output: 'line/entry-modal.css',
        file: './src/styles/line/index.scss',
    },
];

entryPoint.forEach(({ file, output }) => {
    sass.render(
        {
            file,
        },
        async function (err, result) {
            if (err) {
                console.error(err);
            } else {
                const content = result.css.toString();
                const parsingContent = await postcss([
                    prefixer({
                        prefix: 'entry-modal-',
                    }),
                    base64({
                        root: './src/styles/assets',
                        extensions: ['.png', '.svg'],
                    }),
                ]).process(content);
                const outputPath = path.join('.', 'dist', output);
                const parser = path.parse(outputPath);
                await fs.mkdir(parser.dir, { recursive: true });
                await fs.writeFile(path.join('.', 'dist', output), parsingContent.css);
            }
        }
    );
});
