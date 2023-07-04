import styles from './home.module.css';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ResponseModal from 'Components/Shared/ResponseModal';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import Landing from 'Components/Landing/Landing';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = sessionStorage.getItem('role');
  const { show, message, state } = useSelector((state) => state.toast);

  return (
    <>
      <section className={styles.container}>
        {!role && (
          <div className={styles.buttonContainer} data-testid="home-buttons-container">
            <Button
              text="Sign Up"
              classNameButton="submitButton"
              action={() => history.push('/signup')}
            />
            <Button
              text="Log In"
              classNameButton="submitButton"
              action={() => history.push('/login')}
            />
          </div>
        )}

        {show && (
          <ResponseModal
            handler={() => dispatch(handleDisplayToast(false))}
            state={state}
            message={message}
          />
        )}
      </section>
      <Landing />
    </>
  );
}

export default Home;
