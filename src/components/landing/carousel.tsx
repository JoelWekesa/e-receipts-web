'use client';
import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '../ui/carousel';
import {Card, CardContent} from '../ui/card';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const CarouselComponent = () => {
	return (
		<div className='w-full max-w-6xl mx-auto px-4'>
			<Carousel
				opts={{
					align: 'start',
					loop: true,
				}}
				plugins={[
					Autoplay({
						delay: 2000,
					}),
				]}
				className='w-full'>
				<CarouselContent>
					{Array.from({length: 5}).map((_, index) => (
						<CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
							<div className='p-1'>
								<Card className='h-full w-full'>
									<CardContent className='h-full w-full p-0'>
										<Image
											src='/dashboard.png'
											alt={`Dashboard preview ${index + 1}`}
											width={800}
											height={500}
											className='w-full h-full object-cover rounded-lg'
										/>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default CarouselComponent;
