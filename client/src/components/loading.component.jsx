import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './loading.styles.css';

const Loading = () => {
  return (
    <>
      <Loader
        className="loader"
        type="Circles"
        color="#00BFFF"
        height={150}
        width={150}
      />
      <h3>Server is waking up...</h3>
    </>
  );
};

export default Loading;
