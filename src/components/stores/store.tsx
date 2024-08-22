'use client';
import {storeAtom} from '@/atoms/store';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {Calendar, Facebook, FileDigit, Instagram, Share, Twitter} from 'lucide-react';
import Image from 'next/image';
import {FC, ReactNode} from 'react';
import CopyItem from '../shared/copy';
import {Button} from '../ui/button';

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
					<p className='tracking-widest text-3xl ml-auto break-words'>{store?.displayName}</p>
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

			<Wrapper>
				<RowWrap>
					<div className='w-2/5'>
						<RowWrap>
							<div className='mx-1'>
								<Share />
							</div>
							<div className='mx-1'>Share</div>
						</RowWrap>
					</div>

					<div className='w-3/5 flex flex-row gap-2'>
						<Button variant='ghost' size='icon'>
							<Instagram />
						</Button>
						<Button variant='ghost' size='icon'>
							<Facebook />
						</Button>
						<Button variant='ghost' size='icon'>
							<Twitter />
						</Button>

						<CopyItem copy={`${process.env.NEXT_PUBLIC_DOMAIN}/shop/${store?.name}`} />
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
