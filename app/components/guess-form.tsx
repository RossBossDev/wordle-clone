import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ActionFunctionArgs } from 'react-router';
import { Form as RemixForm } from 'react-router';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from '~/components/ui/form';
import { FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
//     if (errors) {
//         return Response.json({ errors, defaultValues });
//     }

//     // Do something with the data
//     return Response.json(data);
// };

export default function GuessForm({ size, onSubmit }: { size: number; onSubmit: (values: { guess: string }) => void }) {
    // const form = useRemixForm<FormData>({
    //     mode: 'onSubmit',
    //     resolver,
    //     defaultValues: {
    //         guess: '',
    //     },
    // });

    const formSchema = z.object({
        guess: z
            .string()
            .min(size, { message: `Guess must be ${size} letters` })
            .max(size, { message: `Guess must be ${size} letters` })
            .transform((val) => val.toUpperCase())
            .refine((val) => /^[A-Z]+$/.test(val), { message: 'Only letters are allowed' }),
    });

    type FormData = z.infer<typeof formSchema>;

    const resolver = zodResolver(formSchema);

    const form = useForm<FormData>({
        resolver,
        defaultValues: {
            guess: '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);

        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="guess"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guess</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={`${size} letter word`}
                                    autoComplete="off"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                />
                            </FormControl>
                            <FormDescription>Make a guess</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
