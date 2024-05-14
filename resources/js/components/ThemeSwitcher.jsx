import React, { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const useDarkSide = () => {
  // Ajoutez une fonction pour détecter le thème du navigateur par défaut
  const getBrowserTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(localStorage.theme || getBrowserTheme());
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Sauvegardez le thème dans le stockage local
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);

  const toggleDarkMode = checked => {
    // Modifiez toggleDarkMode pour alterner entre le thème du navigateur et le thème manuel
    setTheme(checked ? 'dark' : 'light');
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
      <div  onClick={toggleDarkMode} className='block px-4 rounded-md  cursor-pointer  dark:text-slate-400 text-slate-800'>
      <div className="flex items-center gap-1">
       {colorTheme!='dark'?<MdDarkMode/>:<MdLightMode/>}

        {colorTheme!='dark'?"Thème sombre":"Thème claire"}
        </div> 
      </div>
    </>
  );
}
export { ThemeSwitcher, useDarkSide,ThemeSwitcher2};  