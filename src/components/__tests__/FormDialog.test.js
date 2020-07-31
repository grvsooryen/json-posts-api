import React from 'react';
import { render } from '@testing-library/react';
import FormDialog, { DEFAULT_FORM_VALUES } from '../FormDialog';
import TestProvider from '../../utils/TestProvider';

const mockDispatchFunc = () => {};

describe('<FormDialog />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <FormDialog
          editForm={DEFAULT_FORM_VALUES}
          hideDialog={mockDispatchFunc}
          updatePost={mockDispatchFunc}
        />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
