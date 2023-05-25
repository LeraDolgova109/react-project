import React, {useState} from "react";
import {Toast, ToastContainer} from "react-bootstrap";

function ToastItem(props) {
    const [show, setShow] = useState(true);

    function redirectionOnClose(){
        setShow(false);
        if (props.error === 401)
        {
            window.location.pathname=('login');
        }
        if (props.error === 400)
        {
            window.location.reload();
        }
        if (props.error === 404)
        {
            window.location.pathname=('');
        }
    }

    return (
        <ToastContainer className="p-3" position="top-center">
            <Toast onClose={() => redirectionOnClose()} show={show}>
                <Toast.Header>
                    <strong className="me-auto">Кампусные курсы</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );

}

export default ToastItem;