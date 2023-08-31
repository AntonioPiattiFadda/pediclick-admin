import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [searchedText, setSearchedText] = useState('');
  const changeListenerRef = useRef(null);

  //NOTE - Hacer andar este hook para el searchBox
  // useEffect(() => {
  //   if (changeListenerRef.current) {
  //     changeListenerRef.current(searchedText);
  //   }
  // }, [searchedText]);

  return { searchedText, setSearchedText, changeListenerRef };
}
