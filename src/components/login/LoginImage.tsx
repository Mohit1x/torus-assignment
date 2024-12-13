const LoginImage = () => {
  // const backgroundStyle = {
  //   backgroundImage: "url(/loginbg.png)",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   height: "100vh",
  // };
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/loginbg.png)" }}
    >
      <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg flex items-center max-w-3xl h-[80%] w-[60%] relative">
        {/* Text Section */}
        <div className="text-white font-bold text-2xl ml-6 mb-[230px] max-w-[50%]">
          Very good works are waiting for you Login Now!!!
        </div>

        {/* Image Section */}
        <img
          src="/loginimage.png"
          alt="Login Illustration"
          className="w-full absolute right-0 transform translate-x-24 mt-4"
        />
      </div>
    </div>
  );
};

export default LoginImage;
