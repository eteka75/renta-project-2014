
import React, { useState, useEffect } from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { DarkModeSwitch } from 'react-toggle-dark-mode';

const useDarkSide = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';
  
    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
  
      // save theme to local storage
      localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);
  
    return [colorTheme, setTheme];
  }

  
function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

  const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div>
        <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={22} className='mx-2 my-1 text-slate-200' />
      </div>
    </>
  );
}
function ThemeSwitcher2() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

  const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div  onClick={toggleDarkMode} className='flex px-4 rounded-md  gap-1 cursor-pointer items-center dark:text-slate-400 text-slate-800'>
       
       {colorTheme!='dark'?<MdDarkMode/>:<MdLightMode/>}

        {colorTheme!='dark'?"Thème claire":"Thème sombre"}
      </div>
    </>
  );
}
export { ThemeSwitcher, useDarkSide,ThemeSwitcher2};  