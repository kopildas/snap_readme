import React from 'react'

export default function Input({name,onChange,value}) {
  const onChangeFunc = (e)=> {
      onChange(e);
    }
  return (
    <div className="relative float-label-input h-8">
                  <input
                    required
                    type="text"
                    id={name}
                    placeholder=" "
                    className="block bg-zinc-800  focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-3  appearance-none leading-normal focus:border-blue-400"
                    // value={name}
                    onChange={onChangeFunc}
                  />
                  <label className="absolute top-3 bg-zinc-800 text-sm left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-out  px-2 text-grey-darker">
                    {value}
                  </label>
                </div>
  )
}
