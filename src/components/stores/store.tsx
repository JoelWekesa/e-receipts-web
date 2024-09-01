'use client';
import {storeAtom} from '@/atoms/store';
import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {Calendar, FileDigit, Share} from 'lucide-react';
import {useTheme} from 'next-themes';
import Image from 'next/image';
import {FC, ReactNode} from 'react';
import {Icons} from '../icons';
import CopyItem from '../shared/copy';

export enum Platform {
	facebook = 'facebook',
	twitter = 'twitter',
	whatsapp = 'whatsapp',
}

const StoreComponent = () => {
	const [store, _] = useAtom(storeAtom);

	const {theme} = useTheme();

	const socialMediaLinks: any = {
		facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
		twitter: 'https://twitter.com/intent/tweet?url=',
		whatsapp: 'https://api.whatsapp.com/send?text=',
	};

	const shareToSocialMedia = (platform: Platform, urlToShare: string) => {
		const shareUrl = `${socialMediaLinks[platform]}${encodeURIComponent(urlToShare)}`;
		window.open(shareUrl, '_blank', 'noopener,noreferrer');
	};

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

					<div className='w-3/5 flex flex-row gap-4'>
						<Icons.whatsapp
							className='h-5 w-5'
							onClick={() => {
								shareToSocialMedia(Platform.whatsapp, `${process.env.NEXT_PUBLIC_DOMAIN}/shop/${store?.name}`);
							}}
						/>

						<Icons.faceBook
							className='h-5 w-5'
							onClick={() => {
								shareToSocialMedia(Platform.facebook, `${process.env.NEXT_PUBLIC_DOMAIN}/shop/${store?.name}`);
							}}
						/>

						<Icons.twitter
							className='h-5 w-5'
							color={theme}
							onClick={() => shareToSocialMedia(Platform.twitter, `${process.env.NEXT_PUBLIC_DOMAIN}/shop/${store?.name}`)}
						/>

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
