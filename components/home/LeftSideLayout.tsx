"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CiFolderOn } from "react-icons/ci";
import { PiFileTextDuotone } from "react-icons/pi";
import Link from 'next/link'
import { useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import { usePathname } from 'next/navigation';

const LeftSideLayout = () => {
    const path = usePathname()

    const [switchPage, setswitchPage] = useState("file")
    let dirList = Array.from(new Set(allPosts.map(post => post._raw.sourceFileDir)))
    // 将未分类的放到最后显示
    dirList = dirList.filter(item => item !== '.')
    dirList.push('.')
    // console.log(path);
    
   

    const handleswitchFile = () => {
        setswitchPage("file")
    }
    const handleswitchToc = () => {
        setswitchPage("toc")
    }
    return (
        <div className='w-[20vw]  border flex flex-col'>
            {/* 选项卡 */}
            <div className='h-[6vh] border flex'>
                <div className='w-1/2 flex items-center justify-center border relative'>

                    <button className=' inline-block flex-1 h-full ' onClick={handleswitchFile}>
                        <span className={switchPage === "file" ?
                            "text-black" : "text-black/60"
                        }
                        >文件</span>
                        {
                            switchPage === 'file' ?
                                <span className=' absolute bottom-0 h-1 bg-black w-1/2 left-1/2 -translate-x-1/2'></span>
                                :
                                null
                        }
                    </button>
                </div>
                <div className='flex-1 flex items-center justify-center '>
                    <button className=' inline-block flex-1 h-full relative' onClick={handleswitchToc}>
                        <span className={switchPage === "toc" ?
                            "text-black" : "text-black/60"
                        }
                        >大纲</span>
                        {
                            switchPage === 'toc' ?
                                <span className=' absolute bottom-0 h-1 bg-black w-1/2 left-1/2 -translate-x-1/2'></span>
                                :
                                null
                        }
                    </button>
                </div>
            </div>

            {/* 文件列表或目录大纲 */}
            <Accordion type="single" collapsible className="w-full flex-1 overflow-y-auto overflow-x-hidden
        ">
                {
                    dirList.map((dir, inx) => {

                        return (
                            <div key={inx}>
                                <AccordionItem value={`item-${inx}`}  className=''>
                                    <AccordionTrigger className=' text-black/60 p-2 cursor-default hover:no-underline hover:text-black'>
                                        <div className='flex items-center gap-x-1'>
                                            <CiFolderOn className="" size={24} />
                                            <span>{dir === '.' ? '未分类' : dir}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className=' space-y-1 mt-1 text-black/60 '>
                                        {
                                            allPosts.filter(post => post._raw.sourceFileDir === dir).map(filtPost =>
                                                <Link href={filtPost.url} key={filtPost._id} className={
                                                    decodeURI(path) === decodeURI(filtPost.url) ?
                                                        'flex gap-x-1 items-center pl-2 hover:text-black cursor-default active relative' 
                                                        :
                                                        'flex gap-x-1 items-center pl-2 hover:text-black cursor-default'
                                                }
                                                >
                                                    <PiFileTextDuotone size={24} />
                                                    <span>{filtPost._raw.sourceFileName}</span>
                                                </Link>

                                            )
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        )

                    })
                }
            </Accordion>
        </div>
    )
}

export default LeftSideLayout