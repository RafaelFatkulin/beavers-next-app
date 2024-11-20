import { signInSchema } from "@/app/lib/definitions";

type FormState = {
    errors: {
        email?: string[] | undefined;
        password?: string[] | undefined
    }
} | undefined

export async function signIn(state: FormState, formData: FormData) {
    const validatedFields = signInSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
}