'use client';
import SuperMarketTemplate from '@/components/templates/supermarket';
import {Button} from '@/components/ui/button';
import {render, renderAsync} from '@react-email/render';

const GenerateSupermarket = () => {
	const generatedSuper = async () => {
		const html = await renderAsync(<SuperMarketTemplate />, {
			pretty: true,
		});

		navigator.clipboard.writeText(html);
	};

	return (
		<>
			<div>
				<Button onClick={generatedSuper}>Generate</Button>
			</div>
		</>
	);
};

export default GenerateSupermarket;
