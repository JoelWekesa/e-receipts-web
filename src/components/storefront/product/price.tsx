const Price = ({
	amount,
	className,
	currencyCode = 'KES',
}: {
	amount: string;
	className?: string;
	currencyCode: string;
	currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
	<p suppressHydrationWarning={true} className={className}>
		{`${new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: currencyCode,
			currencyDisplay: 'narrowSymbol',
		}).format(parseFloat(amount))}`}
		{/* <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span> */}
	</p>
);

export default Price;
