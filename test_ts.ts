
type FC<T> = P in T['type']

type Props<T> = {
	type: 'string' | 'number';
	x: T;
	y: T;
};



const fn1: FC<Props> = (props) => {
	if (typeof props.type === 'string') {
		console.log(props.x + ' + ' + propx.y);
	} else if (typeof props.type === 'number') {
		console.log(props.x + propx.y);
	}
};

fn1({ type: 'string', x: 'xxx', y: 'yyy' });
