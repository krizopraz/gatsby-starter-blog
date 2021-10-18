module.exports = {
    transform: {
      "^.+\\.jsx?$": `<rootDir>/test/jest-preprocess.js`,
    },
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/test/__mocks__/file-mock.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
    globals: {
      __PATH_PREFIX__: ``,
    },
    setupFilesAfterEnv: ["<rootDir>/test/setup-test-env.js"],
    collectCoverageFrom:[
      "<rootDir>/src/views/**",
      "<rootDir>/src/pages/**",
    ]
}