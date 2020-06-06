const glob = require('glob');
const path = require('path');
const camelCase = require('lodash.camelcase');
const { execSync } = require('child_process');

const build = (name, dest, entry) => {
    const sArgs = [
        'build',
        '--target',
        'lib',
        '--name',
        name,
        '--dest',
        dest,
        entry,
    ].join(' ');

    // build single component
    console.info(`🏗 Building component ${name}`);

    execSync(`npx vue-cli-service ${sArgs}`, { stdio: 'inherit' });
};

// delete old files
execSync(`npx rimraf dist`);

// build components
// build('elementComponents', path.join(__dirname, 'dist', 'index'), './index.js');

// build single component
glob('packages/*/index.js', null, (err, aFiles) => {
    aFiles.forEach((file) => {
        const sOriginName = path.basename(path.dirname(file));
        const sNewName = camelCase(`ark-${sOriginName}`);

        build(sNewName, path.join(__dirname, 'dist', sNewName), file);
    });
});
