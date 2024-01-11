import React, { CSSProperties } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function SpinnerLoader() {
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "aqua",
      };
  return (
    <>
        <div className='absolute w-[100vw] h-[100%] flex top-0 justify-center items-center'>
            <ClipLoader
            color={'gray'}
            loading={true}
            cssOverride={override}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
            className='relative top-[-50px]'
            />
        </div>
    </>
  )
}

export default SpinnerLoader
