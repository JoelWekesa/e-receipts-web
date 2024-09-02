import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';

interface Props {
	storeId: string;
	teamId?: string;
}

const BackButton: FC<Props> = ({storeId, teamId}) => {
	return (
		<Link href={teamId ? `/teams/orders/${teamId}` : `/orders/${storeId}`}>
			<Button className='my-2' variant='ghost'>
				<ArrowLeft className='mr-2' size={16} />
				Back To Orders
			</Button>
		</Link>
	);
};

export default BackButton;
