import { compareDesc,parseISO } from "date-fns"

//将含字符串的数组转换成"1 2 3"形式的字符串
export const cx = (...classNames: any[]) => classNames.filter(Boolean).join(" ")

export function scrollToTop(targetSection:string) {
    // 使用window.scrollTo()方法回到页面顶部
    const targetElement = document.getElementById(targetSection)
    window.scrollTo({
        top: targetElement.offsetTop - 40,
        behavior: 'smooth' // 添加平滑滚动效果
    });
}


export function scrollTocItem(toc:HTMLElement,num:number){
    toc.scrollTo({
        top: num,
        behavior: 'smooth' // 添加平滑滚动效果
    });

}