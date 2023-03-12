import { useRouter } from "next/router";
import Script from "next/script";
import { memo, useEffect } from "react";
import Head from 'next/head'

const TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

const GoogleAnalytics = () => {
  const router = useRouter()

  // 👇 send page views when users gets to the landing page
  useEffect(() => {
    // if (process.env.ENV_STATE !== 'production') return  // production 상태가 아니면 통계 포함 X

    if (!TRACKING_ID || router.isPreview) return

    gtag("config", TRACKING_ID, {
      send_page_view: false, // manually send page views to have full control
    })

    gtag("event", "page_view", {
      page_path: window.location.pathname,
      send_to: TRACKING_ID,
    })
  }, [])

  // 👇 send page views on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // if (process.env.ENV_STATE !== 'production') return  // production 상태가 아니면 통계 포함 X

      if (!TRACKING_ID || router.isPreview) return
      // manually send page views
      gtag("event", "page_view", {
        page_path: url,
        send_to: TRACKING_ID,
      })
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router.events, router.isPreview])

  // if (process.env.ENV_STATE !== 'production') return null  // production 상태가 아니면 통계 포함 X

  // 👇 prevent rendering scripts if there is no TRACKING_ID or if it's preview mode.
  if (!TRACKING_ID || router.isPreview) return null

  return (
    <>
      <Head>
        {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
        <script // Script 쓰면 gtag 객체 없다고 함. 따라서 script 태그 씀
          id='gtag-init'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `
          }}
        />
      </Head>

      {/* Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      />
    </>
  );
};
export default memo(GoogleAnalytics);