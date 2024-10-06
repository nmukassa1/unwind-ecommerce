"use client"
import Image from 'next/image';
import Link from "next/link";

function ProductList({products}) {
//   console.log(products);
  
    
   return ( 
      <div className="flex flex-wrap gap-6">
         {products?.length > 0 && 
            products.map((product) => (
               <Card key={product.id} product={product} />
            ))
         }
      </div>
    );
}

export default ProductList;

function Card({product}){
      return (
         <Link href={`/product/${product.handle}`} className="">
               <Image className="w-full" src={product.images.edges[0].node.originalSrc} alt={product.title} width={100} height={200} />
               <div className="border-t-2 py-2 mt-4">
                  <h3>{product.title}</h3>
                  <p>£{product.priceRange.minVariantPrice.amount}</p>
               </div>
         </Link>
      )
}

