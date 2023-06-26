import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import '../index.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { BotonBorrar, BotonCall, StyledButton, DivContenedorTnumerico, BotonNumero, DivTnumerico, InputTelefono } from "./styles";

function Tnumerico(props) {
    const [numero, setNumero] = useState('');

    //    console.log("onCall en tnumerico",()=>onCall(numero))
    //    console.log("numero oncall",numero)

    const agregarNumero = (valor) => {
        setNumero(numero + valor);
    }
    const eliminarUltimoNumero = () => {
        setNumero(numero.substring(0, numero.length - 1))
    };

    const handleKeyDown = (event) => {
        // Verifica que la tecla presionada es un número del teclado numérico
        if (event.keyCode >= 96 && event.keyCode <= 105) {
            setNumero(numero + event.key);
        }

        if (event.keyCode === 8) {
            eliminarUltimoNumero();
        }
    };

    return (
        <DivContenedorTnumerico>

            <InputTelefono value={numero} onKeyUp={(e) => handleKeyDown(e)} type="text" placeholder="Marque un número" /> <BotonBorrar onClick={() => eliminarUltimoNumero()}><FiDelete /></BotonBorrar>
            <DivTnumerico>

                <BotonNumero value={1} onClick={() => agregarNumero(1)}>1</BotonNumero>
                <BotonNumero value={2} onClick={() => agregarNumero(2)}>2</BotonNumero>
                <BotonNumero value={3} onClick={() => agregarNumero(3)}>3</BotonNumero>
                <BotonNumero value={4} onClick={() => agregarNumero(4)}>4</BotonNumero>
                <BotonNumero value={5} onClick={() => agregarNumero(5)}>5</BotonNumero>
                <BotonNumero value={6} onClick={() => agregarNumero(6)}>6</BotonNumero>
                <BotonNumero value={7} onClick={() => agregarNumero(7)}>7</BotonNumero>
                <BotonNumero value={8} onClick={() => agregarNumero(8)}>8</BotonNumero>
                <BotonNumero value={9} onClick={() => agregarNumero(9)}>9</BotonNumero>
                <BotonNumero value={'*'} onClick={() => agregarNumero('*')}>*</BotonNumero>
                <BotonNumero value={0} onClick={() => agregarNumero(0)}>0</BotonNumero>
                <BotonNumero value={'#'} onClick={() => agregarNumero('#')}>#</BotonNumero>
            </DivTnumerico>
            <div className='ContenedorIconoCall'>
                <BotonCall><BsFillTelephoneFill size={"20pt"} onClick={() => props.onCall(numero)} /></BotonCall>
            </div>

        </DivContenedorTnumerico>
    );
}

export default Tnumerico;