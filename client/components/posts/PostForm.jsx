import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/router';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  status: z.enum(['draft', 'published']),
});

const PostForm = ({ initialValues, onSubmit, isSubmitting }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues || {
      status: 'draft',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
        {errors.title && <ErrorMessage message={errors.title.message} />}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows="10"
          {...register('content')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
        />
        {errors.content && <ErrorMessage message={errors.content.message} />}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="draft"
              {...register('status')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Draft</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="published"
              {...register('status')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Published</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={() => router.push('/')}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;