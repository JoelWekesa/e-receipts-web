'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {StoreFloat} from '@/models/floats/store';
import useOptIn from '@/services/float/optin';
import useStoreFloat from '@/services/float/store-float';
import {Banknote, Loader2, Store} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC, useState} from 'react';
import AddFloatDialog from './add-float-dialog';
import {H2, H3} from '../titles';

interface Props {
	storeFloat: StoreFloat | null;
	storeId: string;
}

const StoreFloatOnboardingScreen: FC<Props> = ({storeFloat, storeId}) => {
	const [currentStep, setCurrentStep] = useState(1);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data} = useStoreFloat({token, storeId, storeFloat});

	const {mutate, isPending} = useOptIn();

	const steps = [
		{
			title: 'Register your store for M-Pesa float management',
			content:
				'Register your store today for seamless M-Pesa float management. Track, manage, and control your float transactions with ease, ensuring efficiency and security for your business.',
			icon: <Store className='w-12 h-12 text-primary' />,
		},
		{
			title: 'Add Float Amount',
			content: 'Add float. Ensure your business stays operational by maintaining a sufficient balance.',
			icon: <Banknote className='w-12 h-12 text-primary' />,
		},
	];

	const handleNext = async () => {
		if (!data) {
			await mutate({token, storeId});
		}
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}

		if (currentStep === steps.length) {
			handleOpen();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen((open) => !open);
	};

	return (
		<>
			<Card className='w-full max-w-3xl mx-auto'>
				<CardContent className='p-6'>
					<div className='mb-6'>
						<H2 className='text-2xl font-bold mb-2'>Opt In for M-Pesa Float Management</H2>
						<Progress value={(currentStep / steps.length) * 100} className='mb-2' />
						<p className='text-sm text-muted-foreground mb-4'>
							Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
						</p>
					</div>
					<div className='flex items-center mb-6'>
						{steps[currentStep - 1].icon}
						<div className='ml-4'>
							<H3 className='text-xl font-semibold mb-2'>{steps[currentStep - 1].title}</H3>
							<p className='text-muted-foreground'>{steps[currentStep - 1].content}</p>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<Button onClick={handlePrevious} disabled={currentStep === 1} variant='outline'>
							Previous
						</Button>

						<Button onClick={handleNext} disabled={isPending}>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							{currentStep === steps.length ? 'Add Float' : !data ? 'Opt In' : 'Next'}
						</Button>
					</div>
				</CardContent>
			</Card>

			<AddFloatDialog open={open} onClose={handleOpen} storeFloat={data} />
		</>
	);
};

export default StoreFloatOnboardingScreen;
