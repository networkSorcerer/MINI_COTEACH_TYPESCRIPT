import { useState } from 'react';
import { createContext } from 'vm';

const defaultValue = {
  searchKeyword: '',
  setSearchKeyword: () => {},
};

export const SearchContext = createContext(defaultValue);

export const SearchContextProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</SearchContext.Provider>;
};
