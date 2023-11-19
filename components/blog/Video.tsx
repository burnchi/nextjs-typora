import React from 'react'

const Video = ({ url }) => {
    return (
        // 官方嵌入代码
        // <iframe src="//player.bilibili.com/player.html?aid=450150812&bvid=BV1Tj411e7iR&cid=1313902102&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
        // &danmaku=0&autoplay=0&as_wide=1   关闭弹幕和禁止自动播放、宽屏
        // 定义视频宽高16:9
        <div className='aspect-w-16 aspect-h-9'>
            <iframe
                src={`${url}&high_quality=1&as_wide=1&autoplay=1`}
                title='video player'
                className=''
                allowFullScreen={true}
                allow='autoplay;'
                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
            ></iframe>
        </div >
    )
}

export default Video