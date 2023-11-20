"use client"
import React, { useEffect } from 'react'
import { scrollToTop } from '../utils';

const BlogToc = ({ post }) => {

    useEffect(() => {
        if (post.toc.length != 0) {

            const TableOfContents = {
                container: document.querySelector('.js-toc'),
                links: null,
                headings: null,
                intersectionOptions: {
                    rootMargin: '0px',
                    threshold: 1
                },
                previousSection: null,
                observer: null,

                init() {
                    this.handleObserver = this.handleObserver.bind(this)
                    this.setUpObserver()
                    this.findLinksAndHeadings()
                    this.observeSections()
                },

                handleObserver(entries, observer) {
                    entries.forEach(entry => {
                        let href = `#${entry.target.getAttribute('id')}`
                        let link = this.links.find(l => l.getAttribute('id') === href)
                        // console.log(href);
                        // console.log(link);
                        if (link) {

                            if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                                link.classList.add('is-visible')
                                this.previousSection = entry.target.getAttribute('id')
                                // console.log(this.previousSection);

                            } else {
                                link.classList.remove('is-visible')
                            }

                            this.highlightFirstActive()
                        }
                    })
                },

                //使用观察者会匹配同一屏幕的多个元素，只有is-active才会有高亮
                highlightFirstActive() {
                    // 只选择第一个
                    let firstVisibleLink = this.container.querySelector('.is-visible')

                    this.links.forEach(link => {
                        link.classList.remove('is-active')
                    })

                    if (firstVisibleLink) {
                        firstVisibleLink.classList.add('is-active')
                    }

                    if (!firstVisibleLink && this.previousSection ) {
                        // console.log(this.previousSection);
                        const activeLink =  this.container.querySelector(
                            `a[id="#${this.previousSection}"]`
                        )
                        if (activeLink) {
                            activeLink.classList.add('is-active')
                        }
                    }
                },

                observeSections() {
                    this.headings.forEach(heading => {
                        this.observer.observe(heading)
                    })
                },

                setUpObserver() {
                    this.observer = new IntersectionObserver(
                        this.handleObserver,
                        this.intersectionOptions
                    )
                },

                findLinksAndHeadings() {
                    this.links = [...this.container.querySelectorAll('a')]
                    this.headings = [...document.querySelectorAll('#blogdiv h1, #blogdiv h2, #blogdiv h3,#blogdiv h4,#blogdiv h5') as NodeListOf<HTMLElement>];
                    // console.log(this.links);
                    // console.log(this.headings);

                }
            }

            TableOfContents.init()
        }
        // return ()=> {delete TableOfContents}
    }, [post.toc.length])
    return (
        <div className='w-full flex-1 overflow-y-scroll'>
            <ul className=' text-base mt-4 js-toc' >
                {
                    post.toc.length != 0 ?
                        post.toc.map((heading: { slug: string; level: string; text: string }) => {
                            return (
                                <li key={`#${heading.slug}`} className='flex pb-1 hover:bg-zinc-200 '>
                                    <a data-level={heading.level} className='font-medium cursor-default
          data-[level=one]:pl-0 data-[level=one]:text-base 
          data-[level=two]:pl-4 data-[level=two]:text-base 
          data-[level=three]:pl-8
          data-[level=four]:pl-12
          data-[level=five]:pl-16
          border-solid border-dark/40 flex-1 inline-block
          '
                                        onClick={() => {
                                            scrollToTop(heading.slug)
                                        }}
                                        // 这里给a标签加的id值
                                        id={`#${heading.slug}`}
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            )
                        })
                        :
                        <div className='font-semibold text-center mt-10'>
                            文章没有标题
                        </div>
                }
            </ul>
        </div>
    )
}

export default BlogToc