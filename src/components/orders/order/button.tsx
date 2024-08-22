import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';

interface Props {
	storeId: string;
}

const BackButton: FC<Props> = ({storeId}) => {
	return (
		<Link href={`/orders/${storeId}`}>
			<Button className='my-2' variant='ghost'>
				<ArrowLeft className='mr-2' size={16} />
				Back To Orders
			</Button>
		</Link>
	);
};

export default BackButton;
