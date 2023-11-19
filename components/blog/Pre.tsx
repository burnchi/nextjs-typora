import { CopyButton } from "./CopyButton";

// 自定义代码块头部 pre标签都会变成下面的组件
export const Pre = ({ children, raw, ...props }) => {
    // 接收编程语言参数
    const lang = props["data-language"];
    // console.log(raw)
    // console.log(props)
    // console.log(children)
    return (
      <pre {...props} className={"flex flex-col border shadow-md "}>
        <div
          className='flex justify-between code-header text-white b  mb-2 w-full px-2'>
          {lang ? lang : "XXX"}
          <CopyButton text={raw} />
        </div>
        {children}
      </pre>
    );
  };
  