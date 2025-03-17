module.exports = {
    __esModule: true,
    default: 'test-file-stub',
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mocks__/fileMock.js"
    },
};