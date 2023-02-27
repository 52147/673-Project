import {Button, Form, Modal, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import styles from './parking-pay.module.css'
import {useDispatch, useSelector} from "react-redux";
import zelleImg from '../../image/zelleImg.jpeg'
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {getParkingInfoThunk} from "../../services/parkInfoThunk";

const ParkingPayment = (props) => {
    const {plates} = useParams();

    const dispatch = useDispatch();
    const {ParkingFee, loading, msg} = useSelector((state) => state.parkInfo)

    const parkInfo = {
        plate: plates
    }

    useEffect(() => {
        dispatch(getParkingInfoThunk(parkInfo))
    }, []);

    let [credit, setCredit] = useState(0);

    const cashPayClickHandler = () => {
        setCredit(0)
    }
    const onlinePayClickHandler = () => {
        setCredit(1)
    }

    const zellePayClickHandler = () => {
        setCredit(2)
    }

    const [show, setShow] = useState(false);

    const payButtonClickHandlerClose = () => setShow(false);
    const payButtonClickHandlerShow = () => setShow(true);

    const navigate = useNavigate()
    const navHome = () => {
        navigate('/');
    }

    return (<>
            <div className={styles.backG}>
                {msg == 'fail' && <>
                    <div className="row mt-5">
                        <div className="col text-white">
                            <h1>
                                <div className="col text-white">
                                    <h1>{plates} Can not Pay.</h1>
                                </div>
                            </h1>
                        </div>
                    </div>

                </>}
                {
                    msg == 'success' && !loading && <div className="container">
                        <div className="row mt-5">

                            <div className={`col-6 text-white ${styles.textRight}`}>
                                <h1>Parking Fee:</h1>
                            </div>
                            <div className={`col-6 text-white ${styles.textLeft}`}>
                                <h1>{ParkingFee} USD</h1>
                            </div>

                        </div>

                        <div className="row mt-4">
                            <div className={`col-5 text-white ${styles.textRight}`}>
                                <Button onClick={cashPayClickHandler} variant="light">Pay with Cash/Card</Button>
                            </div>
                            <div className={`col-2 text-white `}>
                                <Button onClick={onlinePayClickHandler} variant="light"> Pay Online </Button>
                            </div>
                            <div className={`col-5 text-white ${styles.textLeft}`}>
                                <Button onClick={zellePayClickHandler} variant="light">Pay with Zelle</Button>
                            </div>
                        </div>
                        {
                            credit == 0 && <div>
                                <br/>
                                <br/>
                            </div>
                        }
                        {
                            credit == 1 && <div>
                                <div className="row mt-3">

                                    <Form>
                                        <Form.Group controlId="FirstName">
                                            <div className="row">
                                                <div className={`col-5 text-white ${styles.textRight}`}>
                                                    <h3>First Name: </h3>
                                                </div>
                                                <div className={`col-5 text-white  ${styles.textLeft}`}>
                                                    <Form.Control type="FirstName" placeholder="Enter First Name"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="LastName">
                                            <div className="row">
                                                <div className={`col-5 text-white mt-1 ${styles.textRight}`}>
                                                    <h3>Last Name: </h3>
                                                </div>
                                                <div className={`col-5 text-white mt-1 ${styles.textLeft}`}>
                                                    <Form.Control type="LastName" placeholder="Enter Last Name"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="Email">
                                            <div className="row">
                                                <div className={`col-5 text-white mt-1 ${styles.textRight}`}>
                                                    <h3>Email Address: </h3>
                                                </div>
                                                <div className={`col-5 text-white mt-1 ${styles.textLeft}`}>
                                                    <Form.Control type="Email" placeholder="Enter Email Address"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="CardNumber">
                                            <div className="row">
                                                <div className={`col-5 text-white mt-1 ${styles.textRight}`}>
                                                    <h3>Card Number: </h3>
                                                </div>
                                                <div className={`col-5 text-white mt-1 ${styles.textLeft}`}>
                                                    <Form.Control type="CardNumber" placeholder="Enter Card Number"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="ExpirationDate">
                                            <div className="row">
                                                <div className={`col-5 text-white mt-1 ${styles.textRight}`}>
                                                    <h3>Expiration Date: </h3>
                                                </div>
                                                <div className={`col-5 text-white mt-1 ${styles.textLeft}`}>
                                                    <Form.Control type="ExpirationDate" placeholder="Enter Expiration Date"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <Form.Group controlId="CVC">
                                            <div className="row">
                                                <div className={`col-5 text-white mt-1 ${styles.textRight}`}>
                                                    <h3>CVC: </h3>
                                                </div>
                                                <div className={`col-5 text-white mt-1 ${styles.textLeft}`}>
                                                    <Form.Control type="CVC" placeholder="Enter CVC"/>
                                                </div>
                                            </div>
                                        </Form.Group>

                                    </Form>


                                </div>

                            </div>
                        }{
                        credit == 2 && <div className={` mt-3 ${styles.content}`}>

                            <img src={zelleImg} height={250} width={250} alt=''/>
                        </div>
                    }


                        <Button className={`mt-3 ${styles.payButton}`} onClick={payButtonClickHandlerShow}
                                variant="warning">Pay</Button>

                        <Modal show={show} onHide={payButtonClickHandlerClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Payment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body> Pay successfully! Thank you!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={navHome}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                }{
                msg == 'success' && loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden mt-5">Loading...</span>
                </Spinner>
            }

            </div>


        </>
    )
}


export default ParkingPayment;