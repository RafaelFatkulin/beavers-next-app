'use client'

import {useActionState} from 'react'
import {useFormStatus} from 'react-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignIn, signInSchema } from "@/app/lib/definitions";
import { signIn } from "@/app/actions/auth";

export const SignInForm = () => {
    const [state, action] = useActionState(signIn, undefined)

    const form = useForm<SignIn>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const handleSubmit = (values: SignIn) => {
        console.log(values);
        action(values)
    }
    return (
        <Form {...form}>
            <form
                action={action}
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-4'
            >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder={'email@email.com'} {...field} />
                            </FormControl>
                            <FormMessage/>
                            {state?.errors?.email && <p>{state.errors.email}</p>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder={'********'} {...field} />
                            </FormControl>
                            <FormMessage/>
                            {state?.errors?.password && <p>{state.errors.password}</p>}
                        </FormItem>
                    )}
                />
                <SubmitButton />
            </form>
        </Form>
    );
}

function SubmitButton() {
    const {pending} = useFormStatus()

    return (
        <Button type={'submit'} disabled={pending}>
            Войти
        </Button>
    )
}