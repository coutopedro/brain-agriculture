import React from 'react';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    BrowserRouter: ({ children }: { children: React.ReactNode }) =>
        React.createElement('div', null, children),
    Routes: ({ children }: { children: React.ReactNode }) =>
        React.createElement('div', null, children),
    Route: () => React.createElement('div', null),
    Link: ({ children }: { children: React.ReactNode }) =>
        React.createElement('span', null, children),
}));
