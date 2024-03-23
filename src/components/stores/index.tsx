import AddStore from './add';

const StoreHomeComponent = () => {
	return (
		<div className='flex flex-wrap justify-between' suppressHydrationWarning>
			<AddStore />
			{/* <div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-4 flex '>
				<div className='flex mx-2 w:full'>
					<AddStore />
				</div>
			</div>
			<div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-4 flex '>Hello World</div>
			<div className='w-full md:w-1/2 lg:w-1/3 px-4 mb-4 flex '>Hello world</div> */}
		</div>
	);
};

export default StoreHomeComponent;
