import React, { useContext, useState, useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"
import './Cart.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Stripe from './Stripe'
export default function Cart2() {
    const [stripePromise, setStripePromise] = useState(null)
    const [orderData, setOrderData] = useState({
        email: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
      });
    const HandleOrderEmail = (event) => { setOrderData({ ...orderData, email: event.target.value });};
    const HandleAddress1 = (event) => {setOrderData({ ...orderData, address1: event.target.value });};
    const HandleAddress2 = (event) => { setOrderData({ ...orderData, address2: event.target.value });};
    const HandleCity = (event) => { setOrderData({ ...orderData, city: event.target.value }); };
    const HandlePostcode = (event) => { setOrderData({ ...orderData, postcode: event.target.value });};
    const HandleCountry = (event) => {setOrderData({ ...orderData, country: event.target.value });};
    const HandlePhone = (event) => {  setOrderData({ ...orderData, phone: event.target.value });};
    const Global = useContext(Context)
    const [clientSecret, setClientSecret] = useState()
    useEffect(() => {
        const stripePromise = loadStripe('pk_test_51NHrWICTjmF29wzpplrz6Pq1OP4maYNdDxt65l2qWpXKrSi6t4uJ2rJQMeaZ3SukRdOAmr7usoEOddPXJzlPpk7v00dwZ2ESnz')
        setStripePromise(stripePromise)
    }, [])
    useEffect(() => {
        const CreatePaymentIntent = async () => {
            const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({Price: Global.Order.Total}),
                });

            const ResponseToJson = await Response.json();
            setClientSecret(ResponseToJson.ClientSecret)
        }
        CreatePaymentIntent()
    }, [])


    return (
        <>
            <Navigation />
            <div className='container my-5' id="Cart-Holder">
                <div className='Order-Display'>
                    <div className='Order-Header'>
                        Order Details
                    </div>

                    <>
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front and Rear') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Front and Rear]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                <div><b>Layout:</b> {Global.Order.Layout}</div>
                                {Global.Order.Layout === "Custom Plates" &&
                                    <>
                                        <div><b>Custom Text:</b> {Global.Order.FooterText}</div>
                                        <div><b>Custom Color:</b> {Global.Order.FooterColor}</div>
                                    </>
                                }
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> Default</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        <div><b>Badge-Background:</b> {Global.Order.BadgeBackground}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Font !== "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> {Global.Order.Font}</div>
                                }
                                {Global.Order.Font === "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> Default</div>
                                }
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}

                            </div>
                        }
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front Only') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Front Only]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                <div><b>Layout:</b> {Global.Order.Layout}</div>
                                {Global.Order.Layout === "Custom Plates" &&
                                    <>
                                        <div><b>Custom Text:</b> {Global.Order.FooterText}</div>
                                        <div><b>Custom Color:</b> {Global.Order.FooterColor}</div>
                                    </>
                                }
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> Default</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        <div><b>Badge-Background:</b> {Global.Order.BadgeBackground}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Font !== "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> {Global.Order.Font}</div>
                                }
                                {Global.Order.Font === "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> Default</div>
                                }
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}

                            </div>
                        }
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Rear Only') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Rear Only]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                <div><b>Layout:</b> {Global.Order.Layout}</div>
                                {Global.Order.Layout === "Custom Plates" &&
                                    <>
                                        <div><b>Custom Text:</b> {Global.Order.FooterText}</div>
                                        <div><b>Custom Color:</b> {Global.Order.FooterColor}</div>
                                    </>
                                }
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> Default</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                        <div><b>Badge-Background:</b> {Global.Order.BadgeBackground}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Font !== "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> {Global.Order.Font}</div>
                                }
                                {Global.Order.Font === "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> Default</div>
                                }
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                            </div>
                        }
                        {(Global.Order.Type !== 'standard') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> 4D [Front and Rear]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                <div><b>Layout:</b> {Global.Order.Layout}</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> Default</div>
                                }
                                {Global.Order.Font !== "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> {Global.Order.Font}</div>
                                }
                                {Global.Order.Font === "'Montserrat', sans-serif" &&
                                    <div><b>Font:</b> Default</div>
                                }
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                            </div>
                        }
                    </>


                    <div className='Price-display'>
                        <div>Total Amount:</div>
                        <div>£{Global.Order.Total}</div>
                    </div>
                </div>

                <div className="Order-Button">
                    <div className='Order-Header'>
                        Address Details
                    </div>
                    <div className="Order-Form">
                        <input placeholder="Enter Email Address" id="TopBox" required onChange={HandleOrderEmail}/>
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Address Line 1" id="TopBox2" required onChange={HandleAddress1}></input>
                        <input placeholder="Address Line 2" id="TopBox21" onChange={HandleAddress2}></input>
                    </div>
                    <div className="Order-Form2">
                        <input placeholder="City" id="TopBox2" required onChange={HandleCity}></input>
                        <input placeholder="Postcode" id="TopBox21" required onChange={HandlePostcode}></input>
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Country" id="TopBox2" required onChange={HandleCountry}></input>
                        <input placeholder="Phone Number" id="TopBox21" required onChange={HandlePhone}></input>
                    </div>

                {stripePromise && clientSecret &&
                (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <Stripe  orderData={orderData} />
                    </Elements>
                    )
                }
                </div>
        </div >

        <div className="FooterContainer1">
        <div className="Content1">
          &copy; Copyright 2005-2023 Bancroft Auto Locksmiths. All rights Reserved.
        </div>
      </div>

        </>
    )
}


const ReturnSize = (Option) => {
    const Size = {
        Option1: "Standard Size (20.5x4.4in)",
        Option2: "Standard 4x4 279mm X 203mm (11in X 8in)",
        Option3: "229mm x 76mm (9in x 3in)",
        Option4: "254mm x 76mm (10in x 3in)",
        Option5: "305mm x 76mm (12in x 3in)",
        Option6: "305mm x 152mm (12in x 6in)",
        Option7: "330mm x 111mm (13in x 4.4in)",
        Option8: "330mm x 165mm (13in x 6.5in)",
        Option9: "16in x 4.5in (16in x 4.5in)",
        Option10: "520mm x 121mm (20.5in x 4.75in)",
        Option11: "520mm x 127mm (20.5in x 5in)",
        Option12: "520mm x 140mm (20.5in x 5.5in)",
        Option13: "520mm x 152mm (20.5in x 6in)",
        Option14: "533mm x 152mm (21in x 6in)",
        Option15: "559mm x 152mm (22in x 6in)",
        Option16: "Rover 75 (635x175mm)",
        Option17: "Range Rover Sport V1 (615x150mm)",
        Option18: "Range Rover Sport V2 (560x165mm)",
    }
    return Size[Option] || ""
}
