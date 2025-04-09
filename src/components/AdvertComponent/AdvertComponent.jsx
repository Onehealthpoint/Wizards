import React from 'react';

export const GoogleAdbanner = () => {
    return (
        <div className='w-full'>
            <ins 
                className='adsbygoogle block w-[728px] h-[90px] mx-auto'
                data-ad-client="ca-pub-3513970938688112"
                data-ad-slot="5549150624"
                alt='Advert'>
            </ins>
        </div>
    );
}

const Adbanner = () => {
    const AdList = [
        "/Images/Ad1.gif", 
        "/Images/Ad2.gif"
    ];
    const index = Math.floor(Math.random() * AdList.length);
    const Ad = AdList[index];

    return (
        <div className='w-dvw'>
            <GoogleAdbanner />
            <div className='w-[728px] h-[90px] bg-white mx-auto'>
                <img src={Ad} alt="Advert" className='w-full h-full object-cover' />
            </div>
        </div>
    );
}

export default Adbanner;
