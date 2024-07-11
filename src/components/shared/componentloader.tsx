/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WtOzzh1yy4Z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
const ComponentLoader = () => {
	return (
		<div className='flex h-full items-center justify-center bg-background w-full'>
			<div className='grid w-full  gap-4'>
				<div className='aspect-square w-full rounded-md bg-muted animate-pulse' />
				<div className='h-4 w-full rounded-md bg-muted animate-pulse' />
				<div className='h-4 w-3/4 rounded-md bg-muted animate-pulse' />
			</div>
		</div>
	);
};

export default ComponentLoader;
