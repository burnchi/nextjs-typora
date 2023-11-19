"use client";

import { useState } from "react";
import { cx } from "../utils";
import colorConstant from "../utils/colorConstant";
import { CopyIcon, CorrectIcon } from "../Icon/icon";

export const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    // 3秒后按钮内容复原
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button disabled={isCopied} onClick={copy} className={cx(colorConstant.headerHoverColor, " inline-block")}>
      {isCopied ?
        <CorrectIcon className=''/> :
        <CopyIcon className=''/>
      }

    </button>
  );
};
