import React from 'react';
import { render } from '@testing-library/react';
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
  it('Renders successfully without error with Items', () => {
    const component = render(
      <TestProvider>
        <PostItems items={MOCK_POST_LIST} editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('Renders with no results of search', () => {
    const component = render(
      <TestProvider>
        <PostItems items={[]} searchInputText="Some Text" editDialog={(e) => jest.fn(e)} />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
