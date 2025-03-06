import { ProductType } from "@/types/DataTypes";
import { useState } from "react";

export default function OrderDetails({ product, deliveryRate }: { product: ProductType, deliveryRate: number }) {
    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [invalidDiscountError, setInvalidDiscountError] = useState("");

    const validDiscounts: { [code: string]: number } = {
        "PROMO10": 10, // €10 discount
        "SALE20": 20,  // €20 discount
        "BLACKFRIDAY": 0.1 // 10% discount
    };

    const handleApplyDiscount = () => {
        if (validDiscounts.hasOwnProperty(discountCode)) {
            let discount = validDiscounts[discountCode];
            if (discount < 1) {
                discount = subtotal * discount; // Apply percentage-based discount
            }
            setDiscountAmount(discount);
            setInvalidDiscountError("");
        } else {
            setDiscountAmount(0); 
            setInvalidDiscountError("Code de réduction invalide !");
        }
    };

    const subtotal = product.itemsNumber * product.price;
    const taxes = subtotal * product.taxRate;
    const total = subtotal + taxes + deliveryRate - discountAmount;

    return (
        <div className='p-4' >
            <h4 className="fw-bold pb-3">Votre Commande</h4>
            <div className="d-flex justify-content-between pb-4">
                <div className="d-flex gap-3">
                    <img style={{ width: "60px", height: "60px" }} src={product.image} alt="order image" />
                    <div>
                        <h6 className="fw-semibold fs-5 m-0">{product.name}</h6>
                        <p>{product.description}</p>
                    </div>
                </div>
                <p className="fw-semibold fs-5 ">€{product.price}</p>
            </div>
            <div className="pb-4">
                <div className="d-flex justify-content-between gap-2 ">
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Code de réduction'
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button className='btn btn-light bg-white border border-secondary-subtle' onClick={handleApplyDiscount}>Appliquer</button>
                </div>
                {invalidDiscountError && <div className="text-danger">{invalidDiscountError}</div>}
            </div>

            <div className="">
                <div className="d-flex justify-content-between fw-semibold">
                    <p>sous toutal - {product.itemsNumber} items </p>
                    <p>€{subtotal.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>livraison</p>
                    <p>{deliveryRate ? `€${deliveryRate}` : "-"}</p>

                </div>
                <div className="d-flex justify-content-between">
                    <p>taxes estimées</p>
                    <p>€{taxes.toFixed(2)}</p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between pb-4 mt-4">
                <h4 className="fw-bold">Total: </h4>
                <h4 className="fw-bold">€{total.toFixed(2)}</h4>
            </div>
            <div className="">
                <div className="d-flex gap-3 mb-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p style={{ fontSize: "14px" }}>description</p>
                    </div>
                </div>
                <div className="d-flex gap-3 mb-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p style={{ fontSize: "14px" }}>description</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p style={{ fontSize: "14px" }}>description</p>
                    </div>
                </div>
            </div>

        </div>
    );
} 