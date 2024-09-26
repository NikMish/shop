import React, {useState, useEffect} from 'react';

export default function Filter(props) {

  const [filterList, setFilterList] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    // Filter items by category.
    console.log(props.category);
    if (props.items && props.items.length > 0) {
        console.log('-all', props.category);

      if (props.category !== 'all') {
        props.setItems(props.data.items.filter((item) => item.category === props.category));
      }
      else {
        props.setItems(props.data.items);
      }
      
    }
  }, [props.category]);

  // Build filter list.
  if (props.data.items && props.data.items.length > 0) {   
    props.data.items.map((item) => {
      filterList.includes(item.category) ? null : setFilterList([...filterList, item.category]);
    });

  }

  const handleSelect = (e) => {
    // if (e.target.value != 'all') {
      props.setCategory(e.target.value);
    // }
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
        
        <input type="checkbox" id="sold" name="sold" value="sold" /> Hide sold staff
      </div>
    </>
  );

}