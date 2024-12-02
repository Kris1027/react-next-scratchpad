import ReactDom from 'react-dom';

export const Modal = ({ children, setIsFormShown }) => {
    return ReactDom.createPortal(
        <div className='modalOverlay' onClick={() => setIsFormShown(false)}>
            <div className='modalContent' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};
