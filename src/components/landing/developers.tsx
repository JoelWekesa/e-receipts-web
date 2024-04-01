'use client';
import {sample} from '@/snippets/sample';
import {Check, Copy} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula, solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Button} from '../ui/button';

const DevelopersComponent = () => {
	const {theme} = useTheme();

	const [currentTheme, setCurrentTheme] = useState('');

	useEffect(() => {
		setCurrentTheme(theme === 'light' ? 'light' : 'dark');
	}, [theme]);

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		if (!copied) {
			navigator.clipboard.writeText(sample);
		}
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<section className='w-full py-2 md:py-24 lg:py-12 bg-[#DEE4E7]  dark:bg-[#37474F]'>
			<div className='flex flex-row'>
				<div className='w-full md:w-3/5'>
					<div className='p-8'>
						<div className='py-6 border-b mb-6'>
							<p className='text-2xl tracking-widest'>For Developers And Businesses</p>
						</div>
						<div>
							<ol className='space-y-6 px-3'>
								<li>
									<p className='text-base tracking-widest'>
										Effortlessly integrate e-receipt functionality into your existing system.
									</p>
								</li>
								<li>
									<p className='text-base tracking-widest'>
										Enhance customer experience with instant, secure, and eco-friendly receipts.
									</p>
								</li>
								<li>
									<p className='text-base tracking-widest'>Gain valuable insights through user data and analytics. </p>
								</li>
							</ol>
						</div>
					</div>
				</div>
				<div className='hidden md:block  w-2/5'>
					<div className='rounded-md bg-[#fdf6e3] dark:bg-[#282a36] mr-2'>
						<div className='flex justify-between items-center px-4 py-2'>
							<p className='text-sm'>Copy Code</p>
							<Button variant='outline' size='icon' onClick={handleCopy}>
								{copied ? <Check size={18} /> : <Copy size={18} />}
							</Button>
						</div>
						<SyntaxHighlighter
							language='typescript'
							style={currentTheme === 'light' ? solarizedlight : dracula}
							customStyle={{
								padding: '20px',
							}}
							wrapLongLines>
							{sample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DevelopersComponent;
