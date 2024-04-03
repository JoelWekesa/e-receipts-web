'use client';
import {storeAtom} from '@/atoms/store';
import {useAtom} from 'jotai';
import {Calendar, FileDigit, PhoneCall, Pin} from 'lucide-react';
import Image from 'next/image';
import React, {FC, ReactNode} from 'react';
import dayjs from 'dayjs';

const StoreComponent = () => {
	const [store, _] = useAtom(storeAtom);
	return (
		<div className='p-2 flex flex-col gap-5'>
			<Wrapper>
				<div className='flex flex-row gap-2 items-end'>
					<Image
						src={store?.logo || ''}
						alt='store logo'
						width={100}
						height={100}
						style={{
							borderRadius: '10%',
						}}
						placeholder='blur'
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
					/>
					<p className='tracking-widest text-3xl ml-auto break-words'>{store?.name}</p>
				</div>
			</Wrapper>
			<Wrapper>
				<RowWrap>
					<div className='w-2/5'>
						<RowWrap>
							<div className='mx-1'>
								<FileDigit />
							</div>
							<div className='mx-1'>
								<p className='text-sm tracking-tighter'>Pin No</p>
							</div>
						</RowWrap>
					</div>

					<div className='w-3/5'>
						<p className='text-sm tracking-tighter'>{store?.pin_no || 'Not provided'}</p>
					</div>
				</RowWrap>
			</Wrapper>
			<Wrapper>
				<RowWrap>
					<div className='w-2/5'>
						<RowWrap>
							<div className='mx-1'>
								<FileDigit />
							</div>
							<div className='mx-1'>
								<p className='text-sm tracking-tighter'>VAT No</p>
							</div>
						</RowWrap>
					</div>

					<div className='w-3/5'>
						<p className='text-sm tracking-tighter'>{store?.vat_reg_no || 'Not provided'}</p>
					</div>
				</RowWrap>
			</Wrapper>
			<Wrapper>
				<RowWrap>
					<div className='w-2/5'>
						<RowWrap>
							<div className='mx-1'>
								<Calendar />
							</div>
							<div className='mx-1'>
								<p className='text-sm tracking-tighter'>Since</p>
							</div>
						</RowWrap>
					</div>

					<div className='w-3/5'>
						<p className='text-sm tracking-tighter'>{dayjs(store?.createdAt).format('DD MMMM YYYY')}</p>
					</div>
				</RowWrap>
			</Wrapper>
		</div>
	);
};

const Wrapper: FC<{children: ReactNode}> = ({children}) => {
	return <div className='py-3 border-b'>{children}</div>;
};

const RowWrap: FC<{children: ReactNode}> = ({children}) => {
	return <div className='flex flex-wrap sm:flex-rows'>{children}</div>;
};

export default StoreComponent;
