import React, { useState, useEffect, useRef } from 'react';

import { css, injectGlobal, sheet } from 'react-emotion';

import reboot from 'utilities/reboot';
import { setTwoBreakpoint } from 'utilities/hooks';
import {} from 'utilities/utils';
import {} from 'utilities/windowEvents';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fontAwesomeIconList } from 'src/icons';

import createPagePropsTheme from 'utilities/createPagePropsTheme';
import baseTheme from './_this_theme';
import baseProps from './_this_props';

import Header from 'organisms/Header';
import HeaderImage from 'organisms/HeaderImage';

library.add(...fontAwesomeIconList);

const { pageProps, pageTheme } = createPagePropsTheme(baseTheme, baseProps);

injectGlobal(pageProps.global.style, reboot);

const App = () => {
  const breakpoints = pageTheme.breakpoint.values;
  // const initBreakpoint = useGetInitTwoBreakpoint(
  //   breakpoints,
  //   setBreakpointState
  // );
  // const [breakpointState, setBreakpointState] = useState(initBreakpoint);
  // useAddWindowEvent('resize', () =>
  //   setTwoBreakpointOnResize(breakpoints, initBreakpoint, setBreakpointState)
  // );

  const breakpoint = setTwoBreakpoint(breakpoints);

  return (
    <article className={css(pageProps.container.style)}>
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
      <HeaderImage theme={pageTheme} containerProps={pageProps.headerImage} />
      <Header
        theme={pageTheme}
        breakpoint={breakpoint}
        componentProps={pageProps.header}
      />
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
