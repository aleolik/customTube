import React from 'react'

// gray card without any data,just for loading main screen
const GrayCard = () => {
  return (
    <div className="card mx-auto" style={{'width':300+'px','height':230,'backgroundColor':'rgba(0,0,0,0.1)'}}>
    <div style={{'width':260,'height':60,'backgroundColor':'lightgray','border':'5px solid gray','borderRadius':20}}></div>
    <div className="card-body">
        <div style={{'width':200,'height':30,'backgroundColor':'lightgray','marginTop':10+'px','border':'5px solid gray'}}></div>
        <hr/>
        <div style={{'width':60,'height':45,'borderRadius':30+'px','border':'5px solid gray','backgroundColor':'lightgray'}}></div>
    </div>
  </div>
  )
}

export default GrayCard