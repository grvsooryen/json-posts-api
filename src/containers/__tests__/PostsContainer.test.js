import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import PostsContainer from '../PostsContainer';
import TestProvider from '../../utils/TestProvider';
import POST_MOCK_DATA from '../../utils/mockData.json';

describe('<PostsContainer />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders successfully without error', () => {
    const postsContainer = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    expect(postsContainer.container).toBeTruthy();
  });
  it('Renders the mock data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(POST_MOCK_DATA),
    }));
    const { getByText } = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    const resultsElement = await waitForElement(() => getByText(/sunt aut facere/i));
    expect(resultsElement.textContent).toMatch('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  });

  it('Renders the mock data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));
    const { getByText } = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    const noResults = await waitForElement(() => getByText('You do not have any posts'));
    expect(noResults).toBeTruthy();
  });

  it('Shows error upon fetch posts API failure', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.reject(new Error('Unable to Fetch')),
    }));
    const { getByText } = render(
      <TestProvider>
        <PostsContainer />
      </TestProvider>,
    );
    const error = await waitForElement(() => getByText(/Error: Unable to Fetch/i));
    expect(error).toBeTruthy();
  });
});
