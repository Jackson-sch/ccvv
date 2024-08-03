import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex w-full h-screen flex-grow items-center bg-black px-4 sm:justify-center">
      <SignUp />
    </div>
  );
}
