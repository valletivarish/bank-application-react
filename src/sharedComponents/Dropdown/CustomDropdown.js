import React from 'react'
import './Dropdown.css'
const Dropdown = (props) => {
    const { setSize, data, setPage } = props;
    const { totalElements, size } = data;
    const options = () => {
      const sizes = [];
      for (let i = 1; i < props.data.totalElements; i++) {
        if (i % 5 === 0 && i < props.data.totalElements) {
          sizes.push(<option value={i}>{i}</option>);
        }
      }
      if (props.data.totalElements % 5 !== 0) {
        const roundedSize = Math.ceil(props.data.totalElements / 5) * 5;
        sizes.push(<option value={roundedSize}>{roundedSize}</option>);
      }
      return sizes;
    }; 
    const handleChange = (e) => {
      props.setPage(0);
      props.setSize(e.target.value);
    };
  

  return (
    <div className="dropdown-container">
            <select id="dropdown" className="form-select dropdown" aria-label="Select page size" onChange={handleChange}>
                <option value="" disabled selected>
                    Element size
                </option>
                {options()}
            </select>
        </div>

  )
}

export default Dropdown
