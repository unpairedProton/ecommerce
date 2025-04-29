import React from 'react';
import styled from 'styled-components';

const Checkbox = ({func}) => {
    const setSidebar = func

    const handleClick = (e) => {
        e.stopPropagation()
      
        // You might want to handle the checkbox state change here as well
      };

  return (
    <StyledWrapper  >
      <label   htmlFor="burger"   className="burger">
        <input onClick={()=>{
            console.log("clicked")
            setSidebar((prev)=>!prev)
        }
        } id="burger" type="checkbox" />
        <span />
        <span />
        <span />
      </label>
    </StyledWrapper>
  );
}

// const StyledWrapper = styled.div`
//   .burger {
//     position: relative;
//     width: 30px;
//     height: 24px;
//     background: transparent;
//     cursor: pointer;
//     display: block;
//   }

//   .burger input {
//     display: none;
//   }

//   .burger span {
//     display: block;
//     position: absolute;
//     height: 4px;
//     width: 100%;
//     background: white;
//     border-radius: 9px;
//     opacity: 1;
//     left: 0;
//     transform: rotate(0deg);
//     transition: .25s ease-in-out;
//   }

//   .burger span:nth-of-type(1) {
//     top: 0px;
//     transform-origin: left center;
//   }

//   .burger span:nth-of-type(2) {
//     top: 50%;
//     transform: translateY(-50%);
//     transform-origin: left center;
//   }

//   .burger span:nth-of-type(3) {
//     top: 100%;
//     transform-origin: left center;
//     transform: translateY(-50%);
//   }

//   .burger input:checked ~ span:nth-of-type(1) {
//     top: 0;
//     left: 5px;
//     transform: rotate(405deg);
//   }

//   .burger input:checked ~ span:nth-of-type(2) {
//     width: 0%;
//     opacity: 0;
//   }

//   .burger input:checked ~ span:nth-of-type(3) {
//     top: 28px;
//     left: 5px;
//     transform: rotate(-405deg);
//   }`;

const StyledWrapper = styled.div`
  .burger {
    position: relative;
    width: 30px;
    height: 24px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-50%);
  }

  .burger input:checked ~ span:nth-of-type(1) {
    top: 10px; /* Adjust top position */
    left: 0px; /* Adjust left position */
    transform: rotate(45deg); /* Use a standard 45-degree rotation */
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    top: 10px; /* Adjust top position to be the same as the first span */
    left: 0px; /* Adjust left position to be the same as the first span */
    transform: rotate(-45deg); /* Use a standard -45-degree rotation */
  }
`;
export default Checkbox;
