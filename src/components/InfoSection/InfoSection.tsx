import Image from 'next/image';
import { Socials } from './Socials';
import { InfoBox } from './InfoBox';

export const InfoSection = () => {
    return (
        <>
            <div className="w-full">
                <Image
                    src="/arous_banner.webp"
                    alt="Arous Style"
                    width={1115}
                    height={721}
                    quality={100}
                    priority
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
        </>
    );
};
