import { createPortal } from "react-dom"
import { useEffect } from "react"

import "../modals.css"
import "./under_construction_modal.css"
import { useScrollLock } from "@/shared/lib/useScrollLock"
import mascot from "/images/mascot_sorry.png"

const UnderConstructionModal = ({ mode, isOpen, onClose }) => {
  useScrollLock(isOpen)

  // Запрещаю скролл при открытой модалке
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content content-under-constructio"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__btn-close" onClick={onClose}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.67278 0L0 2.67278L16.3272 19L0 35.3272L2.67278 38L19 21.6728L35.3272 38L38 35.3272L21.6728 19L38 2.67278L35.3272 0L19 16.3272L2.67278 0Z"
              fill={mode ? "var(--dark-main-text)" : "var(--light-main-text)"}
            />
          </svg>
        </button>
        <p className="modal__text">
          Ой! <br />
          Эта часть сайта ещё в разработке, <br />
          но совсем скоро заработает. <br />
          Спасибо за понимание!
        </p>
        <img
          className="modal__img"
          src={mascot}
          alt="Эта часть сайта ещё в разработке"
        />
      </div>
    </div>,
    document.body // рендерю в body, чтобы не мешали родительские стили
  )
}

export default UnderConstructionModal
