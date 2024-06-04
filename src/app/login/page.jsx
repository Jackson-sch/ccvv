import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      
      <div className="bg-gradient-to-t from-transparent to-default-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className='text-2xl mb-6 text-center font-semibold'>Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block first-line:tracking-widest text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="bg-default-50 appearance-none border-b border-sky-500 rounded w-full py-2 px-3  leading-tight   focus:outline-none  placeholder:text-sm"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block first-line:tracking-widest text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-default-50 appearance-none border-b border-sky-500 rounded w-full py-2 px-3  leading-tight   focus:outline-none  placeholder:text-sm"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard"
            className="bg-default-50 hover:bg-default-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Iniciar sesión
          </Link>
          <a
            className="inline-block align-baseline text-sm text-default-500 hover:text-blue-800"
            href="#"
          >
            ¿Has olvidado tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}
