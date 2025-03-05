export default function OrderDetails() {
    return (
        <div className='p-4 flex-lg-grow-1 ' style={{ minWidth: '40%' }}>
            <h4 className="fw-bold pb-3">Votre Commande</h4>
            <div className="d-flex justify-content-between pb-4">
                <div className="d-flex gap-3">
                    <img className="bg-dark" style={{ width: "60px", height: "60px" }} src="" alt="order image" />
                    <div>
                        <h6 className="fw-semibold fs-5 m-0">order title</h6>
                        <p>description</p>
                    </div>
                </div>
                <p className="fw-semibold fs-5 ">€39.90</p>
            </div>
            <div className="d-flex justify-content-between gap-2 pb-4">
                <input type='text' className='form-control' placeholder='Code de réduction' />
                <button className='btn btn-light bg-white border border-secondary-subtle'>Appliquer</button>
            </div>
            <div className="">
                <div className="d-flex justify-content-between fw-semibold">
                    <p>sous toutal - 1 items </p>
                    <p>€39.90</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>livraison</p>
                    <p>-</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p>taxes estimées</p>
                    <p>€0.00</p>
                </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-between pb-4 mt-4">
                <h4 className="fw-bold">Total: </h4>
                <h4 className="fw-bold">€39.90</h4>
            </div>
            <div className="">
                <div className="d-flex gap-3 mb-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p  style={{fontSize: "14px"}}>description</p>
                    </div>
                </div>
                <div className="d-flex gap-3 mb-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p style={{fontSize: "14px"}}>description</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    icon
                    <div>
                        <h6 className="fw-medium">title</h6>
                        <p style={{fontSize: "14px"}}>description</p>
                    </div>
                </div>
            </div>

        </div>
    );
} 