import successAuth from '../images/Union.svg';
import errorAuth from '../images/errorAuth.svg';


export function InfoTooltip(props) {

  let tooltipMessage = 'Вы успешно зарегистрировались!';
  let tooltipIcon = successAuth

  if (!props.response) {
    tooltipMessage = 'Что-то пошло не так! Попробуйте ещё раз.'
    tooltipIcon = errorAuth;
  }

  return (
    <div className={`popup popup_type_info-tooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__info-tooltip">
          <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
          <img className="popup__icon" src={tooltipIcon} alt={tooltipMessage}/>
          <p className="popup__message">{tooltipMessage}</p>
        </div>
      </div>
    </div>
  )
}