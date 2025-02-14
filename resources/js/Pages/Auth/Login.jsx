/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

// eslint-disable-next-line react/prop-types
export default function Login({ status, canResetPassword }) {
  const {
    data, setData, post, processing, errors, reset,
  } = useForm({
    email: '',
    password: '',
    remember: '',
  });

  useEffect(() => () => {
    reset('password');
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <Guest>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" />

          <Input
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            handleChange={onHandleChange}
          />
        </div>

        <div className="block mt-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="flex items-center" htmlFor="remember">
            <Checkbox name="remember" id="remember" value={data.remember} handleChange={onHandleChange} />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link href={route('register')} className="ml-4 mr-4 text-sm text-gray-700 underline">
            Register
          </Link>

          {canResetPassword && (
            <>
              {' '}
              |
              <Link
                href={route('password.request')}
                className="underline text-sm ml-4 text-gray-600 hover:text-gray-900"
              >
                Forgot your password?
              </Link>
            </>
          )}

          <Button className="ml-4" processing={processing}>
            Log in
          </Button>
        </div>
      </form>
    </Guest>
  );
}
