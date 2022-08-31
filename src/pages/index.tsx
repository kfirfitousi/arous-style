import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import { Gallery } from '~/Gallery';

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
                <section className="flex-grow bg-[#B0D0C6] sm:overflow-y-scroll">
                    <Gallery />
                </section>

                {/* Right/Top Side */}
                <section className="md:max-w-xl flex flex-col items-center bg-white sm:overflow-y-scroll">
                    <div className="w-full">
                        <Image
                            src="/arous_banner.webp"
                            alt="Arous Style"
                            width={1115}
                            height={721}
                            // layout="responsive"
                            objectFit="fill"
                        />
                    </div>

                    <div className="mt-5">03-657-2714 \ arouselbaharorg@gmail.com</div>

                    <div className="h-full flex flex-col-reverse sm:flex-row justify-center sm:py-10 mb-4 sm:mb-0">
                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">Arous Elbahar</p>
                            <p className="mt-4">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis hic
                                vitae vel eos similique repellendus distinctio, quos, consequatur
                                esse aspernatur quibusdam, maiores laudantium suscipit ratione ipsa
                                rem expedita qui neque?
                            </p>
                            <p className="mt-4">Pierre Mendes France 19, Jaffa</p>
                        </div>

                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">عروس البحر</p>
                            <p className="mt-4">
                                لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة
                                وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك
                                السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة،
                            </p>
                            <p className="mt-4">بيير مندس فرانس 19, يافا</p>
                        </div>

                        <div className="basis-1/3 px-3 mt-3 sm:mt-0 flex flex-col items-center justify-between text-center sm:border-r border-gray-700">
                            <p className="text-xl underline sm:no-underline">ערוס אלבחר</p>
                            <p className="mt-4">
                                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד
                                אדנדום סילקוף, מרגשי ומרגשח. עמחליף נולום ארווס סאפיאן - פוסיליס
                                קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר,
                            </p>
                            <p className="mt-4">פייר מנדס פרנס 19, יפו</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
