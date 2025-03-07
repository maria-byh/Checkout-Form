"use client"
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { ErrorMessage, Field, Formik } from 'formik';
import { ProductType } from '@/types/DataTypes';

const countries = [
    { code: "FR", name: "France" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "DE", name: "Germany" },
    { code: "JP", name: "Japan" },
];

const shippingOptions: { [key: string]: { id: string; name: string; rate: number }[] } = {
    FR: [
        { id: "standard", name: "Standard (3-5 jours) - 5€", rate: 5 },
        { id: "express", name: "Express (1-2 jours) - 10€", rate: 10 },
    ],
    US: [
        { id: "standard", name: "Standard (5-7 days) - $7", rate: 7 },
        { id: "express", name: "Express (2-3 days) - $15", rate: 15 },
    ],
    CA: [
        { id: "standard", name: "Standard (5-8 days) - $8", rate: 8 },
        { id: "express", name: "Express (2-4 days) - $18", rate: 18 },
    ],
    DE: [
        { id: "standard", name: "Standard (4-6 Tage) - 6€", rate: 6 },
        { id: "express", name: "Express (1-3 Tage) - 12€", rate: 12 },
    ],
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("E-mail invalide")
        .required("L'e-mail est requis"),

    firstName: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ\s'-]+$/, "Le prénom ne doit contenir que des lettres")
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(50, "Le prénom ne peut pas dépasser 50 caractères")
        .required("Le prénom est requis"),

    lastName: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ\s'-]+$/, "Le nom de famille ne doit contenir que des lettres")
        .min(2, "Le nom de famille doit contenir au moins 2 caractères")
        .max(50, "Le nom de famille ne peut pas dépasser 50 caractères")
        .required("Le nom de famille est requis"),

    address: Yup.string()
        .min(5, "L'adresse doit contenir au moins 5 caractères")
        .max(100, "L'adresse ne peut pas dépasser 100 caractères")
        .required("L'adresse est requise"),

    address2: Yup.string()
        .max(100, "L'adresse complémentaire ne peut pas dépasser 100 caractères"),

    city: Yup.string()
        .min(2, "La ville doit contenir au moins 2 caractères")
        .max(50, "La ville ne peut pas dépasser 50 caractères")
        .required("La ville est requise"),

    state: Yup.string()
        .min(2, "L'État doit contenir au moins 2 caractères")
        .max(50, "L'État ne peut pas dépasser 50 caractères")
        .required("L'État est requis"),

    postalCode: Yup.string()
        .matches(/^\d{4,10}$/, "Le code postal doit être compris entre 4 et 10 chiffres")
        .required("Le code postal est requis"),

    country: Yup.string()
        .min(2, "Le pays doit contenir au moins 2 caractères")
        .max(50, "Le pays ne peut pas dépasser 50 caractères")
        .required("Le pays est requis"),

    phone: Yup.string()
        .matches(/^\+?\d{6,15}$/, "Le numéro de téléphone doit être valide (6 à 15 chiffres)")
        .required("Le numéro de téléphone est requis"),

    marketingEmails: Yup.boolean(),
    addressFact: Yup.boolean(),

    shippingMethod: Yup.string()
        .required("Veuillez sélectionner un mode de livraison"),

    paymentMethod: Yup.string()
        .required("Veuillez sélectionner un mode de paiement"),
});

