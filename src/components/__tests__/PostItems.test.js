import React from 'react';
import { render } from '@testing-library/react';
import PostItems from '../PostItems';
import TestProvider from '../../utils/TestProvider';

describe('<PostItems />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <PostItems items={[]} />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
