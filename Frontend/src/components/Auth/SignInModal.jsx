import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../redux/slices/authSlice';
import UserDropdown from '../User/userDropdown';
import SignUpModal from './SIgnUpModal';
import { jwtDecode } from "jwt-decode";
import LoginGoogle from './LoginGoogle';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticateUser } from '../../services/authService';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function SignInModal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { t } = useTranslation('translation');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const decoded = await authenticateUser(dispatch, data);
      // console.log('Login successful', decoded);
      setIsSignInOpen(false);
    } catch (error) {
      // Handle error inside authenticateUser
    }
  };

  function closeSignInModal() {
    setIsSignInOpen(false);
  }

  function openSignInModal() {
    setIsSignInOpen(true);
  }

  function closeSignUpModal() {
    setIsSignUpOpen(false);
  }

  function openSignUpModal() {
    setIsSignUpOpen(true);
  }

  function closeForgotPasswordModal() {
    setIsForgotPasswordOpen(false);
  }

  function openForgotPasswordModal() {
    setIsForgotPasswordOpen(true);
  }

  return (
    <>
      <div>
        {user ? (
          <UserDropdown />
        ) : (
          <button
            type="button"
            onClick={openSignInModal}
            className="border-r-2 pr-4"
          >
            <FontAwesomeIcon icon={faUser} className="pr-1" /> {t('header.signin')}
          </button>
        )}
      </div>

      <Transition appear show={isSignInOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSignInModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center pt-20">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex justify-between w-1/2 transform overflow-hidden rounded-md shadow-xl transition-all">
                  <div className="flex-col flex py-20 px-10 space-y-5 bg-zinc-700 text-white items-center w-1/2">
                    <h1 className="font-rubikmonoone text-lg text-orange-500">
                      Welcome back!
                    </h1>
                    <p className="font-poppins text-center">
                      Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
                    </p>
                    <button
                      className="flex font-poppins bg-gradient-to-r from-zinc-500 to-zinc-600 w-fit p-3 shadow-zinc-800 shadow-md rounded-md"
                      onClick={() => {
                        closeSignInModal();
                        openSignUpModal();
                      }}
                    >
                      No account yet?{' '}
                      <p className="pl-1 text-orange-500 font-bold">Sign up!</p>
                    </button>
                  </div>
                  <div className="bg-white w-1/2 px-20 text-black flex-col flex font-poppins justify-center" >
                    <form onSubmit={handleSubmit(onSubmit)} className=" text-black flex-col flex font-poppins justify-center pb-5" >
                      <label className="font-rubikmonoone text-xl items-center text-center mb-2">Sign in</label>
                      <label className="">Username</label>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                        {...register('userName', {
                          required: true,
                          maxLength: 20,
                          pattern: /^[a-zA-Z0-9_]+$/,
                        })}
                      />
                      {errors.userName && errors.userName.type === 'required' && (
                        <p className="text-red-400 text-sm italic">This field is required!</p>
                      )}
                      {errors.userName && errors.userName.type === 'maxLength' && (
                        <p>Username cannot exceed 20 characters</p>
                      )}
                      {errors.userName && errors.userName.type === 'pattern' && (
                        <p className="text-red-400 text-sm italic">Username can only contain letters, numbers, and underscores</p>
                      )}

                      <label className="">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                          {...register('password', { required: true })}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="cursor-pointer text-orange-400"
                            onClick={togglePasswordVisibility}
                          />
                        </div>
                      </div>
                      {errors.password && <p className="text-red-400 text-sm italic">Password is required</p>}
                      <button
                        className="text-left pb-3 text-blue-500 underline"
                        onClick={() => {
                          closeSignInModal();
                          openForgotPasswordModal();
                        }}
                      >
                        Forgot password?
                      </button>

                      <button
                        type="submit"
                        className="bg-orange-500 font-rubikmonoone text-white rounded-lg px-10 py-2 w-full"
                        onClick={closeSignInModal}
                      >
                        Sign in
                      </button>
                    </form>

                    <LoginGoogle setIsSignInOpen={setIsSignInOpen} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ForgotPasswordModal isOpen={isForgotPasswordOpen} closeModal={closeForgotPasswordModal} />

      <SignUpModal isOpen={isSignUpOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal} />
    </>
  );
}
