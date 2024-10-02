import { useState , useEffect} from 'react'
import Dice from './components/Dice'
import React from 'react'
import Celebration from './components/Celebration'
import Counter from './components/Counter'
export default function App() {
  const [dices,setDices] = useState(AllRandom())
  const [win,setWin] = useState(false)
  const [rollsCount , setRollsCount] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [bestTime,setBestTime] = useState(0)
  function AllRandom() {
    let RandomArray = []
      for (let i = 0; i < 10; i++) {
        RandomArray.push({
          value : Math.floor(Math.random() * 6) + 1 ,
          id : i,
          isHeld : false
        })
      }  
      return RandomArray
  }
  function HandleRoll(){
    !isStarted && handleStarting()
    HandleRollsCount()
    setDices(prev=>prev.map((dice,index)=>{
      return dice.isHeld ? dice : {value : randomeNumber(),id:index,isHeld:false}
    }))
  }
  function randomeNumber(){
    return  Math.floor(Math.random() * 6) + 1 
  }
  function Held(id){
      setDices(prev=>prev.map((dice,_)=>{
        return dice.id === id ? {...dice , isHeld : !dice.isHeld} : dice
      }))
      !isStarted && handleStarting()
    }
  function CheckWin(){
        let firstval = dices[0]
        return dices.every((dice)=>dice.isHeld && firstval.value==dice.value) 
  }
  function NewGame() {
    // handleStarting()
    setSeconds(0)
    setDices(AllRandom())
    setWin(false)
    setRollsCount(0)
    if (localStorage.getItem("highScore")) {
        let prevHigh = JSON.parse(localStorage.getItem("highScore"))
        prevHigh>rollsCount && localStorage.setItem("highScore",rollsCount)
    }else{
      localStorage.setItem("highScore",rollsCount)
    }
    if (localStorage.getItem("bestTime")) {
      let prevBestTime = JSON.parse(localStorage.getItem("bestTime"))
      prevBestTime>seconds && localStorage.setItem("bestTime",seconds)
    }else{
      localStorage.setItem("bestTime",seconds)
    }
  }
  function HandleRollsCount(){
        setRollsCount(prev=>prev + 1)
  }
  useEffect(()=>{
      ()=>CheckWin()
     CheckWin() && setWin(true)
     CheckWin() && setIsStarted(false)
  },[dices])
  useEffect(()=>{
    if (localStorage.getItem("highScore") !==null) {
      setHighScore(JSON.parse(localStorage.getItem("highScore")))
    }
    if (localStorage.getItem("bestTime") !==null) {
      setBestTime(JSON.parse(localStorage.getItem("bestTime")))
    }
  })
  const Dices =  dices.map((dice,index)=>{
    return <Dice  value={dice.value} 
                  isHeld={dice.isHeld}
                  id={dice.id} 
                  key={index} 
                  Held={Held}
                  />
  })
  //Counter==>
    const [seconds, setSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    let intervalId;
  
    if (isStarted) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
  
    return () => clearInterval(intervalId);
  
  }, [isStarted]); 
  
  function handleStarting() {
    setIsStarted(prev => !prev); 
  }

  return (
    <div className='container'>
    {!win && <Counter seconds = {seconds}  />}
      {!win&& <div className="info--Container">
      <h1>Tenzies</h1>
      <h3><i className="fa-solid fa-star"></i>Highst score : {highScore} rolls<i className="fa-solid fa-star"></i></h3>
      <h3><i className="fa-solid fa-star"></i>Your best time : {bestTime} secondes<i className="fa-solid fa-star"></i></h3>
      <h3>Current rolls count : {rollsCount} rolls</h3>
      </div>}
      
      {win ? <Celebration seconds = {seconds} rollsCount={rollsCount}/> : Dices}
      {win ? <button className='btn' onClick={NewGame} >new game</button> :
       <button className='btn' onClick={HandleRoll} >Roll dices</button>

}
    </div>
  )
}
