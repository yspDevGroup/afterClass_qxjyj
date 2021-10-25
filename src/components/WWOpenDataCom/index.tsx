import React, { useRef, useLayoutEffect } from 'react';

type PropsType = {
  type: 'userName' | 'departmentName';
  openid: string;
};
export default function WWOpenDataCom({ type, openid }: PropsType) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (openid && typeof WWOpenData !== 'undefined' && WWOpenData?.bind) {
      WWOpenData.bind(ref.current);
    }
  }, [openid]);
  return <ww-open-data ref={ref} type={type} openid={openid} />;
}
