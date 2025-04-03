export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.(png|jpe?g|gif|svg)$": "jest-transform-stub",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
