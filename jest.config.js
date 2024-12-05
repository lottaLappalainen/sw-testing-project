export default {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: [
        "src/add.js",
        "src/ceil.js",
        "src/eq.js",
        "src/every.js",
        "src/filter.js",
        "src/get.js",
        "src/isEmpty.js",
        "src/map.js",
        "src/reduce.js",
        "src/toNumber.js"
      ],
    coveragePathIgnorePatterns: ["src/.internal/"]
  };
  