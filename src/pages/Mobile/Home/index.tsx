import { useModel } from 'umi';

const HomePage = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <span>mobile端</span>
  )
}

export default HomePage;
