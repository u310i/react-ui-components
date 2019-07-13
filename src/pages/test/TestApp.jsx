import React, { useState, useEffect, useMemo, useRef } from 'react';
import './_constants';
import { isString, isArray, isReact, isReactComponent, deepMergeOverrideArray } from 'scripts';

import {
	AppBar,
	Button,
	Order,
	List,
	Divider,
	Icon,
	Fade,
	Collapse,
	Grow,
	Slide,
	Zoom,
	Sticky,
	UlElement,
	LiElement,
	DivElement,
	SpanElement,
	AElement,
	ButtonElement,
	InputSubmitElement,
	Paper,
	Modal,
	Backdrop,
	Dialog,
	Drawer,
	SwipeableDrawer
} from 'components';
// import { FocusOn } from 'react-focus-on';

let index = 0;

export default ({}) => {
	const [ state1, setState1 ] = useState(false);
	const handler1 = () => {
		setState1((prev) => !prev);
	};
	const onClose1 = () => {
		setState1((prev) => prev && false);
	};
	const [ state2, setState2 ] = useState(false);
	const handler2 = () => {
		setState2((prev) => !prev);
	};
	const onClose2 = () => {
		setState2((prev) => prev && false);
	};
	const [ state_t, setState_t ] = useState(true);
	const handler_t = () => {
		setState_t((prev) => !prev);
	};
	const onClose_t = () => {
		setState_t((prev) => prev && false);
	};
	const [ state_drawer, setState_drawer ] = useState(false);
	const handler_drawer = () => {
		setState_drawer((prev) => !prev);
	};
	const onClose_drawer = () => {
		setState_drawer((prev) => prev && false);
	};
	const onOpen_drawer = () => {
		setState_drawer((prev) => !prev && true);
	};
	const appBarProps = {
		style: {
			backgroundColor: '#2f4f4f'
		},
		height: '5rem',
		mode: 'absoluteToFixed',
		actionMode: 'scrollDown',
		action: {
			timingFunction: 'ease-out',
			duration: 200,
			scrollDown: {
				preset: 'hide',
				beforeStyle: {},
				afterStyle: {}
			},
			scrolling: {
				beforeStyle: {
					opacity: 1
				},
				afterStyle: {
					// height: '3rem',
					opacity: 0.3,
					backgroundColor: '#ff0000'
				}
			}
		}
	};
	index += 1;
	console.log('-----------------------------' + index);

	// useEffect(() => {
	// 	const fn = (event) => console.log(event.target);
	// 	document.addEventListener('click', fn);
	// 	return () => {
	// 		document.removeEventListener('click', fn);
	// 	};
	// });

	return (
		<DivElement style={{ backgroundColor: '#fff' }}>
			{/* {state ? <Backdrop open={state} /> : null} */}
			<DivElement style={{ height: '1000px', backgroundColor: '#e6e6fa' }} />

			<Button.Coordinator
				contents={[ { icon: 'sys-envelope' }, 'Drawer' ]}
				style={{ margin: '0.5em' }}
				type="fill"
				toFill
				color="rgb(255, 69, 0)"
				onClick={handler_drawer}
			/>
			<SwipeableDrawer
				open={state_drawer}
				onOpen={onOpen_drawer}
				onClose={onClose_drawer}
				anchor="left"
				onEscapeKeyDown={onClose_drawer}
				onOutsideClick={onClose_drawer}
				modalProps={{
					backdropProps: {}
				}}
			>
				<a href="#">Another focusable thing</a>
				<input type="text" />
				<div>
					top bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbbbbbbbbbaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbbbbbbbbbaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					aaaaaaaaaaaaaaaaaaaaaaaaa bottom
				</div>
			</SwipeableDrawer>

			<Button.Coordinator
				contents={[ { icon: 'sys-envelope' }, 'Dialog1' ]}
				style={{ margin: '0.5em' }}
				type="fill"
				toFill
				onClick={handler1}
			/>
			<Dialog
				open={state1}
				onEscapeKeyDown={onClose1}
				onOutsideClick={onClose1}
				enableScrollBody={false}
				TransitionComponent={Fade}
				fullScreen={false}
				className={[ 'AAA' ]}
				keepMounted={false}
				modalProps={{
					id: 'test'
				}}
			>
				<a href="#">Another focusable thing</a>
				<input type="text" />
				<div>
					top bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbbbbbbbbbaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					{/* bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbbbbbbbbbaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
					bbbbbbbbbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
					aaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb */}
					aaaaaaaaaaaaaaaaaaaaaaaaa bottom
				</div>
				<Button.Coordinator
					contents={[ { icon: 'sys-envelope' }, 'Dialog2' ]}
					style={{ margin: '0.5em' }}
					type="fill"
					toFill
					onClick={handler2}
				/>
			</Dialog>
			<Button.Coordinator
				contents={[ { icon: 'sys-envelope' }, 'Dialog2' ]}
				style={{ margin: '0.5em' }}
				type="fill"
				toFill
				color="rgb(255, 20, 147)"
				onClick={handler2}
			/>
			<Dialog
				open={state2}
				onEscapeKeyDown={onClose2}
				onOutsideClick={onClose2}
				enableScrollBody={false}
				TransitionComponent={Slide}
				fullScreen={false}
				classNames={[ 'BBB' ]}
			>
				<a href="#">Another focusable thing</a>
				<input type="text" />
				<div>
					top aabbbbbb aaabbba aaabbba aaabbbaa aabbb aabbb aabbba abbbbbbbbbb aaaaaaaaaaaaaaaaaaaaaaaaa
					bottom
				</div>
				<Button.Coordinator
					contents={[ { icon: 'sys-envelope' }, 'Dialog1' ]}
					style={{ margin: '0.5em' }}
					type="fill"
					toFill
					onClick={handler1}
				/>
			</Dialog>

			<DivElement style={{ backgroundColor: '#b0c4de', height: '100px' }} />
			<Button.Coordinator
				contents={[ { icon: 'sys-envelope' }, 'Transition' ]}
				style={{ margin: '0.5em' }}
				type="fill"
				toFill
				color="rgb(255, 20, 147)"
				onClick={handler_t}
			/>
			<DivElement style={{}}>
				<Fade in={state_t} appear={true} direction="right">
					<Paper
						elevation={24}
						shape="round"
						style={{
							backgroundColor: '#ff6347',
							width: '256px',
							height: '256px',
							overflow: 'hidden'
							// marginLeft: '100px'
						}}
						id="el2"
					>
						aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
						aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
						aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
						aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
						aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
						aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
					</Paper>
				</Fade>
			</DivElement>

			<DivElement style={{ height: '100px', backgroundColor: '#e6e6fa' }} />
			<List width="400px" space={1} levelStyle={[ { paddingLeft: '0.5em' }, { paddingLeft: '2.5em' } ]}>
				<List.Group title="root-1" style={{ backgroundColor: '#ee82ee' }}>
					<List.Group title="group-1" style={{ backgroundColor: '#00fa9a' }}>
						<List.Item
							style={{
								backgroundColor: '#b0e0e6'
							}}
						>
							root-1_group-1_item1
						</List.Item>
						{/* <Divider /> */}
						<List.Item
							style={{
								backgroundColor: '#b0e0e6'
							}}
						>
							root-1_group-1_item2
						</List.Item>
						<List.Group title="group-2" style={{ backgroundColor: '#90ee90' }}>
							<List.Item
								style={{
									backgroundColor: '#b0e0e6'
								}}
							>
								root-1_group-2_item1
							</List.Item>
							<List.Item
								style={{
									backgroundColor: '#b0e0e6'
								}}
							>
								root-1_group-2_item2
							</List.Item>
						</List.Group>
					</List.Group>
				</List.Group>
				<List.Group title="root-2" style={{ backgroundColor: '#66cdaa' }}>
					<List.Item
						style={{
							backgroundColor: '#ffb6c1'
						}}
					>
						root-2_item1
					</List.Item>
				</List.Group>
				<List.Item
					style={{
						backgroundColor: '#ee82ee'
					}}
				>
					root_item
				</List.Item>
				<div>div</div>
				text
			</List>
			<Button.Coordinator
				contents={[
					[ { icon: 'sys-envelope' }, 'Aaaa' ],
					[ { icon: 'sys-envelope' }, 'Bbbb' ],
					[ { icon: 'sys-envelope' }, 'Cccc' ],
					[ { icon: 'sys-envelope' }, 'Aaaa' ],
					[ { icon: 'sys-envelope' }, 'Bbbb' ],
					[ { icon: 'sys-envelope' }, 'Cccc' ]
				]}
				group={{
					// between: '0.2em',
					childPropList: [
						{ type: 'normal' },
						{ type: 'dark-outline' },
						{ type: 'outline' },
						{ type: 'fill', disable: state1 },
						{ type: 'outline', disable: true },
						{ type: 'dark-outline', loading: state1 }
					]
				}}
				shape="round"
				size=""
				type="normal"
			/>
			<DivElement style={{ height: '512px' }} />
			<Icon
				type="fa"
				icon={[ 'fab', 'apple' ]}
				size="2x"
				// flip="both"
				// border
				// rotation={90}
				// flip="horizontal"
				transform="translate(100 -200)  rotate(150 0 0)  scale(1 1.5)"
				className="aaaaaaaaaaaaaaaaaaaaaaaaaa"
			/>
			<Icon
				type="fa"
				icon={[ 'fab', 'apple' ]}
				size="2x"
				// flip="both"
				// pull="right"
			/>
			<Icon
				type="fa"
				icon={[ 'fas', 'angle-double-left' ]}
				size="2x"
				// flip="both"
				// border
				// pull="right"
			/>
			<Icon
				type="fa"
				icon={[ 'fab', 'apple' ]}
				size="2x"
				// flip="both"
				border
			/>
			<Icon
				type="fa"
				icon={[ 'fab', 'apple' ]}
				size="2x"
				// flip="both"
				border={{ border: 'solid 0.12em #c71585' }}
				fixedWidth
			/>
		</DivElement>
	);
};

