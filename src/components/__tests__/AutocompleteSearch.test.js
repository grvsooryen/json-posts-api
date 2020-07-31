import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import AutocompleteSearch from '../AutocompleteSearch';
import TestProvider from '../../utils/TestProvider';
import MOCK_DATA from '../../utils/mockData.json';

describe('<AutocompleteSearch />', () => {
  it('Renders successfully without error', () => {
    const component = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={[]}
          isSearchInputShown={false}
          toggleSearchInput={jest.fn}
          updateSearchInputText={jest.fn}
          isSearchShown
        />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('Renders should show datalist', () => {
    const component = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={MOCK_DATA}
          isSearchInputShown={false}
          toggleSearchInput={jest.fn}
          updateSearchInputText={jest.fn}
          isSearchShown
        />
      </TestProvider>,
    );
    expect(component.container).toBeTruthy();
  });
  it('should toggle Search Input', () => {
    const mocktoggleSearchInput = jest.fn();
    const { getByRole } = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={MOCK_DATA}
          isSearchInputShown={false}
          toggleSearchInput={mocktoggleSearchInput}
          updateSearchInputText={jest.fn}
          isSearchShown
        />
      </TestProvider>,
    );
    const searchButton = getByRole('button', { class: 'MuiButtonBase-root MuiIconButton-root' });
    fireEvent.click(searchButton);
    expect(mocktoggleSearchInput).toHaveBeenCalledTimes(1);
    expect(mocktoggleSearchInput).toHaveBeenCalledWith({ isSearchInputShown: true });
  });
  it('should toggle Search Input hide with text clear', async () => {
    const mocktoggleSearchInput = jest.fn();
    const { getByRole, getByTestId } = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={MOCK_DATA}
          isSearchInputShown
          toggleSearchInput={mocktoggleSearchInput}
          updateSearchInputText={jest.fn}
          isSearchShown
        />
      </TestProvider>,
    );
    const searchInput = await waitForElement(() => getByTestId('searchInput'));

    fireEvent.change(searchInput, { target: { value: 'repudia' } });
    const searchButton = getByRole('button', { class: 'MuiButtonBase-root MuiIconButton-root' });
    fireEvent.click(searchButton);
    expect(mocktoggleSearchInput).toHaveBeenCalledTimes(1);
    expect(mocktoggleSearchInput).toHaveBeenCalledWith({ isSearchInputShown: false });
  });
  it('should updateSearchInputText ', async () => {
    const mockUpdateSearchInputText = jest.fn();
    const { getByTestId } = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={MOCK_DATA}
          isSearchInputShown
          toggleSearchInput={jest.fn}
          updateSearchInputText={mockUpdateSearchInputText}
          isSearchShown
        />
      </TestProvider>,
    );
    const searchInput = await waitForElement(() => getByTestId('searchInput'));

    fireEvent.change(searchInput, { target: { value: 'repudiandae ea animi iusto' } });

    expect(mockUpdateSearchInputText).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchInputText).toHaveBeenCalledWith({ searchInputText: 'repudiandae ea animi iusto' });
  });
  it('should updateSearchInputText on Submit', async () => {
    const mockUpdateSearchInputText = jest.fn();
    const { getByTestId } = render(
      <TestProvider>
        <AutocompleteSearch
          itemsList={MOCK_DATA}
          isSearchInputShown
          toggleSearchInput={jest.fn}
          updateSearchInputText={mockUpdateSearchInputText}
          isSearchShown
        />
      </TestProvider>,
    );
    const searchInput = await waitForElement(() => getByTestId('searchInput'));
    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'dolo' } });
    fireEvent.submit(searchInput);

    expect(mockUpdateSearchInputText).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchInputText).toHaveBeenCalledWith({ searchInputText: 'dolo' });
  });
});
