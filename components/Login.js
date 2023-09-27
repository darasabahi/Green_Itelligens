const Login = ({ uname, pass, login, setUname, setPass }) => {
  return (
    <form onSubmit={login}>
      <input
        type="text"
        placeholder="Enter UserName"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      ></input>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
