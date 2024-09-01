import {Check, Copy} from 'lucide-react';
import {useState} from 'react';
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
	return <div>{copied ? <Check onClick={handleCopy} /> : <Copy onClick={handleCopy} />}</div>;
};

export default CopyItem;
