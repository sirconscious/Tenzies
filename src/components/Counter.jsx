import React, { useState, useEffect } from 'react';

export default function Counter(props) {
    
  return (
    <div className='counter'>
      <span>{props.seconds} seconds</span>
    </div>
  );
}
