import React from 'react';

const ENPage = () => {
	return (
		<div>
			<div>
				{Object.keys(process.env).map((key) => (
					<div key={key}>
						<span>{key}</span>: <span>{process.env[key]}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ENPage;
