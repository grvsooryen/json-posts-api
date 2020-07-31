import React from 'react';
import { render } from '@testing-library/react';
import PostsContainer from '../PostsContainer';
import TestProvider from '../../utils/TestProvider';

describe('<PostsContainer />', () => {
  it('Renders successfully without error', () => {
    const postsContainer = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    expect(postsContainer.container).toBeTruthy();
  });
});
