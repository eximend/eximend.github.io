// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <div>
//       <header className="header">
//         <nav>
//           <ul className="header_list">
//             <li><img className='header_list_logo' src='https://s3-alpha-sig.figma.com/img/7ac6/9e75/a5bf165256bd08c7e04754bd936e43fa?Expires=1688947200&Signature=Zxo4somERjCZWhs0JZ~PUOl0ylKGh7ERTb8mUuWkIQxznVaav8N15vJuztSWWvvnF-Q4zIjbT7ZR1hYZNgtgsu8PVROO6AFh~kZHNO3rOb1i7OT9BintBVux7cD7HvqBqIxBjuPJDzZ~QaLR6wdHPcKhETuNW42UgffvgOYCI-EoUBhsUjKhB8xR~IOPTZiwFjTp~KvAyoNgEraJz-vZxVRDgAWRaKeZmUEypL8eJw1Nq0CovDPjgwnAiEWBVFJ8yVdTB69Vd2CSEQvteiHJwJ-oHPQ82wx6BTLZTQ7G~CdnjBaTZgGZgf5kaQRYfh70Ks1GkUEptXsfO3YUKAiTzQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='#'></img></li>
//             <li><Link className='header_link' to="/">Latest News</Link></li>
//             <li>
//             <Link className='header_link' to="/politics">Politics</Link>
//             </li>
//             <li>
//             <Link className='header_link'  to="/business">Business</Link></li>
//             <li><Link className='header_link' to="/sports">Sports</Link>
// </li>
//             <li><Link className='header_link' to="/world">World</Link></li>
//             <li><Link className='header_link' to="/travel">Travel</Link></li>
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// }

// // export default Header;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Header() {
//   const [searchValue, setSearchValue] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearch = () => {
//     navigate(`/user-search/${encodeURIComponent(searchValue)}`);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div>
//       <header className="header">
//         <nav>
//           <ul className="header_list">
//             <li><img className='header_list_logo' src='https://s3-alpha-sig.figma.com/img/7ac6/9e75/a5bf165256bd08c7e04754bd936e43fa?Expires=1688947200&Signature=Zxo4somERjCZWhs0JZ~PUOl0ylKGh7ERTb8mUuWkIQxznVaav8N15vJuztSWWvvnF-Q4zIjbT7ZR1hYZNgtgsu8PVROO6AFh~kZHNO3rOb1i7OT9BintBVux7cD7HvqBqIxBjuPJDzZ~QaLR6wdHPcKhETuNW42UgffvgOYCI-EoUBhsUjKhB8xR~IOPTZiwFjTp~KvAyoNgEraJz-vZxVRDgAWRaKeZmUEypL8eJw1Nq0CovDPjgwnAiEWBVFJ8yVdTB69Vd2CSEQvteiHJwJ-oHPQ82wx6BTLZTQ7G~CdnjBaTZgGZgf5kaQRYfh70Ks1GkUEptXsfO3YUKAiTzQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='#'></img></li>
//             <li><Link className='header_link' to="/">Latest News</Link></li>
//             <li><Link className='header_link' to="/politics">Politics</Link></li>
//             <li><Link className='header_link' to="/business">Business</Link></li>
//             <li><Link className='header_link' to="/sports">Sports</Link></li>
//             <li><Link className='header_link' to="/world">World</Link></li>
//             <li><Link className='header_link' to="/travel">Travel</Link></li>
//             <li className='header_search_li'>
//               <input
//                 className='header_input'
//                 value={searchValue}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//               />
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Header;





import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/user-search/${encodeURIComponent(searchValue)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsIconRotated(!isIconRotated);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event) => {
    const isClickedInsideMenu = menuRef.current && menuRef.current.contains(event.target);

    if (!isClickedInsideMenu) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkIsMobileView = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    checkIsMobileView();

    const handleResize = () => {
      checkIsMobileView();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <header className="header">
        <nav>
          <ul className={`header_list ${isMenuOpen && isMobileView ? 'open' : ''}`} ref={menuRef}>
            <li><img className='header_list_logo' src='https://s3-alpha-sig.figma.com/img/7ac6/9e75/a5bf165256bd08c7e04754bd936e43fa?Expires=1688947200&Signature=Zxo4somERjCZWhs0JZ~PUOl0ylKGh7ERTb8mUuWkIQxznVaav8N15vJuztSWWvvnF-Q4zIjbT7ZR1hYZNgtgsu8PVROO6AFh~kZHNO3rOb1i7OT9BintBVux7cD7HvqBqIxBjuPJDzZ~QaLR6wdHPcKhETuNW42UgffvgOYCI-EoUBhsUjKhB8xR~IOPTZiwFjTp~KvAyoNgEraJz-vZxVRDgAWRaKeZmUEypL8eJw1Nq0CovDPjgwnAiEWBVFJ8yVdTB69Vd2CSEQvteiHJwJ-oHPQ82wx6BTLZTQ7G~CdnjBaTZgGZgf5kaQRYfh70Ks1GkUEptXsfO3YUKAiTzQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='#'></img></li>
            {isMobileView && (
              <>
                <li className='header_menu_icon' onClick={toggleMenu}>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className={isIconRotated ? 'rotate-icon' : ''}
                    >
                      <path d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z" />
                    </svg>
                  </button>
                </li>
                {isMenuOpen && (
                  <li className='header_search_li'>
                    <input
                      className='header_input'
                      placeholder='Поиск'
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </li>
                )}
              </>
            )}
            {(isMobileView && isMenuOpen) || !isMobileView ? (
              <>
                <li><Link className='header_link' to="/">Latest News</Link></li>
                <li><Link className='header_link' to="/politics">Politics</Link></li>
                <li><Link className='header_link' to="/business">Business</Link></li>
                <li><Link className='header_link' to="/sports">Sports</Link></li>
                <li><Link className='header_link' to="/world">World</Link></li>
                <li><Link className='header_link' to="/travel">Travel</Link></li>
                {!isMobileView && (
                  <li className='header_search_li'>
                    <input
                      className='header_input'
                      placeholder='Поиск'
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </li>
                )}
              </>
            ) : null}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
