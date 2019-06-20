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
	Backdrop
} from 'components';
// import { FocusOn } from 'react-focus-on';

export default ({}) => {
	const [ state, setState ] = useState(false);
	const handler = () => {
		setState((prev) => !prev);
	};
	const onClose = () => {
		setState(false);
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

	return (
		<DivElement style={{ backgroundColor: '#fff' }}>
			{/* {state ? <Backdrop open={state} /> : null} */}
			<DivElement style={{ height: '1000px', backgroundColor: '#e6e6fa' }} />
			<Button.Coordinator
				contents={[ { icon: 'sys-envelope' }, 'Download' ]}
				style={{ margin: '0.5em' }}
				type="fill"
				toFill
				onClick={handler}
			/>
			{/* onClickOutside={onClose} onEscapeKey={onClose} */}
			<Modal
				open={state}
				onEscapeKeyDown={onClose}
				onOutsideClick={onClose}
				onClose={(e, reason) => console.log(e)}
				closeAfterTransition
				onRendered={(e) => console.log('mounted child')}
			>
				<Fade in={state} duration={1000}>
					<Paper
						elevation={24}
						shape="round"
						style={{
							backgroundColor: state ? '#f0e68c' : '#ff69b4',
							width: '256px',
							height: '400px',
							// width: '100%',
							overflow: 'hidden',
							zIndex: 2000,
							position: 'absolute',
							top: '50px',
							left: '200px'
						}}
						id="el2"
					>
						<a href="#">Another focusable thing</a>
						<input type="text" />
						bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbbbbbbbbba
						bbbbbbbbbbbbbbbbbbbbbbbbaa bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba
						bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb
						bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbba bbbbbbbbbbbbbbbbb
						aaaaaaaaaaaaaaaaaaaaaaaaa
						<Button.Coordinator
							contents={[ { icon: 'sys-envelope' }, 'Download' ]}
							style={{ margin: '0.5em' }}
							type="fill"
							toFill
							onClick={onClose}
						/>
						{/* <Button style={{ margin: '0.5em' }} type="fill" toFill onClick={handler}>
						Download
					</Button> */}
						{/* <button onClick={handler}>aaa</button> */}
					</Paper>
				</Fade>
			</Modal>

			<DivElement style={{ backgroundColor: '#b0c4de', height: '100px' }} />

			<Collapse in={state}>
				<Paper
					elevation={24}
					shape="round"
					style={{
						backgroundColor: '#ff6347',
						width: '256px',
						height: '256px',
						// width: '100%',
						overflow: 'hidden',
						marginLeft: '100px'
					}}
					id="el2"
				>
					aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
					aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
					aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
					aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
					aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa
					aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa
				</Paper>
			</Collapse>
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
						{ type: 'fill', disable: state },
						{ type: 'outline', disable: true },
						{ type: 'dark-outline', loading: state }
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
