import React from 'react'
import { RingLoader } from 'react-spinners'
import GlitchText from '../bitsEffects/glitch/Glitch';

const Loading = ( {loading} ) => {
  return (
    <div className="loading-container">
      <RingLoader className='pacman' color="cyan" loading={loading} size={35} />
        <GlitchText
        speed={5}
        enableShadows={true}
        enableOnHover={false}
        className='custom-class'
        >
        Gaming Mode Activating....
        </GlitchText>
    </div>
  )
}

export default Loading