import Login from "./components/Login";

const Home = ({ authenticated, onAuthenticated }) => {
  return (
    <>
      <h2>This is home</h2>
      {!authenticated ? (
        <Login
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        <p>You are Authenticated! Welcome!</p>
      )}
    </>
  );
};

export default Home;
