import Expired from './expired';

const Index = (props: any) => {
  const { id } = props.state;
  return (
    <>
      <div style={{ background: '#fff'}}>
          <Expired TabState={{ DDZT: ['已付款'], id }} />
      </div>
    </>
  );
};
export default Index;
