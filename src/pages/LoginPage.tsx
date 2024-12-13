import LoginForm from "../components/login/LoginForm";
import LoginImage from "../components/login/LoginImage";

const LoginPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[50%]">
        <LoginForm />
      </div>
      <div className="w-[50%]">
        <LoginImage />
      </div>
    </div>
  );
};

export default LoginPage;
