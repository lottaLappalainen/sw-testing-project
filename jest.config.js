export default {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text"],
    collectCoverageFrom: [
       
        "src/map.js",
      
      ],
    coveragePathIgnorePatterns: ["src/.internal/"]
  };
  