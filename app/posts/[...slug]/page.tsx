import React from 'react'
import { allPosts, Post } from 'contentlayer/generated'
import RenderMdx from '@/components/blog/RenderMdx'

export async function generateStaticParams() {
    return allPosts.map((post) => ({
      slug: post._raw.flattenedPath.split('/'),
    }))
  }


const PostsPage = ({ params }: { params: { slug: string[] } }) => {
    const decodeSlug = decodeURI(params.slug.join("/"))
    const post: Post = allPosts.find((post) => post._raw.flattenedPath === decodeSlug)

    return (
            
            <article className='flex-1 border'>
                <RenderMdx post={post} />
            </article>
    )
}

export default PostsPage