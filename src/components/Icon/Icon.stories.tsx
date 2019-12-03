import * as React from "react";
import Icon from "./Icon";
import BaseElement from "../BaseElement/BaseElement";
import {
  childrenHorizontalSpacing,
  childrenVerticalSpacing
} from "../../_storybook/style";

export default {
  title: "Icon",
  component: Icon,
  parameters: {
    componentSubtitle: "Sub Title"
  }
};

const pseudoStyle: {
  [P in string]?: React.CSSProperties;
} = {
  // ["& > div > div > * + *"]: {
  //   marginLeft: "15px"
  // },
  // ["& > div > div > div"]: {
  //   marginTop: "28px",
  //   marginBottom: "6px"
  // },
  ["& > div"]: {
    border: "solid 1px",
    padding: "15px"
  },
  ["& > div + div"]: {
    marginTop: "30px"
  },
  ["& h2, h3"]: {
    fontSize: "1em"
  }
  // ["& p"]: {
  //   fontSize: "1.5em"
  // }
  // ["& > div + div"]: {
  //   marginTop: "36px"
  // }
};

export const basic = () => {
  return (
    <BaseElement style={pseudoStyle}>
      <BaseElement>
        <h1>size</h1>
        <div>
          <h2>default (font-size is inherit)</h2>
          <Icon
            icon={["fa", "fab-apple"]}
            // flip="both"
            // border
            // rotation={90}
            // flip="horizontal"
            // transform="translate(100 -200)  rotate(150 0 0)  scale(1 1.5)"
            // className="aaaaaaaaaaaaaaaaaaaaaaaaaa"
          />
        </div>
        <div>
          <h2>[1, 2, 3] of number (font-size is 1em, 2em, 3em)</h2>
          <Icon
            icon={["fa", "fab-apple"]}
            size={1}
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size={2}
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size={3}
            // flip="both"
            // pull="right"
          />
        </div>
        <div>
          <h2>
            ["xs", "sm", "lg"] of string (font-size is 0.75em, 0.875em, 1.33em)
          </h2>
          <Icon
            icon={["fa", "fab-apple"]}
            size="xs"
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size="sm"
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size="lg"
            // flip="both"
            // pull="right"
          />
        </div>
        <div>
          <h2>string["16px", "24px", "36px"]</h2>
          <Icon
            icon={["fa", "fab-apple"]}
            size="16px"
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size="24px"
            // flip="both"
            // pull="right"
          />
          <Icon
            icon={["fa", "fab-apple"]}
            size="36px"
            // flip="both"
            // pull="right"
          />
        </div>
      </BaseElement>
      <BaseElement
        style={
          {
            ["& > svg"]: {
              display: "block"
            },
            ["& > div"]: {
              marginTop: "15px"
            }
          } as any
        }
      >
        <h1>icon prop</h1>
        <BaseElement>
          <div>
            <h2>{'icon={["fa", "fab-apple"]}'}</h2>
            <Icon icon={["fa", "fab-apple"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["fa", "fab-cc-paypal"]}'}</h2>
            <Icon icon={["fa", "fab-cc-paypal"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["fa", "fas-coffee"]}'}</h2>
            <Icon icon={["fa", "fas-coffee"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["fa", "fas-angle-double-left"]}'}</h2>
            <Icon icon={["fa", "fas-angle-double-left"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["user", "bird"]}'}</h2>
            <Icon icon={["user", "bird"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["user", "message"]}'}</h2>
            <Icon icon={["user", "message"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["sys", "envelope"]}'}</h2>
            <Icon icon={["sys", "envelope"]} size={2} />
          </div>
          <div>
            <h2>{'icon={["sys", "loading"]}'}</h2>
            <Icon icon={["sys", "loading"]} size={2} />
          </div>
          <div>
            <h2>{`icon={{
                name: "envelope",
                viewBox: [0, 0, 40, 26],
                path:
                  "M 22.8196 15.7456C ..."
              }}`}</h2>
            <p>Assign object (path)</p>
            <Icon
              icon={{
                name: "envelope",
                viewBox: [0, 0, 40, 26],
                path: `M 22.8196 15.7456C 22.0005 16.5862 20.9038 17.0508 19.7317 17.0542C 18.5632 17.0444 17.46 16.5994 16.6362 15.7646L 1.09009 0L 38.1626 0L 22.8196 15.7456ZM 0 1.06567L 11.2952 12.5818L 0 24.1392L 0 1.06567ZM 27.9519 12.623L 39.2878 24.1233L 39.2878 1.06567L 27.9519 12.623ZM 23.7844 16.9265L 27.0105 13.6885L 38.1833 25.082L 1.10547 25.082L 12.4006 13.6885L 15.6772 16.9512C 16.7539 18.0415 18.1877 18.6418 19.7185 18.6418L 19.7363 18.6418C 21.2734 18.6375 22.7109 18.0281 23.7844 16.9265Z`
              }}
              size={2}
            />
          </div>
          <div>
            <h2>{`icon={{
                name: "message",
                viewBox: [0, 0, 38, 34],
                tag:
                  "<path class="css-onw7wr uc-svg-inner" d="M19.0675 ...}}`}</h2>
            <p>Assign object (tag)</p>
            <Icon
              icon={{
                name: "message",
                viewBox: [0, 0, 38, 34],
                tag: `<path class="css-onw7wr uc-svg-inner" d="M19.0675 0C8.5371 0 0 7.092 0 15.8401c0 5.5527 3.4417 10.4345 8.6471 13.2632.0083.0091.0221.0182.0434.0277.8433.3798.41 1.6817-.5651 2.8751-.742.9083-2.1668 1.8444-1.6251 1.8444.8667 0 2.7535-.4018 3.94-1.0597 1.7586-.9752 2.9897-1.8141 4.5758-1.469l-.0013-.0035a22.867 22.867 0 0 0 4.0527.3619c10.5309 0 19.0676-7.0916 19.0676-15.8401C38.1351 7.0921 29.5984 0 19.0675 0z"></path>`
              }}
              size={2}
            />
          </div>
        </BaseElement>
      </BaseElement>
      <BaseElement
        style={
          {
            ["& > div"]: {
              border: "solid 1px",
              marginTop: "30px"
            }
          } as any
        }
      >
        <h1>fixedWidth</h1>
        <BaseElement
          style={
            {
              ["& > div + div"]: {
                marginTop: "15px"
              },
              ["& > div >  svg"]: {
                backgroundColor: "orange"
              }
            } as any
          }
        >
          <div>
            <Icon icon={["fa", "fab-apple"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["fa", "fab-cc-paypal"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["fa", "fas-coffee"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["fa", "fas-angle-double-left"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["user", "bird"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["user", "message"]} size={2} fixedWidth />
          </div>
          <div>
            <Icon icon={["sys", "envelope"]} size={2} fixedWidth />
          </div>
        </BaseElement>
        <BaseElement
          style={
            {
              ["& > div + div"]: {
                marginTop: "15px"
              }
            } as any
          }
        >
          <h2>with border</h2>
          <div>
            <Icon icon={["fa", "fab-apple"]} size={2} fixedWidth border />
          </div>
          <div>
            <Icon icon={["fa", "fab-cc-paypal"]} size={2} fixedWidth border />
          </div>
          <div>
            <Icon icon={["fa", "fas-coffee"]} size={2} fixedWidth border />
          </div>
          <div>
            <Icon
              icon={["fa", "fas-angle-double-left"]}
              size={2}
              fixedWidth
              border
            />
          </div>
          <div>
            <Icon icon={["user", "bird"]} size={2} fixedWidth border />
          </div>
          <div>
            <Icon icon={["user", "message"]} size={2} fixedWidth border />
          </div>
          <div>
            <Icon icon={["sys", "envelope"]} size={2} fixedWidth border />
          </div>
        </BaseElement>
      </BaseElement>
      <BaseElement
        style={
          {
            ["& > div"]: {
              border: "solid 1px",
              marginTop: "30px",
              color: "orange",
              padding: "15px"
            },
            ["& > div > div"]: {
              border: "solid 1px",
              marginTop: "15px",
              padding: "5px"
            }
          } as any
        }
      >
        <h1>currentColor</h1>
        <BaseElement>
          <h2>wrapper color is orange</h2>
          <div>
            <h3>currentColor = true</h3>
            <Icon icon={["fa", "fab-apple"]} size={2} currentColor />
          </div>
          <div>
            <Icon icon={["fa", "fab-apple"]} size={2} />
          </div>
          <div>
            <h3>currentColor = true</h3>
            <p>color is assigned to the fill of the element in svg.</p>
            <Icon icon={["user", "bird"]} size={2} currentColor />
          </div>
        </BaseElement>
      </BaseElement>
      <BaseElement>
        <h1>{"pull left or right:"}</h1>
        <BaseElement>
          <Icon icon={["fa", "fab-apple"]} pull="left" size={3} />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
          <Icon icon={["fa", "fab-apple"]} pull="right" size={3} />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </BaseElement>
      </BaseElement>
      <BaseElement>
        <h1>{"symbol & use"}</h1>
        <BaseElement>
          <p>{'<Icon icon={["user", "bird"]} symbol />'}</p>
          <p>{'<Icon icon={["user", "bird"]} use size={3} />'}</p>
          <Icon icon={["user", "bird"]} symbol />
          <Icon icon={["user", "bird"]} use size={3} />
        </BaseElement>
      </BaseElement>
      {/* <div>
        <Icon
          type="fa"
          icon={["fas", "angle-double-left"]}
          size="2x"
          // flip="both"
          // border
          // pull="right"
        />
      </div>
      <div>
        <Icon
          type="fa"
          icon={["fab", "apple"]}
          size="2x"
          // flip="both"
          border
        />
      </div>
      <div>
        <Icon
          type="fa"
          icon={["fab", "apple"]}
          size="2x"
          // flip="both"
          border={true}
          fixedWidth
        />
      </div>
      <Icon icon="bird" symbol />
      <Icon icon="bird" use size="3x" />
      <Icon icon="bird" size="3x" border />
      <Icon icon="envelope" currentColor />
      <Icon icon="message" currentColor />
      <Icon icon="message" symbol currentColor />
      <Icon icon="message" use /> */}
    </BaseElement>
  );
};
