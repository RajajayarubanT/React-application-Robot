import React, { useEffect, useState, useRef } from 'react'

import './App.css'
const App = () => {

  const [input, setInput] = useState('')
  const [images, setImages] = useState([])
  const inputRef = useRef(null)

  const myDebounce = (callback, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        callback(...args)
      }, delay)
    }
  }

  const InputEventHandler = myDebounce((e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }, 1000)

  const ButtonEventHandler = (e) => {

    if (!input) return inputRef.current.focus()

    let URL = "https://robohash.org/"

    URL = URL + input

    setImages([...images, URL])
    inputRef.current.value = ''

  }

  const RemoveImageEvent = (i) => {

    let filtered = images.filter((IMG, _i) => _i !== i)

    setImages(filtered)

  }


  return (
    <div className='project-main'>
      <div className='input-section'>

        <input
          type="text"
          onChange={InputEventHandler}
          placeholder='Generate Robot'
          ref={inputRef}
        />

        <button onClick={ButtonEventHandler}>Enter</button>
      </div>
      <div className='output-section'>
        <h1>Robot List</h1>
        <div className="output-section-items">
          {images.length ? images.map((img, i) => {

            return (<img onClick={(e) => RemoveImageEvent(i)} key={i} src={img} alt="" />)
          }) : (<h5 style={{ marginTop: '5rem' }}>No Robotos Here</h5>)}

        </div>
      </div>
    </div>
  )
}

export default App;
