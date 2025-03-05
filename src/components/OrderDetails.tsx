export default function OrderDetails() {
    return (
        <div className='p-4' style={{ width: '40%' }}>
            <h4>Votre Commande</h4>
            <div>
                <img src="" alt="order image" />
                <div>
                    <h4>order title</h4>
                    <p>description</p>
                </div>
                <p>€39.90</p>
            </div>
            <div>
                <input type='text' className='form-control' placeholder='Code de réduction' />
                <button className='btn btn-primary mt-2'>Appliquer</button>
            </div>
            <div>
                <p>sous toutal - 1 items </p>
                <p>€39.90</p>
            </div>
            <div>
                <p>livraison</p>
                <p>-</p>
            </div>
            <div>
                <p>taxes estimées</p>
                <p>€0.00</p>
            </div>
            <div>
                <h4>Total: </h4>
                <p>€39.90</p>
            </div>
            <div>
                icon
                <div>
                    <h6>title</h6>
                    <p>description</p>
                </div>
            </div>
            <div>
                icon
                <div>
                    <h6>title</h6>
                    <p>description</p>
                </div>
            </div>
            <div>
                icon
                <div>
                    <h6>title</h6>
                    <p>description</p>
                </div>
            </div>
        </div>
    );
}