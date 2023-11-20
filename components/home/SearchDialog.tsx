"use client"
import React, { useEffect,  useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { CiFileOn } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';


const SearchDialog = () => {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    const recentPosts = posts.slice(0, 6)
    // console.log(recentPosts);
    const [inputText, setinputText] = useState("")
    const [blogList, setblogList] = useState([])
    const [open, setOpen] = React.useState(false);
    const setFile = useStore((state) => state.setFile)
    const router = useRouter()
    var selectedIndex = 0

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleKeyDown = (event) => {
        // tab 打开搜索框
        // if (event.key === "Tab") {
        //     // console.log('Tab 键被按下');
        //     event.preventDefault()
        //     setOpen(true)
        // }
        // ctrl k 打开搜索框
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault()
            setOpen(true)
        }
        if (event.ctrlKey && event.key === "p") {
            event.preventDefault()
            setOpen(true)
        }
        // console.log('监听键盘');
    }

    const handleInputKeyDown = (e) => {
        // console.log("输入东西")
        // 如果有搜索到结果，按键才会生效
        const ullist = document.querySelector('.ullist')
        const ullistAtag = ullist.querySelectorAll('a')
        // console.log(ullistAtag.length);

        if (ullistAtag.length !== 0) {
            // ullistAtag[0].classList.add('active');
            if (e.key === 'ArrowDown') {
                selectedIndex = Math.min(selectedIndex + 1, ullistAtag.length - 1)
                updateSelection();

            } else if (e.key === 'ArrowUp') {
                // 不能没有高亮项
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelection();

            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                const post = posts.filter(item => item.title.includes(ullistAtag[selectedIndex].textContent))
                // 跳转到指定文章
                router.push(post[0].url)
                setOpen(false)
                setFile(false)
            } else {

            }
        }
        //没有搜到结果，则施展魔法
        // console.log(inputText)
        // console.log("没搜到结果")
        if (e.key === 'Enter') {
            // 回到首页
            if (inputText === "/") {
                router.push("/")
            }
            if (inputText === "/notes") {
                router.push("/notes")
            }
            setOpen(false)
            setinputText("")
        }
    }

    // 显示列表项高亮
    const updateSelection = () => {
        const ullist = document.querySelector('.ullist')
        const ullistAtag = ullist.querySelectorAll('a')
        // 遍历每个a标签
        for (let i = 0; i < ullistAtag.length; i++) {
            if (i === selectedIndex) {
                ullistAtag[i].classList.add('active');
            } else {
                ullistAtag[i].classList.remove('active');
            }
        }
    }

    const closeDialog = () => {
        setOpen(false)
        setFile(false)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        //获取输入框的值
        setinputText(e.target.value)
        if (e.target.value.length === 0) {
            setblogList([])
        } else {
            var newList = posts.filter(blog => blog.title.toUpperCase().includes(e.target.value.toUpperCase()))
            // console.log(newList);

            setblogList(newList)
        }
    }

    // 鼠标进入清除键盘选中的高亮
    const handleMouseIn = () => {
        const ullist = document.querySelector('.ullist')
        const ullistAtag = ullist.querySelectorAll('a')
        for (let i = 0; i < ullistAtag.length; i++) {
            ullistAtag[i].classList.remove('active');
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <button className='items-center whitespace-nowrap rounded-md font-medium hidden transition-colors ease duration-500  border shadow-sm hover:bg-orange-400  h-9 px-4 py-2 relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64' >
                    <span className='hidden lg:inline-flex'>搜索文章</span>
                    <span className='inline-flex lg:hidden'>搜索...</span>
                    <div className='pointer-events-none absolute right-1.5 top-1.5 hidden  select-none items-center gap-1 rounded border  px-1.5  text-[10px] font-semibold opacity-100 sm:flex'>
                        <span className="text-xs">⌘</span>
                        <span>k</span>
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className='bg-white pt-1.5 max-lg:top-[30%]'>
                <div className='flex h-full w-full flex-col overflow-hidden rounded-md text-popover-foreground'>
                    <div className='flex items-center border-b px-3'>
                        <CiSearch size={25} />
                        <Input placeholder="搜索文章名" type='text' className='text-base outline-none' id='searchPostInput' onChange={handleOnChange} value={inputText} onKeyDown={handleInputKeyDown} />
                    </div>
                    {
                        // 没有输入内容时
                        inputText.length === 0 ?
                            <ScrollArea className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                                <div className='text-base font-semibold mb-2'>最近发布</div>
                                <ul className='ullist' onMouseEnter={handleMouseIn}>
                                    {
                                        recentPosts.map((post, inx) => (
                                            <Link href={post.url} className={inx === 0 ?
                                                'items-center space-x-2 h-[40px]  flex hover:bg-orange-400 cursor-default active'
                                                : 'items-center space-x-2 h-[40px]  flex hover:bg-orange-400 cursor-default'
                                            } onClick={closeDialog} key={post._id}>
                                                <CiFileOn size={30} />
                                                <p>{post.title}</p>
                                            </Link>
                                        )
                                        )
                                    }
                                </ul>
                            </ScrollArea>
                            :
                            //有输入内容
                            <ScrollArea className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                                <ul className='ullist'>
                                    {
                                        //没匹配到结果
                                        blogList.length === 0 ?
                                            <div className='flex h-[40px] justify-center items-center'>
                                                <p>
                                                    没有查到任何结果
                                                </p>
                                            </div>
                                            :
                                            //匹配到结果
                                            blogList.map((post, inx) =>
                                                <Link href={post.url} className={inx === 0 ?
                                                    'items-center space-x-2 h-[40px]  flex hover:bg-orange-400 cursor-default active'
                                                    :
                                                    'items-center space-x-2 h-[40px]  flex hover:bg-orange-400 cursor-default'
                                                }
                                                    onClick={closeDialog} key={post._id}
                                                >
                                                    <CiFileOn size={30} />
                                                    <p>{post.title}</p>
                                                </Link>
                                            )
                                    }
                                </ul>
                            </ScrollArea>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog