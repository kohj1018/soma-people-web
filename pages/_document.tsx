import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"
          rel="stylesheet"
        />

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
