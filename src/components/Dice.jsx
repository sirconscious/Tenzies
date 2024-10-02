import React from 'react'
import { useState , useEffect} from 'react'

export default function Dice(props) {
    const {value , isHeld, id ,Held} = props
    return (
        <div className='dice' style={{ backgroundColor: isHeld ? "blue" : "#dddcdc" , 
        color : isHeld ? "white" : "black"}}
        onClick={()=>Held(id)}
        >
            {value}
        </div>
    )
}
