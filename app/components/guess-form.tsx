import { zodResolver } from '@hookform/resolvers/zod';
import type { ActionFunctionArgs } from 'react-router';
import { Form as RemixForm } from 'react-router';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from '~/components/ui/form';
import { FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const formSchema = z.object({
    guess: z.string().min(5).max(5),
});

type FormData = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
    const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
    if (errors) {
        return Response.json({ errors, defaultValues });
    }

    // Do something with the data
    return Response.json(data);
};

export default function Index() {
    const form = useRemixForm<FormData>({
        mode: 'onSubmit',
        resolver,
        defaultValues: {
            guess: '',
        },
    });

    return (
        <RemixForm onSubmit={form.handleSubmit} className="space-y-8">
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            <Form {...(form as any)}>
                <FormField
                    control={form.control}
                    name="guess"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guess</FormLabel>
                            <FormControl>
                                <Input placeholder="5 letter word" {...field} />
                            </FormControl>
                            <FormDescription>Make a guess</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </Form>
        </RemixForm>
    );
}
