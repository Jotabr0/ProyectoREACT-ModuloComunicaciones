import { Button } from 'antd';
import React, { useEffect} from 'react';
import { ModalComponente } from "./styles";

function ModalError({ message, modalErrorOpen,setModalErrorOpen }) {

    useEffect(() => {
        if (modalErrorOpen) {
            const timer = setTimeout(() => {
                setModalErrorOpen(false)               
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, [modalErrorOpen]);


    return (
        <div className="container">
            <ModalComponente open={modalErrorOpen} footer={null} >
                <div className="modal-content-container">
                   {message}
                </div>

            </ModalComponente>
        </div>
    );
}
export default ModalError;
