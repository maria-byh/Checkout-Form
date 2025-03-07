
import { Elements} from "@stripe/react-stripe-js";
import OrderForm from "@/components/OrderForm";
import OrderDetails from "@/components/OrderDetails";
import Navbar from "@/components/Navbar";
import { stripePromise } from "@/utils/StripeConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductType } from "@/types/DataTypes";

const products: ProductType[] = [
    { id: "prod_001", itemsNumber: 1, name: "Wireless Headphones", taxRate: 0.10, description: "description du produit", price: 99.99, image: "https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch520_Primary_image?$categorypdpnav$&fmt=png-alpha" },
    { id: "prod_002", itemsNumber: 1, name: "Gaming Mouse", taxRate: 0.10, description: "description du produit", price: 49.99, image: "" }
];

export default function checkout() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<ProductType | null>(null);
    const [deliveryRate, setDeliveryRate] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    useEffect(() => {
        if (id) {
            const selectedProduct = products.find((p) => p.id === id);
            setProduct(selectedProduct || null);
        }
    }, [id]);

    if (router.isReady && !product) {
        return <p>Product not found</p>;
    }



    return (
        <Elements stripe={stripePromise}>
            <div className="container-md">
                <Navbar />
                {product ? (
                    <div className='d-flex flex-column flex-lg-row px-0 px-lg-5'>
                        <div className='flex-lg-grow-1 order-2 order-lg-1' style={{ minWidth: "60%" }}>
                            <OrderForm product={product} setDeliveryRate={setDeliveryRate} totalAmount={totalAmount} />
                        </div>
                        <div className='flex-lg-grow-1 order-1 order-lg-2' style={{ minWidth: "40%" }}>
                            <OrderDetails product={product} deliveryRate={deliveryRate} setTotalAmount={setTotalAmount} />
                        </div>
                    </div>
                ) : (
                    <p>Loading product details...</p>
                )}

            </div>
        </Elements>
    );
} 