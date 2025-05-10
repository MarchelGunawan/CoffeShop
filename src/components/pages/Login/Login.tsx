import type { FormEvent } from "react";
import Input from "../ui/Input";
import LoginImage from '../../../assets/LoginPage.jpg'
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (event: FormEvent) => {
    event?.preventDefault();
    const form = event?.target as HTMLFormElement;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };
    const result = await login(payload);
    setLocalStorage('auth', result.token);

    return navigate('/');
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-sm mt-4">If you already a member, easily to login</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input name="email" id="email" type="Email" />
            <Input name="password" id="password" type="Password" />
            <button type="submit" className="text-base font-semibold text-white bg-[#B68068] py-2 px-8 rounded-xl hover:shadow-lg hover:bg-[#D39A7B]">Login</button>
          </form>

          {/* Pembatas */}
          <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500"/>
            <p className="text-center">OR</p>
            <hr className="border-gray-500"/>
          </div>

          {/* button login via google */}
          <button className="bg-white border-thin py-2 w-full rounded-xl mt-5 flex justify-center item-center hover:bg-gray-50">
            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Login with Google
          </button>

          {/* Forgot password */}
          <p className="mt-5 text-xs border-b py-4 border-gray-500">Forgot your password?</p>

          {/* Register */}
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>If you do not have an account..</p>
            <button className="py-2 px-5 bg-white border-thin rounded-xl hover:bg-gray-50">Register</button>
          </div>

        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={LoginImage}></img>
        </div>
      </div>
    </section>
  );
}

export default Login