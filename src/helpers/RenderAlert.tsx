import React,{FC} from 'react'

interface RenderAlertProps{
    error : string
}
const RenderAlert : FC<RenderAlertProps> = ({error}) => {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
    <div style={{'color':'black'}}>
        {error ?
        (
          <div>
            <h5 style={{'textAlign':'center'}}>{error}</h5>
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