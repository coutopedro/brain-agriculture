const config = {
    preset: 'ts-jest', // Se você estiver usando TypeScript
    testEnvironment: 'jsdom', // Ambiente de testes com DOM
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Certifique-se de que este caminho está correto
};

export default config;

