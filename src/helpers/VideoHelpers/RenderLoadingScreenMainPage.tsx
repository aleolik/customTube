import React, { FC } from 'react'
import GrayCard from '../../components/GrayCard'
import { IVideo } from '../../types/VideoTypes'

// loading screen(only on main page) - 25 gray cards


export const RenderLoadingScreenMainPage  = () => {
  return (
    <div className='row'>
        {[...Array(24)].map((x, i) =>
            <div  className='col-lg-3 col-md-6 col-sm-6' key={i}>
              <GrayCard />
            </div>
        )}
    </div>
  )
}

export default RenderLoadingScreenMainPage