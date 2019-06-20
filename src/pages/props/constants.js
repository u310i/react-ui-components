import { createAppConstants } from 'scripts';

const constants = {
	button: {
		color: {
			testApp: 'aaaaaaaaaaaaaaaaaa'
		},
		testApp: 'bbbbbbbbbbbbbbb'
	},
	testComponent: {
		testApp: 'cccccccccccccc'
	}
};

createAppConstants(constants);
