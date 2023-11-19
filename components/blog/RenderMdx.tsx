"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Pre } from './Pre'
import HighlightEle from './HighlightEle'
import Video from './Video'
import { LuCalendarClock, LuPencilLine, LuCalendarCheck } from 'react-icons/lu'

const components = {
  Image,
  pre: Pre,
  HighlightEle,
  Video
}

const RenderMdx = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className=' flex flex-col gap-y-5 w-full py-10 2xl:px-[121px] px-[30px]'>
      {/* 博客内容主体 */}
      <div className=' min-w-full font-medium lg:text-lg text-base
     prose
     prose-h1:text-4xl prose-h1:border-b prose-h1:pb-1
     prose-h2:text-3xl 
     prose-h3:text-2xl
     prose-h4:text-xl
     prose-h5:text-lg
     prose-h6:text-base 
     prose-table:border-collapse prose-table:border prose-table:border-slate-400 prose-table:text-center
     prose-th:border prose-th:border-slate-300 prose-th:bg-slate-400
     prose-td:border prose-td:border-slate-300
   prose-a:text-blue hover:prose-a:text-orange-600 prose-a:bg-[#f6f8fa]
   prose-blockquote:bg-accent/20
     prose-blockquote:p-1
     prose-blockquote:px-3
   prose-blockquote:border-accent
     prose-blockquote:not-italic
     prose-blockquote:rounded-r-lg
      
    ' id='blogdiv'>
        <MDXContent components={components} />

      </div>
      {/* 预留300px空白，给目录高亮最后一个标题 */}
      <div className='lg:mt-[300px] mt-[50px]' />
    </div>
  )
}
export default RenderMdx

