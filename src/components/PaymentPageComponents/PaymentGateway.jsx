import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const PaymentGateway = ({amount, shippingFee}) => {
    const host = window.location.origin;
    const protocol = window.location.protocol;

    const [signature, setSignature] = useState("");
    const [formData] = useState({
        amount: amount,
        tax_amount: "0",
        total_amount: amount + shippingFee,
        transaction_uuid: uuidv4(),
        product_service_charge: "0",
        product_delivery_charge: shippingFee,
        product_code: "EPAYTEST",
        success_url: `${protocol}//${host}/paymentsuccess`,
        failure_url: `${protocol}//${host}/paymentfailure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        secret: "8gBm/:&EnhH.1/q",
    });
    
    // generate signature function
    const generateSignature = (
        total_amount,
        transaction_uuid,
        product_code,
        secret
    ) => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
        return hashedSignature;
    };
    
    // useeffect
    useEffect(() => {
        const { total_amount, transaction_uuid, product_code, secret } = formData;
        const hashedSignature = generateSignature(
            total_amount,
            transaction_uuid,
            product_code,
            secret
        );
    
        setSignature(hashedSignature);
    }, [formData]);

    return (
        <form id="esewaForm" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="hidden">
            <input type="hidden" id="amount" name="amount" value={formData.amount} required />
            <input type="hidden" id="tax_amount" name="tax_amount" value ={formData.tax_amount} required />
            <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
            <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
            <input type="hidden" id="product_code" name="product_code" value ={formData.product_code} required />
            <input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
            <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
            <input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
            <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} required />
            <input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
            <input type="hidden" id="signature" name="signature" value={signature} required />
            <button type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2" />
        </form>
    );
};

export default PaymentGateway;