import React from 'react';
// import '@types/jest';
import { Home } from '../src/pages'
import { render } from '@testing-library/react';

describe('Front End', () => {

    it('renders h1', () => {
        const { getByText } = render(<Home/>);
        const header = getByText('Buildify')
        expect(header).toBeTruthy();
      });
})