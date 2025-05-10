import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // Navbar fixed
  const headerRef = useRef<HTMLHeadingElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  useEffect(() => {
    const header = headerRef.current;

    const handleScroll = () => {
      if (!header) return;
      const fixedNav = header.offsetTop;
      if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
      } else {
        header.classList.remove('navbar-fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // Hamburger toggle
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navbar = navRef.current;
    const handleClick = () => {
      if (hamburger) {
        hamburger.classList.toggle('hamburger-active');
      }
      if (navbar) {
        navbar.classList.toggle('hidden');
      }
    };

    hamburger?.addEventListener('click', handleClick);

    // Cleanup listener saat komponen unmount
    return () => {
      hamburger?.removeEventListener('click', handleClick);
    };
  }, []);

  // Logo mouse over
  const aRef = useRef<HTMLAnchorElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const iconmugRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ahref = aRef.current;
    const span = spanRef.current;
    const iconmug = iconmugRef.current;

    const mouseOver = () => {
      if (span && iconmug) {
        span.classList.add('text-[#D39A7B]');
        iconmug.classList.add('fa-beat-fade');
        iconmug.style.color = '#ff0000';
      }
    };

    const mouseOut = () => {
      if (span && iconmug) {
        span.classList.remove('text-[#D39A7B]');
        iconmug.classList.remove('fa-beat-fade');
        iconmug.style.color = '';
      }
    };

    ahref?.addEventListener('mouseover', mouseOver);
    ahref?.addEventListener('mouseout', mouseOut);

    return () => {
      ahref?.removeEventListener('mouseover', mouseOver);
      ahref?.removeEventListener('mouseout', mouseOut);
    };
  }, []);

  return (
    <>
      <header className='bg-transparent absolute top-0 left-0 w-full flex items-center z-10' ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4 ml-6 w-50">
              <Link ref={aRef} to={'/'} className='font-bold text-lg block py-6'>
                <FontAwesomeIcon icon="fa-solid fa-mug-hot" ref={iconmugRef} className='mr-2' size='lg'/>Coffee <span ref={spanRef}>Shop</span>
              </Link>
            </div>
            <div className="flex items-center px-4"></div>
            <button id='hamburger' name='hamburger' type='button' className='block absolute right-4 lg:hidden' ref={hamburgerRef}>
              <span className='hamburger-line top-0'></span>
              <span className='hamburger-line top-2.5'></span>
              <span className='hamburger-line top-5'></span>
            </button>
            <nav className='hidden absolute py-5 bg-white shadow-lg rounded-xl max-w-[250px] w-full top-full right-4 lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none' ref={navRef}>
              <ul className='block lg:ml-[60%] lg:flex'>
                <li className='group'>
                  <Link to={'/'} className='text-base text-black py-2 mx-8 flex group-hover:text-[#D39A7B]'>Home</Link>
                </li>
                <li className='group'>
                  <Link to={'/menu'} className='text-base text-black py-2 mx-8 flex group-hover:text-[#D39A7B]'>Menu</Link>
                </li>
                <li className='group'>
                  <Link to={'/order'} className='text-base text-black py-2 mx-8 flex group-hover:text-[#D39A7B]'><FontAwesomeIcon icon="fa-solid fa-receipt" className='mr-1 mt-1' />History</Link>
                </li>
                <li className='group '>
                  <Link to={'/cart'} className='text-base text-black py-2 mx-8 flex group-hover:text-[#D39A7B]'><FontAwesomeIcon icon='fa-solid fa-cart-shopping' className='mr-1 mt-1' />Cart</Link>
                </li>
                <li className='group'>
                  <button className='text-base text-white bg-[#B68068] rounded-xl px-3 py-2 mx-8 flex group-hover:bg-[#D39A7B]' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <section className='pt-36'>{children}</section>
      {/* <footer>Footer</footer> */}
    </>
  );
};

export default MainLayout;