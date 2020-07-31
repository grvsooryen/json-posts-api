import React from 'react';
import { render } from '@testing-library/react';
import ArticleContainer from '../ArticleContainer';
import TestProvider from '../../utils/TestProvider';

describe('<ArticleContainer />', () => {
  it('Renders successfully without error', () => {
    const articleContainer = render(
      <TestProvider>
        <ArticleContainer />
      </TestProvider>,
    );
    expect(articleContainer.container).toBeTruthy();
  });
});
