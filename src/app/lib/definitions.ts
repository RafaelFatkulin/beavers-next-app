import { z } from "zod";

export const signInSchema = z.object({
    email: z.string({ required_error: "Поле 'E-mail' обязательно для заполнения" }).email({ message: "Некорректный e-mail адрес"}),
    password: z.string({ required_error: "Поле 'Пароль' обязательно для заполнения" }).min(8, { message: "Минимальная длина пароля - 8 символов" }),
})

export type SignIn = z.infer<typeof signInSchema>