import React, { useState, useEffect } from 'react';
import { MdCallEnd } from "react-icons/md";
import { DivTextoChat, ButtonModalLlamada, ModalComponente } from "./styles"
import { Button, Modal } from 'antd';
import { FiUser } from "react-icons/fi";

function ModalLlamada({
    sip,
    session,
    setSession,
    ua,
    modalOpen,
    setModalOpen,
    numeroSeleccionado,
    handleStop,
    estadoSession,
    setActivo,
    activo,
    tiempo,
    setTiempo,
    nombreModal,
    botonDesactivado }) {

    useEffect(() => {
        let intervalId = 0;

        if (activo) {
            intervalId = setInterval(() => {
                setTiempo((prevTiempo) => prevTiempo + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [activo]);

    const obtenerTiempoFormateado = () => {
        const horas = Math.floor(tiempo / 3600);
        const minutos = Math.floor((tiempo % 3600) / 60);
        const segundos = tiempo % 60;

        return `${horas.toString().padStart(2, '0')}:${minutos
            .toString()
            .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    };

    // console.log('numeroSeleccionado ======>', numeroSeleccionado)
    // console.log('sip de ModalLlamada', sip)



    return (
        <div className="container">
            <ModalComponente  open={modalOpen} footer={null} onCancel={() => setModalOpen(false)}>
                <div className="modal-content-container">
                    <h4>{estadoSession}</h4>
                    <h1>{nombreModal} <FiUser /></h1>

                    <h3>{numeroSeleccionado}   </h3>
                    <h2>{obtenerTiempoFormateado()}</h2>
                </div>
                <ButtonModalLlamada  disabled={botonDesactivado} onClick={() => handleStop()}>
                    <MdCallEnd key="handleStop"  />
                </ButtonModalLlamada>

            </ModalComponente>
        </div>
    );
}
export default ModalLlamada;
