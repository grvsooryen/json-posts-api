import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import FormDialog, { DEFAULT_FORM_VALUES } from '../FormDialog';
import TestProvider from '../../utils/TestProvider';

DEFAULT_FORM_VALUES.isOpen = true;

describe('<FormDialog />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={(e) => jest.fn(e)}
          updatePost={(e) => jest.fn(e)}
        />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('Should call hideDialog on close click', () => {
    const mockHideDialog = jest.fn();
    const { getByRole } = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={mockHideDialog}
          updatePost={(e) => jest.fn(e)}
        />
      </TestProvider>,
    );
    const closeButton = getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    expect(mockHideDialog).toHaveBeenCalledTimes(1);
  });
  it('Should call updatePost on save click', async () => {
    DEFAULT_FORM_VALUES.title = 'some title';
    DEFAULT_FORM_VALUES.body = 'some body';
    const mockUpdatePost = jest.fn();
    const { getByRole, getByTestId } = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={jest.fn}
          updatePost={mockUpdatePost}
        />
      </TestProvider>,
    );

    const titleInput = await waitForElement(() => getByTestId('title'));
    expect(titleInput.value).toMatch('some title');

    fireEvent.change(titleInput, {
      target: { value: 'new title' },
    });

    const saveButton = getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(mockUpdatePost).toHaveBeenCalledTimes(1);
    expect(mockUpdatePost).toHaveBeenCalledWith({ id: 0, title: 'new title', body: 'some body' });
  });
  it('Should do validation for title', async () => {
    DEFAULT_FORM_VALUES.title = 'so';
    DEFAULT_FORM_VALUES.body = 'some body';
    const mockUpdatePost = jest.fn();
    const { getByText } = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={jest.fn}
          updatePost={mockUpdatePost}
        />
      </TestProvider>,
    );
    const loading = await waitForElement(() => getByText('Should have minimum three characters'));
    expect(loading).toBeTruthy();
  });
  it('Should do validation for body', async () => {
    DEFAULT_FORM_VALUES.title = 'some title';
    DEFAULT_FORM_VALUES.body = 'so';
    const mockUpdatePost = jest.fn();
    const { getByText } = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={jest.fn}
          updatePost={mockUpdatePost}
        />
      </TestProvider>,
    );
    const loading = await waitForElement(() => getByText('Should have minimum three characters'));
    expect(loading).toBeTruthy();
  });
});
