import React from 'react';
import { render } from '@testing-library/react';
import AutocompleteSearch from '../AutocompleteSearch';
import TestProvider from '../../utils/TestProvider';

describe('<AutocompleteSearch />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <AutocompleteSearch />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
