"use client"
import React, { useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CiFolderOn } from "react-icons/ci";
import { PiFileTextDuotone } from "react-icons/pi";
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { usePathname } from 'next/navigation';
import SectionCardLayout from './SectionCardLayout';
import { useStore } from '@/store';
import BlogToc from '../blog/BlogToc';

const LeftSideLayout = () => {
    const path = usePathname()
    const post = allPosts.find((post) => decodeURI(post.url) === decodeURI(path))
    const isFile = useStore((state) => state.isFile)
    const setisFile = useStore((state) => state.setisFile)
    // console.log(post);

    let dirList = Array.from(new Set(allPosts.map(post => post._raw.sourceFileDir)))
    // 将未分类的放到最后显示
    dirList = dirList.filter(item => item !== '.')
    dirList.push('.')
    // console.log(path);
    const handleKeyDown = (event) => {
        // tab 打开搜索框
        if (event.key === "Tab") {
            // console.log('Tab 键被按下');
            event.preventDefault()
            setisFile()

        }

    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown)
    }
    )

   
    return (
        <div className='w-[20vw] border-r  flex flex-col h-[99dvh] sticky top-0 left-0 overflow-y-auto'>
            {/* 选项卡 */}
            <SectionCardLayout></SectionCardLayout>

            {/* 文件列表或目录 */}
            {
                isFile === true ?
                    <Accordion type="single" collapsible className="w-full  flex-1 overflow-y-auto overflow-x-hidden
        ">
                        {
                            dirList.map((dir, inx) => {
                                return (
                                    <div key={inx} className=''>
                                        <AccordionItem value={`item-${inx}`} className=' text-base font-medium '>
                                            <AccordionTrigger className=' text-black/60 p-2  cursor-default hover:no-underline hover:text-black'>
                                                <div className='flex items-center gap-x-1'>
                                                    <CiFolderOn className="" size={24} />
                                                    <span>{dir === '.' ? '未分类' : dir}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className=' text-black/60 text-base font-medium'>
                                                {
                                                    allPosts.filter(post => post._raw.sourceFileDir === dir).map(filtPost =>
                                                        <Link href={filtPost.url} key={filtPost._id} className={
                                                            decodeURI(path) === decodeURI(filtPost.url) ?
                                                                'flex gap-x-1 items-center pl-2 py-1 hover:text-black cursor-default active relative'
                                                                :
                                                                'flex gap-x-1 items-center pl-2 py-1 hover:text-black cursor-default'
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
                    :
                    isFile === false && post ?
                        <BlogToc post={post}></BlogToc>
                        :
                        <div className=' text-center mt-10 font-semibold'>暂无大纲</div>
            }


        </div>
    )
}

export default LeftSideLayout