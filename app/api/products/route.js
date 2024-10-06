import client from '@/utils/shopify';
import { NextResponse } from 'next/server'

export async function GET(){

    const query = `
    query getProducts($first: Int!) {
        products(first: $first) {
        edges {
            node {
            id
            title
            handle
            priceRange {
                minVariantPrice {
                amount
                currencyCode
                }
            }
            images(first: 1) {
                edges {
                node {
                    originalSrc
                    altText
                }
            }
        }
            }
        }
        }
    }`
;

    const {data, errors, extensions} = await client.request(query, {
        variables: {
        first: 10,
        },
    });

    if(errors){
        return NextResponse.error(errors, {status: 500})
    }
    const products = data.products.edges.map(({node}) => node);
    // console.log(products, 'api');
    
        
        
    return NextResponse.json({products})
}