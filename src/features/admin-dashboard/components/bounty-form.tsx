'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BountySchema, BountyInput } from '../schemas';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BountyFormProps {
    initialData?: Partial<BountyInput>;
    onSubmit: (data: BountyInput) => Promise<void>;
    isLoading?: boolean;
}

export function BountyForm({ initialData, onSubmit, isLoading = false }: BountyFormProps) {
    const form = useForm<BountyInput>({
        resolver: zodResolver(BountySchema) as any,
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            description: initialData?.description || '',
            long_description: initialData?.long_description || '',
            reward_amount: initialData?.reward_amount || 0,
            status: (initialData?.status as any) || 'draft',
            type: initialData?.type || 'bounty',
            company_name: initialData?.company_name || '',
            skills: initialData?.skills || [],
            difficulty: (initialData?.difficulty as any) || 'intermediate',
            deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().slice(0, 16) : '',
            requirements: initialData?.requirements || [],
            repository_url: initialData?.repository_url || '',
        },
    });

    const title = form.watch('title');

    // Auto-generate slug from title
    useEffect(() => {
        if (title && !initialData?.slug) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            form.setValue('slug', slug, { shouldValidate: true });
        }
    }, [title, form, initialData?.slug]);

    const handleSubmit = async (data: BountyInput) => {
        try {
            // Convert local datetime-local string (YYYY-MM-DDTHH:mm) to ISO string with timezone (YYYY-MM-DDTHH:mm:ss.sssZ)
            // This ensures 00:00 local time is saved as the correct UTC instant.
            const formattedData = {
                ...data,
                deadline: data.deadline ? new Date(data.deadline).toISOString() : '', // format to ISO
            };
            await onSubmit(formattedData);
        } catch {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Fix Login Bug" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="fix-login-bug" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="reward_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reward (RM)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="500"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deadline</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input placeholder="bug, feature, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repository_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repository URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Brief summary..."
                                    className="h-20"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="long_description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description (Markdown)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Detailed requirements, markdown supported..."
                                    className="min-h-[200px] font-mono"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Requirements (One per line)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="- Requirement 1&#10;- Requirement 2"
                                    className="min-h-[150px]"
                                    value={Array.isArray(field.value) ? field.value.join('\n') : ''} // Display as string
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const items = val.split('\n').filter(line => line.trim() !== '');
                                        field.onChange(items); // Store as array
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Enter each requirement on a new line.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        variant="default"
                        className="min-w-[150px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Bounty'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
