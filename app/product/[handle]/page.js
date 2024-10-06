"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function Page() {
    //get the handle from the URL
    const params = useParams();
    const { handle } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct(handle){
            if(!handle){
                console.log("No handle provided");
                return;
            }
            
            try{
                const response = await axios.get(`/api/product/${handle}`);
                if(response.data.product === null){
                    throw new Error("Failed to fetch product");
                }
                setProduct(response.data.product);
                console.log(response.data);
            } catch (error){
                console.log(error);
            }
        }

        fetchProduct(handle);

    }, [handle])
    
    return ( 
        <div>
              <h1>Product Page</h1>
              {product && (
                  <div>
                    <Image src={product.images.edges[0].node.originalSrc} alt={product.name} width={200} height={200} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>£{product.priceRange.minVariantPrice.amount}</p>
                  </div>
              )}
        </div>
     );
}

export default Page;