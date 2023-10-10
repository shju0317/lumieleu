import S from './Heading.module.css';

function Heading() {
  return (
    <div className={S.headingWrapper}>
      <h1 className='text-white'>헤더</h1>
    </div>
  );
}

export default Heading;
