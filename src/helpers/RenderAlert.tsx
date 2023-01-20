import React,{FC} from 'react'

interface RenderAlertProps{
    text : string
    type : 'info' | 'danger' | 'success'
}
const RenderAlert : FC<RenderAlertProps> = ({text,type}) => {
  return (
    <div className={`alert alert-${type} d-flex`} style={{'justifyContent':'center','borderRadius':30}} role="alert">
    <div style={{'color':'black'}}>
        {text.length ?
        (
          <div>
            <h5   >{text}</h5>
          </div>
        )
        : (
          <div>
              Unknown Error
          </div>
        )}
    </div>
  </div>
  )
}

export default RenderAlert