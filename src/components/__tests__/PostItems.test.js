import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import PostItems from '../PostItems';
import TestProvider from '../../utils/TestProvider';

const MOCK_POST_LIST = [
  {
    id: 1,
    userId: 1,
    title: 'test 1',
    body: 'post Body 1',
  },
  {
    id: 2,
    userId: 1,
    title: 'test 2',
    body: 'post Body 2',
  },
  {
    id: 3,
    userId: 1,
    title: 'test 3',
    body: 'post Body 3',
  },
];

describe('<PostItems />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <PostItems items={[]} editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('Renders successfully without error with Items', async () => {
    const { getByText } = render(
      <TestProvider>
        <PostItems items={MOCK_POST_LIST} editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    const result = await waitForElement(() => getByText('post Body 3'));
    expect(result).toBeTruthy();
  });
  it('Renders with no results of search', async () => {
    const { getByText } = render(
      <TestProvider>
        <PostItems items={[]} searchInputText="Some Text" editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    const result = await waitForElement(() => getByText('No Results Found'));
    expect(result).toBeTruthy();
  });
  it('Renders with no results of empty array', async () => {
    const { getByText } = render(
      <TestProvider>
        <PostItems items={[]} searchInputText="" editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    const result = await waitForElement(() => getByText('You do not have any posts'));
    expect(result).toBeTruthy();
  });
  it('Renders with no results of empty array', async () => {
    const mockEditDialog = jest.fn();
    const { getAllByText } = render(
      <TestProvider>
        <PostItems items={MOCK_POST_LIST} searchInputText="" editDialog={mockEditDialog} />
      </TestProvider>,
    );
    const editButtons = await waitForElement(() => getAllByText('Edit'));
    fireEvent.click(editButtons[0]);
    expect(mockEditDialog).toHaveBeenCalledTimes(1);
  });
});
