import Head from "next/head";

interface Props {
    title: string
    description?: string
    keyword?: string[]
}

function SEO({title, description = 'SW 마에스트로 구성원들을 위한 커뮤니티', keyword = ['SWM', '소프트웨어 마에스트로', 'SW 마에스트로', '소마', '개발', '개발자', '부트캠프', '커뮤니티', '네트워킹', '취업', '이직']}: Props) {
    return (
        <Head>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword.join()} />
            <title>{title}</title>
        </Head>
    )
}

export default SEO