import { createPortal } from 'react-dom'

import '../modals.css'
import './confirm_modal.css'
import { useScrollLock } from '@/shared/lib/useScrollLock'

const ConfirmModal = ({
  mode,
  isOpen,
  onClose,
  title,
  message,
  warningText,
  onConfirm,
  onOpenUnderConstruction, //- ВРЕМЕННО
}) => {
  useScrollLock(isOpen)

  if (!isOpen) return null

  return createPortal(
    <div
      className='modal'
      onClick={onClose}
    >
      <div
        className='modal__content modal__wrapper confirm-modal'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal__btn-close'
          onClick={onClose}
        >
          <svg
            width='38'
            height='38'
            viewBox='0 0 38 38'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.67278 0L0 2.67278L16.3272 19L0 35.3272L2.67278 38L19 21.6728L35.3272 38L38 35.3272L21.6728 19L38 2.67278L35.3272 0L19 16.3272L2.67278 0Z'
              fill={
                mode
                  ? 'var(--dark-main-text)'
                  : 'var(--light-main-text)'
              }
            />
          </svg>
        </button>

        <h2 className='title'>{title}</h2>

        {warningText && (
          <p className='confirm-modal__warning'>
            <b>{warningText}</b>
          </p>
        )}

        <p className='confirm-modal__message'>{message}</p>

        <div className='modal__wrap-btn'>
          <button
            className={`btn btn-warning`}
            onClick={() => {
              onConfirm()
              onClose()
              onOpenUnderConstruction() //- ВРЕМЕННО
            }}
          >
            Да
          </button>
          <button
            className='btn'
            onClick={onClose}
          >
            Нет
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ConfirmModal
