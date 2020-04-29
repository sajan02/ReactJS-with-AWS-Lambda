import * as React from "react";
import ReactModal from "react-modal";
import "./index.scss";

export default class Modal extends React.PureComponent {

  closeModalListener = (evt) => {
    const flyoutElement = document.getElementById(this.props.modalId);
    let targetElement = evt.target;

    do {
        if (targetElement === flyoutElement) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    this.triggerCloseModal();
  }

  triggerCloseModal = (_) => {
      let el = document.getElementById('close-custom-modal');
      if (el) {
          el.click();
      }
  }

  componentDidMount() {
      document.addEventListener('click', this.closeModalListener, true);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.closeModalListener, true);
  }

  render() {
    return (
      <div className={`custom-modal-container`}>
        <ReactModal
          contentLabel="Modal"
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onCancel}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          className={{
            base: "custom-modal custom-modal--full-screen",
            afterOpen: "custom-modal_after-open",
            beforeClose: "custom-modal_before-close"
          }}
          overlayClassName={{
            base: `custom-modal-overlay full-screen-custom-modal ${this.props.className}`,
            afterOpen: "custom-modal-overlay_after-open",
            beforeClose: "custom-modal-overlay_before-close"
          }}
          closeTimeoutMS={500}
        >
          <button id="close-custom-modal" onClick={this.props.onCancel} style={{ display: this.props.closeButtonName ? 'auto' : 'none'}}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <div className={`custom-modal-container ${this.props.extraClass}`}>
            <h4 className="custom-modal-title">{this.props.title}</h4>
            <div id={this.props.modalId}>
              {React.cloneElement(
                this.props.children,
                { onConfirm: this.props.onConfirm, onCancel: this.props.onCancel }
              )}
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
