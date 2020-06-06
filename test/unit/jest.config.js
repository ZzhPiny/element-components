const path = require('path');

module.exports = {
    // 执行上下文
    rootDir: path.resolve(__dirname, '../../'),
    // 扩展名
    moduleFileExtensions: ['js', 'json', 'vue'],
    // 别名
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^packages/(.*)$': '<rootDir>/packages/$1',
        '\\.css$': '<rootDir>/test/unit/style-mock.js',
    },
    // 文件处理
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    // 启动测试 加载的文件
    setupFiles: ['<rootDir>/test/unit/setup'],
    // 生成的测试覆盖报告存放的目录
    coverageDirectory: '<rootDir>/test/unit/coverage',
    // 需要测试的文件
    collectCoverageFrom: ['packages/**/*.{js,vue}', '!**/node_modules/**'],
};
