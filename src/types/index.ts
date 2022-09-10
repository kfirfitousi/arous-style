export type Picture = {
    id: string;
    url: string;
    width: number;
    height: number;
};

export type Product = {
    /** product id */
    id: string;
    /** hebrew title of the product */
    title: string;
    /** english title of the product */
    title_en: string;
    /** price of the product */
    price: number;
    /** array of tags that are applied to this product */
    tags: string[];
    /** array of pictures of the product */
    pictures: Picture[];
};

export type FilterTags = {
    [key: string]: string;
};

export type ContactFormFields = {
    name: string;
    phone: string;
    message?: string;
    productName: string;
};

export type ContactResponse = {
    message: string;
};

export type ContactEmailConfig = {
    /** the address that will receive the email */
    recipient: string;
    /** the subject of the email */
    subject: string;
    /** a function that takes the submitted form data and returns the HTML body of the email */
    body: (formData: ContactFormFields) => string;
};
