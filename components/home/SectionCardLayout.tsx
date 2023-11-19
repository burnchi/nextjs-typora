"use client"
import { useStore } from '@/store'
import React from 'react'

const SectionCardLayout = () => {
    const  isFile = useStore((state) => state.isFile)
    const  setisFile = useStore((state) => state.setisFile)

    const handleswitch = () => {
        setisFile()
    }
  return (
    <div className='h-[6vh] border flex'>
                <div className='w-1/2 flex items-center justify-center border relative'>

                    <button className=' inline-block flex-1 h-full ' onClick={handleswitch}>
                        <span className={isFile === true ?
                            "text-black" : "text-black/60"
                        }
                        >文件</span>
                        {
                            isFile === true ?
                                <span className=' absolute bottom-0 h-1 bg-black w-1/2 left-1/2 -translate-x-1/2'></span>
                                :
                                null
                        }
                    </button>
                </div>
                <div className='flex-1 flex items-center justify-center '>
                    <button className=' inline-block flex-1 h-full relative' onClick={handleswitch}>
                        <span className={isFile === false ?
                            "text-black" : "text-black/60"
                        }
                        >大纲</span>
                        {
                            isFile === false ?
                                <span className=' absolute bottom-0 h-1 bg-black w-1/2 left-1/2 -translate-x-1/2'></span>
                                :
                                null
                        }
                    </button>
                </div>
            </div>
  )
}

export default SectionCardLayout