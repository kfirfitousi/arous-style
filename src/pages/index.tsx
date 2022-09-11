import type { NextPage, GetStaticProps } from 'next';

import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { getProducts } from '@/hooks/useProducts';
import { getTags } from '@/hooks/useTags';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Head from 'next/head';
import { Spinner } from '~/UI';
import { InfoSection } from '~/InfoSection';

// import Catalog dynamically to reduce first load bundle size
const Catalog = dynamic<{}>(
    () =>
        import('~/Catalog').then((mod) => ({
            default: mod.Catalog
        })),
    {
        suspense: true,
        ssr: false
    }
);

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Arous Style • לקנות בסטייל</title>
                <meta
                    name="description"
                    content="Arous Style - Arous Elbahar's second-hand store located in Jaffa, Isreal"
                />
            </Head>

            <main
                className="h-full md:h-screen w-full flex flex-col-reverse md:flex-row"
                aria-label="Arous Style"
            >
                {/* Left/Bottom Side */}
                <section
                    className="min-w-[50%] bg-[#B0D0C6] sm:overflow-y-scroll"
                    aria-label="Catalog"
                >
                    <Suspense
                        fallback={
                            <div className="h-full flex flex-col items-center justify-center text-teal-800">
                                <Spinner className="text-teal-800" />
                                <p className="text-xl">טוען קטלוג</p>
                                <p className="text-xl">Loading Catalog</p>
                            </div>
                        }
                    >
                        <Catalog />
                    </Suspense>
                </section>

                {/* Right/Top Side */}
                <section
                    className="md:max-w-2xl flex flex-col items-center bg-green-50 sm:overflow-y-scroll"
                    aria-label="Info Section"
                >
                    <InfoSection />
                </section>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await queryClient.prefetchQuery(['products'], getProducts);
    await queryClient.prefetchQuery(['tags'], getTags);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default Home;
