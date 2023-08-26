import React from 'react';

function Footer(props) {
  return (
    <>
      <footer>
        <div className="container flex justify-between">
          <div>
          <p>&copy; 2023 Your Company. All Rights Reserved.</p>
          </div>
          <div>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://dribble.com">Dribble</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
