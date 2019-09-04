import $ from '../../components/_constants';
import { createPageConstants } from 'scripts';

const constants = {
	fade: {
		styles: {
			style: {
				// alternative to "width: fit-content"
				display: 'table',
				position: 'relative',
				test: 'test'
			},
			duration: $.transition.duration,
		},
	}
} as const;

createPageConstants(constants);
