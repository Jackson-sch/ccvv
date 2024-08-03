
export default function AuthLayout({ children }) {
  return (
    <div className="flex w-full bg-black h-full items-center justify-center">
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
