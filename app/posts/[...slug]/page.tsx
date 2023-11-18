import React from 'react'
import { allPosts } from 'contentlayer/generated'

const PostsPage = ({params} : {params:{slug:string[]}}) => {
    // console.log(params.slug);
    // const post = allPosts.find(post => post.)
    return (
        // post只显示在右侧
        <div className='flex-1 border'>
            {params.slug.length}
        </div>
    )
}

export default PostsPage