import React from 'react';
import '../Modal/Modal.scss';
import imgArrow from '../../image/icon_arrow.png';

const Modal = (props) => {
  const { open, close, title, button } = props;

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
          <main className='GmarketS'>{props.children}</main>
          <footer>
            <button className="button GmarketS">
              {button}
              <div id='circle'><img src={imgArrow} id='imgArrow'></img></div>
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
