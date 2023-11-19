import react, { useState } from 'react';
import TitleCataComponente from '../../Title/Title';
import './Footer.css'

const FooterCataComponente = () => {
    return (<>
    <footer className='footer text-white fixed-bottom'>
        <div className='cotainer'>
            <div className='row'>
                <div className='col-lg-12'>
                    <TitleCataComponente title={'© 2023 Catalina project'} size={'h6'}></TitleCataComponente>
                </div>
            </div>
        </div>
    </footer>
    </>)
}

export default FooterCataComponente