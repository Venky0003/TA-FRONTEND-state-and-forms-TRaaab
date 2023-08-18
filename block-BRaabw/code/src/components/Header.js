import React from 'react';

function Header(props) {
  return (
    <>
      <header>
        <div className='container flex justify-between'>
        <nav>
          <a href='#home'>Home</a>
        </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
