import { updatePost, updatePageNumber } from '../postsAction';
import { UPDATE_POST, UPDATE_PAGE_NUMBER } from '../types';

const MOCK_POST_ITEM = {
  id: 1,
  title: 'test title',
  body: 'test post',
};

describe('Post Actions', () => {
  it('updatePost should update the post entry', () => {
    expect(updatePost(MOCK_POST_ITEM)).toEqual({
      type: UPDATE_POST,
      payload: MOCK_POST_ITEM,
    });
  });

  it('updatePageNumber should update pagination page', () => {
    expect(updatePageNumber(1)).toEqual({
      type: UPDATE_PAGE_NUMBER,
      payload: 1,
    });
  });
});
