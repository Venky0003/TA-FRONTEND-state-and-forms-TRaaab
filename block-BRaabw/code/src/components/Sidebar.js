import React from 'react';
function Sidebar(props) {
  let sizes = props.products.reduce((acc, cv) => {
    acc = acc.concat(cv.availableSizes);
    return acc;
  }, []);
  // console.log(sizes)
  let uniqueSizes = [...new Set(sizes)];
  // console.log(uniqueSizes);
  let { selectedSizes } = props;
  return (
    <aside className="flex-15 aside">
      <div className="grid-3-row">
        {uniqueSizes.map((size) => (
          <span
          key={size}
            onClick={() => props.handleClick(size)}
            className={`sizes ${selectedSizes.includes(size) ? 'active' : ''}`}
          >
            {size}
          </span>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
