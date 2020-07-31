import React from 'react';
import { render } from '@testing-library/react';
import DynamicViewWrapper from '../DynamicViewWrapper';
import TestProvider from '../../utils/TestProvider';

describe('<DynamicViewWrapper />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <DynamicViewWrapper isLoading={false}>
          <div>Some Text</div>
        </DynamicViewWrapper>
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
});
