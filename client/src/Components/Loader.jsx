import React from 'react'

export default function Loader() {
  return (
    <div className='h-screen flex items-center justify-center'>
<div className="animate-pulse flex flex-col items-center gap-4 w-96">
  <div>
    <div className="w-80 h-6 bg-slate-400 rounded-md"></div>
    <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
  </div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-full rounded-md"></div>
  <div className="h-7 bg-slate-400 w-1/2 rounded-md"></div>
</div>
</div>

  )
}

/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