{
	/* <Sticky offsetTop={10} style={{}} absolute>
{(isTop, isBottom) => {
	return (
		<DivElement
			style={{
				backgroundColor: state ? '#4169e1' : '#ffa500',
				width: '2560px',
				height: '256px',
				// width: '100%',
				overflow: 'hidden',
				marginLeft: '100px'
			}}
			id="el"
		>
			aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
			aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
		</DivElement>
	);
}}
</Sticky> */
}

{
	/* <Button.Coordinator
contents={[
  [{ icon: 'sys-envelope' }, 'Aaaa'],
  [{ icon: 'sys-envelope' }, 'Bbbb'],
  [{ icon: 'sys-envelope' }, 'Cccc']
]}
group={{
  style: {
    margin: '1em'
  }
}}
shape="round"
color={'#b0e0e6'}
size="lg"
type="normal"
/> */
}

// const entries = [
//   [{ style: { backgroundColor: '#dc143c', padding: '1em 0px' } }, 'aaa'],
//   [{ style: { backgroundColor: '#ff7f50', padding: '1em 0px' } }, 'bbb'],
//   [{ style: { backgroundColor: '#ff1493', padding: '1em 0px' } }, 'ccc']
// ];

{
	/* <DivElement style={{ padding: '1em' }}>
<Order list={entries}>
  {({ props, child }) => <DivElement {...props}>{child}</DivElement>}
</Order>
</DivElement> */
}

