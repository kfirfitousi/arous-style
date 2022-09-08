import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { getProducts } from '@/hooks/useProducts';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Head from 'next/head';
import Image from 'next/image';
import Socials from '~/Socials';
import InfoBox from '~/InfoBox';

// import Gallery dynamically to reduce first load bundle size
const Gallery = dynamic<{}>(() => import('~/Gallery'), {
    suspense: true
});

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Arous Style - לקנות בסטייל</title>
                <meta name="description" content="Arous Style" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <main className="h-full md:h-screen w-full flex flex-col-reverse md:flex-row">
                {/* Left/Bottom Side */}
                <section className="min-w-[50%] bg-[#B0D0C6] sm:overflow-y-scroll">
                    <Suspense
                        fallback={
                            <div className="h-full flex flex-col items-center justify-center text-teal-800">
                                Loading...
                            </div>
                        }
                    >
                        <Gallery />
                    </Suspense>
                </section>

                {/* Right/Top Side */}
                <section className="md:max-w-2xl flex flex-col items-center bg-green-50 sm:overflow-y-scroll">
                    <div className="w-full">
                        <Image
                            src="/arous_banner.webp"
                            alt="Arous Style"
                            width={1115}
                            height={721}
                        />
                    </div>

                    <Socials />

                    <section className="h-full flex flex-col-reverse sm:flex-row justify-center sm:py-8 mb-4 sm:mb-0 text-teal-800">
                        <InfoBox
                            title="Arous Elbahar"
                            text="Arous Elbahar (Bride of the Sea) Association for Women in Jaffa is a
                            non-profit women's organization, founded by a group of female
                            Arab residents of Jaffa. Our mission is to provide Jaffa's with
                            the tools and resources they need to make a positive difference in
                            their lives - in the personal, economic, and community level."
                            address="Pierre Mendes France 19, Jaffa"
                        />

                        <InfoBox
                            title="عروس البحر"
                            text="لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة
                            وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك
                            السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة،"
                            address="بيير مندس فرانس 19, يافا"
                            rtl
                        />

                        <InfoBox
                            title="ערוס אלבחר"
                            text="עמותת ערוס אלבחר (כלת הים) לנשים ביפו היא ארגון ללא מטרות רווח שנוסד
                            על ידי קבוצה של נשים ערביות תושבות יפו. העמותה פועלת לקידום מעמדן
                            ומעורבותן של נשים ביפו, ומספקת להן כלים ומשאבים על מנת לחולל שינוי
                            חיובי בחייהן – מבחינה אישית, כלכלית וקהילתית - תוך הגברת מעורבותן
                            הפעילה בקהילה ובשוק העבודה."
                            address="פייר מנדס פרנס 19, יפו"
                            rtl
                        />
                    </section>
                </section>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await queryClient.prefetchQuery(['products'], () => getProducts(), {
        staleTime: 60 * 60 * 1000
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Home;
