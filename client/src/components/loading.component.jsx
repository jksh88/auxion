import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => {
  return (
    <div>
      <span>Server is waking up. Just a moment</span>
      <FontAwesomeIcon icon="spinner" spin />
      <FontAwesomeIcon icon={['fab', 'apple']} />
      {/* <i class="fas fa-sync fa-spin"></i> */}
    </div>
  );
};

export default Loading;
