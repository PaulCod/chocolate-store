import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // Definindo o preset para usar ts-jest
  preset: 'ts-jest',

  // Configuração dos arquivos que Jest deve considerar como testes
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // Transformação dos arquivos TypeScript usando ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Ignorando a transformação dos arquivos nos node_modules
  transformIgnorePatterns: [
    "/node_modules/"
  ],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Especificando o ambiente de teste
  testEnvironment: 'node',
};

export default config;
