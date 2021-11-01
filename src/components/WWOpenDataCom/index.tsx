import React, { useRef, useLayoutEffect, useState, CSSProperties } from 'react';

type PropsType = {
  type: 'userName' | 'departmentName';
  openid: string;
  style?: CSSProperties;
};
export default function WWOpenDataCom({ type, openid, style = {} }: PropsType) {
  const ref = useRef(null);
  const [showWechat, setShowWechat] = useState(true);

  useLayoutEffect(() => {
    if (openid && typeof WWOpenData !== 'undefined' && WWOpenData.bind) {
      WWOpenData.bind(ref.current);
    } else {
      setShowWechat(false);
    }
  }, [openid]);
  if (showWechat) {
    return <ww-open-data style={{ color: '#333', ...style }} ref={ref} type={type} openid={openid} />;
  }
  return (
    <span
      style={{
        color: '#333',
        display: 'inline-block',
        maxWidth: '5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...style
      }}
    >
      {openid}
    </span>
  );
}