export default function OrderForm({ product, setDeliveryRate, totalAmount }: { product: ProductType, setDeliveryRate: (rate: number) => void, totalAmount: number }) {
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();
    const [fillError, setFillError] = useState<string | null>(null);
    const [cardError, setCardError] = useState<string | null>(null);
    const [expiryError, setExpiryError] = useState<string | null>(null);
    const [cvcError, setCvcError] = useState<string | null>(null);

    const handleSubmit = async (values: any) => {

        if (!stripe || !elements) {
            setFillError("Stripe has not loaded yet.");
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        const expiryElement = elements.getElement(CardExpiryElement);
        const cvcElement = elements.getElement(CardCvcElement);
        
        if (!cardElement || !expiryElement || !cvcElement) {
            setFillError("Please fill in all card details.");
            return;
        } else {
            setFillError(null);
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: `${values.firstName} ${values.lastName}`,
                    email: values.email,
                    address: {
                        line1: values.address,
                        city: values.city,
                        state: values.state,
                        postal_code: values.postalCode,
                        country: values.country,
                    },
                },
            });

            if (error) {
                setFillError((error.message && "Veuillez remplir tous les détails de la carte.") || "Payment failed.");
                return;
            }

            const response = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: totalAmount * 100,
                }),
            });

            const paymentResult = await response.json();

            if (paymentResult.success) {
                alert("Payment successful!");
            } else {
                alert("Payment failed: " + paymentResult.message);
            }
        } catch (err) {
            alert("An error occurred while processing your payment.");
        }
    };


    return (
        <Formik
            initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                address2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                phone: "",
                paymentMethod: "",
                marketingEmails: false,
                addressFact: false,
                shippingMethod: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={true}
        >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => {
                useEffect(() => {
                    setFieldValue("shippingMethod", "");
                    setDeliveryRate(0)
                }, [values.country, setFieldValue]);

                return (
                    <form className='p-4 border bg-white d-flex flex-column ' onSubmit={handleSubmit}>
                        {/* Contact Section */}
                        <div className="mb-5">
                            <h4 className='fw-bold'>Contact</h4>
                            <p>Entrez vos informations de contact</p>
                            <div className="mb-3">
                                <label className='fw-medium py-1' htmlFor='email'>Email</label>
                                <Field id='email' name="email" type='email' className='form-control py-2' placeholder='Indiquez votre email' />
                                <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                            </div>
                            <div className='form-check'>
                                <label className='form-check-label fw-medium' htmlFor='marketing'>J'accepte de recevoir des emails marketing</label>
                                <Field
                                    type='checkbox'
                                    name='marketingEmails'
                                    className='form-check-input'
                                    id='marketing'
                                />
                            </div>
                        </div>


                        {/* Address Section */}
                        <div className="mb-5">
                            <h4 className='fw-bold'>Adresse de Livraison</h4>
                            <p>Entrez votre adresse de livraison</p>
                            <div className='d-flex  flex-column flex-lg-row  justify-content-between mb-3 gap-3'>
                                <div className='flex-fill'>
                                    <label className='py-1 fw-medium' htmlFor='prénom'>Prénom</label>
                                    <Field name='firstName' type='text' className='form-control py-2' placeholder='Indiquez votre prénom' />
                                    <ErrorMessage name="firstName" component="div" className="text-danger mt-1" />
                                </div>
                                <div className='flex-fill'>
                                    <label className='py-1 fw-medium' htmlFor='nom'>Nom</label>
                                    <Field name='lastName' type='text' className='form-control py-2' placeholder='Indiquez votre Nom' />
                                    <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='py-1 fw-medium' htmlFor='adresse'>Adresse</label>
                                <Field name='address' type='text' className='form-control py-2' placeholder='123 rue principale, Ville, Pays' />
                                <ErrorMessage name="address" component="div" className="text-danger mt-1" />
                            </div>
                            <div className='mb-3'>
                                <label className='py-1 fw-medium' htmlFor='adresse2'>Adresse complémentaire (optionnel)</label>
                                <Field name='address2' type='text' className='form-control py-2' placeholder='Adresse Complémentaire' />
                            </div>
                            <div className='mb-3'>
                                <label className='py-1 fw-medium' htmlFor='country'>Pays</label>
                                <Field as="select" name="country" className="form-select mb-2 py-2">
                                    <option value="">Sélectionnez un pays</option>
                                    {countries.map((c) => (
                                        <option key={c.code} value={c.code}>{c.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="country" component="div" className="text-danger mt-1" />
                            </div>
                            <div className='d-flex flex-column flex-lg-row justify-content-between mb-3 gap-3'>
                                <div className='flex-fill'>
                                    <label className='py-1 fw-medium' htmlFor='ville'>Ville</label>
                                    <Field name='city' type='text' className='form-control py-2' placeholder='Indiquez votre Ville' />
                                    <ErrorMessage name="city" component="div" className="text-danger mt-1" />
                                </div>
                                <div className='flex-fill'>
                                    <label className='py-1 fw-medium' htmlFor='etat'>État</label>
                                    <Field type='text' name='state' className='form-control py-2' placeholder='Indiquez votre État' />
                                    <ErrorMessage name="state" component="div" className="text-danger mt-1" />
                                </div>
                                <div className='flex-fill'>
                                    <label className='py-1 fw-medium' htmlFor='codePostal'>Code Postal</label>
                                    <Field name='postalCode' type='text' className='form-control py-2' placeholder='Indiquez votre Code Postal' />
                                    <ErrorMessage name="postalCode" component="div" className="text-danger mt-1" />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='py-1 fw-medium' htmlFor='telephone'>Numéro de téléphone</label>
                                <Field name='phone' type='text' className='form-control py-2' placeholder='Indiquez votre Numéro de téléphone' />
                                <ErrorMessage name="phone" component="div" className="text-danger mt-1" />
                            </div>
                            <div className='form-check'>
                                <label className='form-check-label fw-medium' htmlFor='adressfact'>L'adresse de facturation est différente de l'adresse de livraison</label>
                                <Field
                                    type='checkbox'
                                    className='form-check-input'
                                    name='addressFact'
                                />
                            </div>
                        </div>


                        {/* Méthode de Livraison */}
                        <div className="mb-5">
                            <h4 className='fw-bold'>Méthode de Livraison</h4>
                            <p>Sélectionnez votre méthode de livraison ci-dessous</p>
                            {values.country ? (
                                shippingOptions[values.country] ? (
                                    <div className='d-flex flex-column gap-2'>
                                        {shippingOptions[values.country].map((option) => (
                                            <label key={option.id} className='d-flex align-items-center gap-2'>
                                                <Field
                                                    type="radio"
                                                    name="shippingMethod"
                                                    value={option.id}
                                                    className="form-check-input"
                                                    checked={values.shippingMethod === option.id}
                                                    onChange={() => {
                                                        setFieldValue("shippingMethod", option.id);
                                                        setDeliveryRate(option.rate);
                                                    }}
                                                />
                                                {option.name}
                                            </label>
                                        ))}
                                    </div>
                                ) : (

                                    <div className='p-3 border rounded-2' style={{ backgroundColor: "#F0F0F5" }}>
                                        <p className='m-0'>Information</p>
                                        <p className='m-0'>Aucune option de livraison disponible pour ce pays.</p>
                                    </div>
                                )
                            ) : (
                                <div className='p-3 border rounded-2' style={{ backgroundColor: "#F0F0F5" }}>
                                    <p className='m-0'>Information</p>
                                    <p className='m-0'>Sélectionnez un pays pour voir les méthodes d'expédition disponibles</p>
                                </div>
                            )}
                            <ErrorMessage name="shippingMethod" component="div" className="text-danger mt-1" />
                        </div>


                        {/* Payment Section */}
                        <div className="mb-4">
                            <h4 className='fw-bold'>Paiement</h4>
                            <p>Sélectionnez votre méthode de paiement ci-dessous. Toutes les transactions sont sécurisées et cryptées</p>
                            <div
                                className={`d-flex px-5 py-4 justify-content-between border ${selectedPayment === "credit_card" ? "rounded-top-2" : "rounded-2"}`}
                                style={{ backgroundColor: "#F0F0F5" }}

                            >
                                <p className='m-0 fw-medium'>Carte de crédit</p>
                                <Field
                                    className="form-check-input"
                                    type="radio"
                                    name="paymentMethod"
                                    id="creditcard"
                                    value="credit_card"
                                    onClick={() => setFieldValue("paymentMethod", values.paymentMethod === "credit_card" ? "" : "credit_card")}
                                />
                            </div>
                            <ErrorMessage name="paymentMethod" component="div" className="text-danger mt-1" />
                            {values.paymentMethod === "credit_card" && (
                                <div className='border rounded-bottom-2 p-3'>
                                    <div className='mb-3'>
                                        <label className='py-1 fw-medium' htmlFor='numCarte'>Numéro de carte</label>
                                        carte logo
                                        <div className="form-control py-3">
                                            <CardNumberElement
                                                onChange={(event) => {
                                                    if (event.error) {
                                                        setCardError(event.error.message || null);
                                                    } else {
                                                        setCardError("");
                                                    }
                                                }}
                                            />
                                        </div>
                                        {cardError && <div className="text-danger mt-1">{cardError}</div>}
                                    </div>
                                    <div className='d-flex justify-content-between gap-3'>
                                        <div className='flex-fill'>
                                            <label className='py-1 fw-medium' htmlFor='dateexp'>Date d'exp</label>
                                            <div className="form-control py-3">
                                                <CardExpiryElement
                                                    onChange={(event) => {
                                                        if (event.error) {
                                                            setExpiryError(event.error.message);
                                                        } else {
                                                            setExpiryError(null);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {expiryError && <div className="text-danger mt-1">{expiryError}</div>}
                                        </div>
                                        <div className='flex-fill'>
                                            <label className='py-1 fw-medium' htmlFor='cvv'>CVC/CVV</label>
                                            <div className="form-control py-3">
                                                <CardCvcElement
                                                    onChange={(event) => {
                                                        if (event.error) {
                                                            setCvcError(event.error.message);
                                                        } else {
                                                            setCvcError(null);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {cvcError && <div className="text-danger mt-1">{cvcError}</div>}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {values.paymentMethod === "credit_card" && <div className="text-danger mt-1">{fillError}</div>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 mt-3 fs-5 border-0 mb-3' style={{ paddingBottom: "10px", paddingTop: "10px", backgroundColor: "#d27d01" }}><i className="bi bi-lock-fill"></i> Payer</button>
                        <p className='mb-3 text-secondary align-self-center'><i className="bi bi-lock-fill"></i> Toutes les transactions sont sécurisées et cryptées</p>
                        <div className='d-flex gap-4 align-self-center'>
                            Visa Mastercard
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
}  