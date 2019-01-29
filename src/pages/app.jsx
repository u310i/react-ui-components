import React, { useState, useEffect, useRef } from 'react';

import { css, injectGlobal, sheet } from 'react-emotion';

import rebootStyle from 'utilities/rebootStyle';
import { useSetBreakpoint } from 'utilities/hooks/useHooks';

import Icon from 'components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAmbulance
} from '@fortawesome/free-solid-svg-icons';
import { faApple, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import createPagePropsTheme from 'utilities/initPageUtils/createPagePropsTheme';
import defaultTheme from 'utilities/initPageUtils/defaultTheme';
import baseTheme from './_this_theme';
import baseProps from './_this_props';
import { deepMerge } from 'utilities/utils';

import Header from 'components/Header';
import HeaderImage from 'components/HeaderImage';

// console.log(baseTheme);
const { pageProps, pageTheme } = createPagePropsTheme(baseTheme, baseProps);
// console.log(pageTheme);
// console.log(deepMerge.overrideArray(baseTheme, defaultTheme));

injectGlobal(pageProps.global.style, rebootStyle);

const App = () => {
  const breakpoints = pageTheme.breakpoint.values;
  const breakpoint = useSetBreakpoint(breakpoints);

  return (
    <article className={css(pageProps.container.style)}>
      <HeaderImage theme={pageTheme} containerProps={pageProps.headerImage} />

      <div
        className={css({
          width: '500px',
          height: '300px',
          backgroundColor: '#ffffe0'
          // '@keyframes height-loop': {
          //   '0%': {
          //     height: '300px'
          //   },
          //   '50%': {
          //     height: '600px'
          //   },
          //   '100%': {
          //     height: '300px'
          //   }
          // },
          // animation: 'height-loop 3s ease-in-out infinite'
        })}
      >
        <div>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</div>
        <Icon
          type="fa"
          icon={['fab', 'apple']}
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
          icon={['fab', 'apple']}
          size="2x"
          // flip="both"
          // pull="right"
        />
        aaaaaaaaaaa
        <Icon
          type="fa"
          icon={['fas', 'angle-double-left']}
          size="2x"
          // flip="both"
          // border
          // pull="right"
        />
        <Icon
          type="fa"
          icon={['fab', 'apple']}
          size="2x"
          // flip="both"
          border
        />
        <Icon
          type="fa"
          icon={['fab', 'apple']}
          size="2x"
          // flip="both"
          border={{ border: 'solid 0.12em #c71585' }}
          fixedWidth
        />
        <div>------</div>
        <FontAwesomeIcon icon={faApple} size="2x" />
        <FontAwesomeIcon
          icon={faApple}
          size="2x"
          // pull="right"
          transform={{ rotate: 42 }}
          // flip="horizontal"
          // spin
          style={{
            marginLeft: '1rem'
          }}
        />
        <FontAwesomeIcon
          icon={faApple}
          size="2x"
          // pull="right"
          // rotation={180}
          // rotation={90}
          // flip="horizontal"
          // transform={{ rotate: 42 }}
          style={{
            marginLeft: '1rem'
          }}
          transform="shrink-6 left-4"
          // spin
        />
        <div>------</div>
        <div>##########################################</div>
        <Icon icon="bird" symbol />
        <Icon icon="bird" use size="3x" />
        <Icon icon="bird" size="3x" border />
        <Icon icon="envelope" currentColor />
        <Icon icon="message" currentColor />
        test test test
        <Icon icon="message" symbol currentColor />
        <Icon icon="message" use />
      </div>

      {/* {Icon({ name: 'envelpe' })} */}

      {/* <Helmet>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet> */}
      {/* <div
        className={css({
          wordWrap: 'break-word',
          fontSize: '20rem',
          lineHeight: '0.5'
        })}
      >
        aaaaaaaaaaaaaaaaaaa
      </div> */}
      <Header
        theme={pageTheme}
        breakpoint={breakpoint}
        componentProps={pageProps.header}
      />
      <HeaderImage theme={pageTheme} containerProps={pageProps.headerImage} />
      <HeaderImage theme={pageTheme} containerProps={pageProps.headerImage} />

      {/* <section>
        <h2>VISION</h2>
        <p>
          ちかごろ世間で日本歴史の科学的研究ということがしきりに叫ばれている。科学的研究というのが近代史学の学問的方法による研究という意義であるならば、これは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいうには及ばないはずである。上にいったようなことがらについては、曖昧あいまいな態度をとり、または真実でない知識を強いて注入していたことも、明かな事実である。
        </p>
      </section>

      <section>
        <h2>MESSAGE</h2>
        <p>
          日本歴史の科学的研究ということがしきりに叫ばれている。科学的研究というのが近代史学の学問的方法による研究という意義であるならば、これは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいう。
        </p>
        <img src="/static/images/1/sec02_01.jpg" alt="my image" />
      </section>

      <section>
        <section>
          <h2>SERVICE</h2>
          <img src="/static/images/1/circleImg01.png" alt="my image" />
          <p>
            科学的研究というのが近代史学の学問的方法による研究という意義であるならば、これは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいう。
          </p>
        </section>
        <section>
          <h2>SERVICE</h2>
          <img src="/static/images/1/circleImg02.png" alt="my image" />
          <p>
            日本歴史の科学的研究ということがしきりに叫ばれている。科学的研究というのが近代史学の学問的方法による研究という意義であるならば意義であるならば。
          </p>
        </section>
        <section>
          <h2>SERVICE</h2>
          <img src="/static/images/1/circleImg03.png" alt="my image" />
          <p>
            科学的研究というのが近代史学の学問的方法による研究という意義であるならば、これは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいう。
          </p>
        </section>
      </section>

      <section>
        <section>
          <h2>STORY</h2>
          <p>
            科学的研究というのが近代史学の学問的方法によるちかごろ世間で日本歴史の科学的研究ということがしきりに叫ばれている。研究という意義であるならば、研究という意義であるならばこれは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいうには及ばないはずである。
          </p>
        </section>
        <section>
          <h2>SUCCESS</h2>
          <p>
            科学的研究というのが近代史学の学問的方法によるちかごろ世間で日本歴史の科学的研究ということがしきりに叫ばれている。研究という意義であるならば、研究という意義であるならばこれは史学の学徒の間においては一般に行われていることであるから、今さらこと新しくいうには及ばないはずである。
          </p>
        </section>
      </section>

      <section>
        <div>
          <dl>
            <dt>社名</dt>
            <dd>Sample Company</dd>
            <dt>代表取締役</dt>
            <dd>見本 太郎</dd>
            <dt>住所</dt>
            <dd>見本県見本市仮区見本町1-3-5</dd>
            <dt>電話番号</dt>
            <dd>01234-567-8901</dd>
            <dt>設立</dt>
            <dd>20XX年5月5日</dd>
            <dt>資本金</dt>
            <dd>1,000,000円</dd>
            <dt>主な取引先</dt>
            <dd>見本商事株式会社</dd>
            <dd>株式会社年中無休商事</dd>
            <dd>株式会社仮称</dd>
          </dl>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.5937927089367!2d136.92980931491988!3d36.70829797996758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff781ec5af4ca3f%3A0x2ade3e8e4c2801b8!2z56aP5bKh6aeF!5e0!3m2!1sja!2sus!4v1478313402186"
            allowfullscreen
          />
        </div>
      </section>

      <footer>
        <p>
          Copyright(c) 20XX Sample Inc. All Rights Reserved. Design by{" "}
          <a href="http://f-tpl.com" target="_blank">
            http://f-tpl.com
          </a>
        </p>
      </footer> */}
    </article>
  );
};

export default App;
