import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { getProducts } from '@/hooks/getProducts';

import Head from 'next/head';
import Image from 'next/image';
import { Gallery } from '~/Gallery';
import { Socials } from '~/Socials';

import { MapPinIcon } from '@heroicons/react/24/outline';

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
                    <Gallery />
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
                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">Arous Elbahar</p>
                            <p className="mt-4">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis hic
                                vitae vel eos similique repellendus distinctio, quos, consequatur
                                esse aspernatur quibusdam, maiores laudantium suscipit ratione ipsa
                                rem expedita qui neque?
                            </p>
                            <div className="mt-4">
                                <MapPinIcon className="w-6 h-6 pb-1 inline" />
                                <span className="ml-0.5">Pierre Mendes France 19, Jaffa</span>
                            </div>
                        </div>

                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">عروس البحر</p>
                            <p className="mt-4">
                                لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة
                                وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك
                                السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة،
                            </p>
                            <div className="mt-4" dir="rtl">
                                <MapPinIcon className="w-6 h-6 pb-1 inline" />
                                <span className="mr-0.5">بيير مندس فرانس 19, يافا</span>
                            </div>
                        </div>

                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">ערוס אלבחר</p>
                            <p className="mt-4">
                                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד
                                אדנדום סילקוף, מרגשי ומרגשח. עמחליף נולום ארווס סאפיאן - פוסיליס
                                קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
                            </p>
                            <div className="mt-4" dir="rtl">
                                <MapPinIcon className="w-6 h-6 pb-1 inline" />
                                <span className="mr-0.5">פייר מנדס פרנס 19, יפו</span>
                            </div>
                        </div>
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
