import styles from "@/styles/Login.module.css";
const Login = ({ uname, pass, login, setUname, setPass, error }) => {
  return (
    <form onSubmit={login} className={styles.form}>
      <input
        type="text"
        className={styles.unameinput}
        placeholder="Enter UserName"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
      ></input>
      <input
        type="password"
        className={styles.unameinput}
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      ></input>
      <button type="submit">Login</button>
      <label>{error?.response?.data.message}</label>
    </form>
  );
};

export default Login;
