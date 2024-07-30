import { pathsToModuleNameMapper } from "ts-jest";
import type { JestConfigWithTsJest } from "ts-jest";
// import { compilerOptions } from "./tsconfig.json";
import ts from "typescript";

const configFileName = ts.findConfigFile(
  "./",
  ts.sys.fileExists,
  "tsconfig.json",
);
const configFile = ts.readConfigFile(configFileName!, ts.sys.readFile);
const compilerOptions = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  "./",
);

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.options.baseUrl!],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.options.paths!, {
      prefix: "<rootDir>",
    }),
  },
};

export default jestConfig;
