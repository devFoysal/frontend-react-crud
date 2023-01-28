import React from 'react'
import ImagePath from '../../constants/ImagePath'

const Loader = () => {
    return (
        <div><img className="mx-auto w-5" src={ImagePath.icSpinner} /></div>
    )
}

export default Loader