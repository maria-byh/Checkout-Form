"use client"
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const countries = [
    { code: "FR", name: "France" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "DE", name: "Germany" },
    { code: "JP", name: "Japan" },
];

export default function OrderForm() {
    const [formData, setFormData] = useState({ email: '', marketing: false, address: {} });
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    const handleRadioChange = (value: string) => {
        setSelectedPayment((prev) => (prev === value ? null : value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle payment submission logic
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 border bg-white d-flex flex-column flex-lg-grow-1 ' style={{ minWidth: '60%' }}>
            {/* Contact Section */}
            <div className="mb-5">
                <h4 className='fw-bold'>Contact</h4>
                <p>Entrez vos informations de contact</p>
                <div className="mb-3">
                    <label className='fw-medium py-1' htmlFor='email'>Email</label>
                    <input id='email' type='email' className='form-control py-2' placeholder='Indiquez votre email' required />
                </div>
                <div className='form-check'>
                    <label className='form-check-label fw-medium' htmlFor='marketing'>J'accepte de recevoir des emails marketing</label>
                    <input type='checkbox' className='form-check-input' id='marketing' />
                </div>
            </div>


            {/* Address Section */}
            <div className="mb-5">
                <h4 className='fw-bold'>Adresse de Livraison</h4>
                <p>Entrez votre adresse de livraison</p>
                <div className='d-flex  flex-column flex-lg-row  justify-content-between mb-3 gap-3'>
                    <div className='flex-fill'>
                        <label className='py-1 fw-medium' htmlFor='prénom'>Prénom</label>
                        <input id='' type='text' className='form-control py-2' placeholder='Indiquez votre prénom' />
                    </div>
                    <div className='flex-fill'>
                        <label className='py-1 fw-medium' htmlFor='nom'>Nom</label>
                        <input id='nom' type='text' className='form-control py-2' placeholder='Indiquez votre Nom' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='py-1 fw-medium' htmlFor='adresse'>Adresse</label>
                    <input id='adresse' type='text' className='form-control py-2' placeholder='123 rue principale, Ville, Pays' />
                </div>
                <div className='mb-3'>
                    <label className='py-1 fw-medium' htmlFor='adresse2'>Adresse complémentaire (optionnel)</label>
                    <input id='adresse2' type='text' className='form-control py-2' />
                </div>
                <div className='mb-3'>
                    <label className='py-1 fw-medium' htmlFor='country'>Pays</label>
                    <select name="country" className="form-select mb-2 py-2" required>
                        <option value="">Sélectionnez un pays</option>
                        {countries.map((c) => (
                            <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className='d-flex flex-column flex-lg-row justify-content-between mb-3 gap-3'>
                    <div className='flex-fill'>
                        <label className='py-1 fw-medium' htmlFor='ville'>Ville</label>
                        <input id='ville' type='text' className='form-control py-2' placeholder='Indiquez votre Ville' />
                    </div>
                    <div className='flex-fill'>
                        <label className='py-1 fw-medium' htmlFor='etat'>État</label>
                        <input type='text' id='etat' className='form-control py-2' placeholder='Indiquez votre État' />
                    </div>
                    <div className='flex-fill'>
                        <label className='py-1 fw-medium' htmlFor='codePostal'>Code Postal</label>
                        <input id='codePostal' type='text' className='form-control py-2' placeholder='Indiquez votre Code Postal' />
                    </div>
                </div>
                <div className='mb-3'>
                    <label className='py-1 fw-medium' htmlFor='telephone'>Numéro de téléphone</label>
                    <input id='telephone' type='text' className='form-control py-2' placeholder='Indiquez votre Numéro de téléphone' />
                </div>
                <div className='form-check'>
                    <label className='form-check-label fw-medium' htmlFor='marketing'>L'adresse de facturation est différente de l'adresse de livraison</label>
                    <input type='checkbox' className='form-check-input' id='marketing' />
                </div>
            </div>


            {/* Méthode de Livraison */}
            <div className="mb-5">
                <h4 className='fw-bold'>Méthode de Livraison</h4>
                <p>Sélectionnez votre méthode de livraison ci-dessous</p>
                <div className='p-3 border rounded-2' style={{ backgroundColor: "#F0F0F5" }}>
                    <p className='m-0'>Information</p>
                    <p className='m-0'>Sélectionnez un pays pour voir les méthodes d'expédition disponibles</p>
                </div>
            </div>


            {/* Payment Section */}
            <div className="mb-4">
                <h4 className='fw-bold'>Paiement</h4>
                <p>Sélectionnez votre méthode de paiement ci-dessous. Toutes les transactions sont sécurisées et cryptées</p>
                <div
                    className={`d-flex px-5 py-4 justify-content-between border ${selectedPayment === "credit_card"? "rounded-top-2" : "rounded-2"}`}
                    style={{ backgroundColor: "#F0F0F5" }}
                    
                >
                    <p className='m-0 fw-medium'>Carte de crédit</p>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentmethode"
                        id="creditcard"
                        checked={selectedPayment === "credit_card"}
                        onChange={() => { }}
                        onClick={() => handleRadioChange("credit_card")}
                    />
                </div>
                {selectedPayment === "credit_card" && (
                    <div className='border rounded-bottom-2 p-3'>
                        <div className='mb-3'>
                            <label className='py-1 fw-medium' htmlFor='numCarte'>Numéro de carte</label>
                            carte logo
                            <input id='numCarte' type='text' className='form-control py-2' placeholder='Indiquez votre numéro de carte' />
                        </div>
                        <div className='d-flex justify-content-between gap-3'>
                            <div className='flex-fill'>
                                <label className='py-1 fw-medium' htmlFor='dateexp'>Date d'exp</label>
                                <input id='dateexp' type='text' className='form-control py-2' placeholder='MM/AA' />
                            </div>
                            <div className='flex-fill'>
                                <label className='py-1 fw-medium' htmlFor='cvv'>CVC/CVV</label>
                                <input id='cvv' type='text' className='form-control py-2' placeholder='123' />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button type='submit' className='btn btn-success w-100 mt-3 fs-5 border-0 mb-3' style={{ paddingBottom: "10px", paddingTop: "10px", backgroundColor: "#d27d01" }}><i className="bi bi-lock-fill"></i> Payer</button>
            <p className='mb-3 text-secondary align-self-center'><i className="bi bi-lock-fill"></i> Toutes les transactions sont sécurisées et cryptées</p>
            <div className='d-flex gap-4 align-self-center'>
                Visa Mastercard
            </div>
        </form>
    );
}  