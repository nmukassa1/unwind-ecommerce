import { NextResponse } from "next/server";
import client from "@/utils/shopify";

export async function GET(req, {params}) {
    
    const query = `
    query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            handle
            description
            options{
                name
                values
            }
            variants(first: 3) {
                nodes{
                    id
                    title
                    price{
                        amount
                        currencyCode
                    }
                }
            }
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
    }`;
    
    
    const { data, errors, extensions } = await client.request(query, {
        variables: {
            handle: params.handle
        }
    });
    if (errors) {
        return NextResponse.error(errors, { status: 500 });
    }
    const product = data.productByHandle;
    return NextResponse.json({ product });
}