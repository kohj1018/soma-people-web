import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property='og:title' content='소마인' />
        <meta property='og:description' content='SW 마에스트로들을 위한 커뮤니티' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
