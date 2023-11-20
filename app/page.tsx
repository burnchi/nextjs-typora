

export default function Home() {


  return (
    // 家的右侧栏
    <div className='flex-1 h-[99dvh] overflow-y-hidden flex flex-col items-center justify-center gap-y-2 text-lg font-medium'>
      <div className=" flex gap-x-4 ">
        <div className=" flex-auto flex flex-col items-end">
          <p>切换选项卡</p>
          <p>搜索文件</p>
        </div>
        <div className=" flex-auto flex flex-col justify-start flex-nowrap">
          <p> <span className=" bg-zinc-200 px-1">Tab</span></p>
          <p> 
            <span className=" bg-zinc-200 px-1">Crtl</span>+
            <span className=" bg-zinc-200 px-1">P</span>
            <span className="px-2"> </span>
            <span className=" bg-zinc-200 px-1"> Crtl</span>+
            <span className=" bg-zinc-200 px-1"> K</span>
          </p>
        </div>
      </div>
      
    </div>
  )
}