{
	/* <DivElement style={{ padding: '1em' }}>
<DivElement style={{ padding: '1em', backgroundColor: '#f0f8ff' }}>
  <List>
    <List.Item>aaa</List.Item>
    <List.Item>bbb</List.Item>
    <List.Item>ccc</List.Item>
  </List>
</DivElement> */
}

// const color = '#1890ff';
// const color2 = '#ff4500';
// const [state, setState] = useState(color);
// const onClick = () => {
//   setState(color2);
// };

{
	/* <DivElement style={{ backgroundColor: 'white', margin: '1em' }}>
<Button.Coordinator
  contents={[
    [{ icon: 'sys-envelope' }, 'Aaaa'],
    [{ icon: 'sys-envelope' }, 'Bbbb'],
    [{ icon: 'sys-envelope' }, 'Cccc']
  ]}
  group={{
    between: '0.2em',
    childPropList: [, { disable: true }, { loading: true }]
  }}
  shape="round"
  color={state}
  size=""
  type="normal"
/>
</DivElement>

<DivElement style={{ backgroundColor: 'white' }}>
<Button.Coordinator
  contents={[{ icon: 'sys-envelope' }, 'Download']}
  style={{ margin: '0.5em' }}
  color={state}
  size="lg"
  type="fill"
  toFill
  shape="round"
/>
</DivElement> */
}
