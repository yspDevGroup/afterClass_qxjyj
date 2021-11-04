/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-23 10:48:13
 * @LastEditTime: 2021-10-25 11:45:06
 * @LastEditors: Sissle Lynn
 */
import StateTab from '../component/StateTab';

const Detatil = (props: any) => {
  const { id } = props.state;
  return (
    <>
      <div style={{ background: '#fff'}}>
        <StateTab TabState={{ DDZT: ['已付款'], id }} />
      </div>
    </>
  );
};
export default Detatil;
