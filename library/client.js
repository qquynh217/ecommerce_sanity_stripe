import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'bkb3yii2',
    dataset: 'production',
    apiVersion: '2023-02-21',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)