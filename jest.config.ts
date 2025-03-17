import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/test/__mocks__/fileMock.js",
        '^react-datepicker$': '<rootDir>/src/test/__mocks__/react-datepicker.tsx',
    },
    transform: {
        "^.+\\.(tsx|ts)?$": "ts-jest",
    }
};

export default config;