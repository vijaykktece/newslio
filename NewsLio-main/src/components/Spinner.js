import React from 'react'
import loading from './loading.gif.gif'


const Spinner = () => {
    return (
        <div className="text-center" >
            <img style={{ width: "75px" }} src={loading} alt="loading" />
        </div>
    )
}

export default Spinner