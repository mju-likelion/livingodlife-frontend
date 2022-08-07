import React from 'react';
import '../Modal/Modal.scss';
import imgArrow from '../../image/icon_arrow.png';

const Modal = (props) => {
  const {open, close, title} = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header className='GmarketS'>
            {title}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className='GmarketS'>{props.children}</div>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
