import React from 'react'
import Iframe from 'react-iframe';
import './Footer.css'
export default function Footer() {
  return (
    <>
      <div id="Footer">
        <div id="Footer-Component-1">
          <h3><span>Bancroft Auto </span>Locksmiths</h3>

          <div className='Divider-Text3'>Looking for the best Plates on the market then you have come to the right place...
                    Car Plates Direct, a leading plate maker ..offering you the style and flexibility you want, at the right price.
            </div>
        </div>
        <div id="Footer-Component-2">
          <h3><span>Bancroft Auto </span>Locksmiths</h3>
        </div>
        <div id="Footer-Component-3">
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9813.707126822095!2d-0.7884601!3d52.0537522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877006436cdf543%3A0x89da46a1b548beb3!2sBancroft%20Auto%20Locksmiths!5e0!3m2!1sen!2s!4v1686868263232!5m2!1sen!2s"
            width="400"
            height="300"
            frameBorder="0"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      </>
      )
}
