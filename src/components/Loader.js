import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const InvertedLoader = () => {
	return (
		<Dimmer active inverted>
			<Loader />
		</Dimmer>
	);
}

export default InvertedLoader;
