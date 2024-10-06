import Image from "next/image";
import ProductList from "@/components/ProductList";
import axios from "axios";

const fetchProducts = async () => {
  try{
     const response = await axios.get("http://localhost:3000/api/products");
     if(response.status !== 200){
        throw new Error("Failed to fetch products");
     }
    //  console.log(response.data, 'hghg');
     return response.data.products;
  } catch (error) {
     console.log(error);
  }
}

export default async function Home() {

  const products = await fetchProducts();

  return (
    <>
      {products?.length > 0 ? (
        <div>
            <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <h1>Product List</h1>
              <ProductList products={products} />
            </div>
        </div>
         ) : "No products found"
      }
    </>
  );
}
