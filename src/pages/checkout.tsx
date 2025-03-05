import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderForm from "@/components/OrderForm";
import OrderDetails from "@/components/OrderDetails";
import Navbar from "@/components/Navbar";




export default function checkout() {
    return (
        <div className="container-md">
            <Navbar />
            <div className='container d-flex flex-column flex-lg-row px-0 px-lg-5'>
                <div className="order-1 order-lg-2 w-100">
                    <OrderDetails />
                </div>

                {/* OrderForm second on small screens, first on large screens */}
                <div className="order-2 order-lg-1 w-100">
                    <OrderForm />
                </div>
            </div>
        </div>
    );
} 