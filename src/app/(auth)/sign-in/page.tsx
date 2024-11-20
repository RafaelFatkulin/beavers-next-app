import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignIn() {
    return (
        <section className='flex flex-col gap-6 max-w-[420px] w-full'>
            <h1 className='text-xl font-semibold'>Логин</h1>
            <SignInForm />
        </section>
    )
}
