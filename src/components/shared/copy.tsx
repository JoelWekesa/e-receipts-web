import React, {useState} from 'react';
import {Button} from '../ui/button';
import {Copy, Check} from 'lucide-react';
const CopyItem = ({copy}: {copy: string}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		if (!copied) {
			navigator.clipboard.writeText(copy);
		}
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	return (
		<div>
			<Button variant='outline' size='icon' onClick={handleCopy}>
				{copied ? <Check /> : <Copy />}
			</Button>
		</div>
	);
};

export default CopyItem;
