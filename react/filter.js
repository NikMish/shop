import React, {useState, useEffect} from 'react';

export default function Filter(props) {
  const [filterList, setFilterList] = useState([]);
  const [category, setCategory] = useState('all');
  const [soldFilter, setSoldFilter] = useState(false);

  useEffect(() => {
    let filteredItems = [];

    // Filter items by category.
    if (props.data.items && props.data.items.length > 0) { 
      
      // Filter by category.
      if (category !== 'all') {
        filteredItems = props.data.items.filter((item) => item.category === category);
      }
      else {
        filteredItems = props.data.items;
      }

      // Filter by sold.
      if (soldFilter == true) {
        filteredItems = filteredItems.filter((item) => item.sold === 0);
      }
      props.setItems(filteredItems);

    }
  }, [category, soldFilter]);

  // Build filter list.
  if (props.data.items && props.data.items.length > 0) {   
    props.data.items.map((item) => {
      filterList.includes(item.category) ? null : setFilterList([...filterList, item.category]);
    });

  }

  const handleSelect = (e) => {
    setCategory(e.target.value);
  }

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setSoldFilter(true);
    }
    else {
      setSoldFilter(false);
    }
  }

  return (
    <>
      <div className="filter">
        Show: 
        <select name="filter" id="filter" onChange={handleSelect}>
          <option value="all">All</option>
          {filterList.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        
        <label>
          <input type="checkbox" id="sold" name="sold" onChange={handleCheck} /> Hide sold staff
        </label>
      </div>
    </>
  );

}