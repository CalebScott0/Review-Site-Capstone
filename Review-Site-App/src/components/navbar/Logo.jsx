import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className='flex cursor-pointer items-center'
      onClick={() => navigate('/')}
    >
      <img src='/Logo.png' alt='Star' className='w-6' />
      <span className='ml-1 font-mono text-lg font-semibold'>ReviewGuru</span>
    </div>
  );
};

export default Logo;
