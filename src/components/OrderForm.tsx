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
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle payment submission logic
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 border bg-white' style={{width: '60%'}}>
            {/* Contact Section */}
            <h4>Contact</h4>
            <p>Entrez vos informations de contact</p>
            <label className='' htmlFor='email'>Email</label>
            <input id='email' type='email' className='form-control' placeholder='Indiquez votre email' required />
            <div className='form-check'>
                <label className='form-check-label' htmlFor='marketing'>J'accepte de recevoir des emails marketing</label>
                <input type='checkbox' className='form-check-input' id='marketing' />

            </div>

            {/* Address Section */}
            <h4>Adresse de Livraison</h4>
            <p>Entrez votre adresse de livraison</p>
            <div className='d-flex justify-content-between'>
                <div className='form-check'>
                    <label className='' htmlFor='prénom'>Prénom</label>
                    <input id='' type='text' className='form-control' placeholder='Indiquez votre prénom' />

                </div>
                <div className='form-check'>
                    <label className='' htmlFor='nom'>Nom</label>
                    <input id='nom' type='text' className='form-control' placeholder='Indiquez votre Nom' />

                </div>
            </div>
            <div className='form-check'>
                <label className='' htmlFor='adresse'>Adresse</label>
                <input id='adresse' type='text' className='form-control' placeholder='123 rue principale, Ville, Pays' />

            </div>
            <div className='form-check'>
                <label className='' htmlFor='adresse2'>Adresse complémentaire (optionnel)</label>
                <input id='adresse2' type='text' className='form-control' />

            </div>
            <label className='' htmlFor='marketing'>Pays</label>
            <select name="country" className="form-select mb-2" required>
                <option value="">Sélectionnez un pays</option>
                {countries.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                ))}
            </select>
            <div className='d-flex justify-content-between'>
                <div className='form-check'>
                    <label className='' htmlFor='ville'>Ville</label>
                    <input id='ville' type='text' className='form-control' placeholder='Indiquez votre Ville' />

                </div>
                <div className='form-check'>
                    <label className='' htmlFor='etat'>État</label>
                    <input type='text' id='etat' className='form-control' placeholder='Indiquez votre État' />

                </div>
                <div className='form-check'>
                    <label className='' htmlFor='codePostal'>Code Postal</label>
                    <input id='codePostal' type='text' className='form-control' placeholder='Indiquez votre Code Postal' />

                </div>
            </div>
            <div className='form-check'>
                <label className='' htmlFor='telephone'>Numéro de téléphone</label>
                <input id='telephone' type='text' className='form-control' placeholder='Indiquez votre Numéro de téléphone' />

            </div>
            <div className='form-check'>
                <label className='form-check-label' htmlFor='marketing'>L'adresse de facturation est différente de l'adresse de livraison</label>
                <input type='checkbox' className='form-check-input' id='marketing' />

            </div>

            {/* Méthode de Livraison */}
            <h4>Méthode de Livraison</h4>
            <p>Sélectionnez votre méthode de livraison ci-dessous</p>
            <div>
                <p>Information</p>
                <p>Sélectionnez un pays pour voir les méthodes d'expédition disponibles</p>
            </div>

            {/* Payment Section */}
            <h4>Paiement</h4>
            <p>Sélectionnez votre méthode de paiement ci-dessous. Toutes les transactions sont sécurisées et cryptées</p>
            <div>
                <p>Carte de crédit</p>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            </div>
            <div>
                <div className='form-check'>
                    <label className='' htmlFor='numCarte'>Numéro de carte</label>
                    carte logo
                    <input id='numCarte' type='text' className='form-control' placeholder='Indiquez votre numéro de carte' />

                </div>
                <div className='d-flex justify-content-between'>
                    <div className='form-check'>
                        <label className='' htmlFor='dateexp'>Date d'exp</label>
                        <input id='dateexp' type='text' className='form-control' placeholder='MM/AA' />

                    </div>
                    <div className='form-check'>
                        <label className='' htmlFor='cvv'>CVC/CVV</label>
                        <input id='cvv' type='text' className='form-control' placeholder='123' />

                    </div>
                </div>
            </div>

            {/* <CardElement className='form-control' options={{ hidePostalCode: false }} /> */}
            <button type='submit' className='btn btn-success w-100 mt-3'><i className="bi bi-lock-fill"></i>Payer</button>
            <p><i className="bi bi-lock-fill"></i>Sélectionnez votre méthode de paiement ci-dessous. Toutes les transactions sont sécurisées et cryptées</p>
            <div>
                Visa Mastercard
            </div>
        </form>
    );
}