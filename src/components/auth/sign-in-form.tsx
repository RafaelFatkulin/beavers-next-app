'use client'

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
import { type SignIn, signInSchema } from "@/app/lib/definitions";
import { useMutation, useQuery } from "@tanstack/react-query";

export const SignInForm = () => {
    const form = useForm<SignIn>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const {data, mutate, error, isPending, isError} = useMutation({
        mutationKey: ['auth', 'signin'],
        mutationFn: async (values: SignIn) => {
            try {
                const res = await fetch('http://localhost:8001/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                return await res.json()
            } catch (err) {
                return err
            }
        }
    })

    const handleSubmit = (values: SignIn) => {
        mutate(values)
    }

    return (
        <Form {...form}>
            <form
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
                        </FormItem>
                    )}
                />
                <Button type={'submit'} disabled={isPending}>
                    Войти
                </Button>

                <pre>{JSON.stringify(data)}</pre>
                <pre>isError - {JSON.stringify(error)}</pre>
            </form>
        </Form>
    );
}
