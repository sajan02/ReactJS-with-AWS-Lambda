import * as React from "react";
import * as ReactDOM from "react-dom";
import FullScreenSpinner from "../Spinner";
import Modal from "../Modal";
import UserDetailForm from "../UserDetailForm";


// Blurs the childrens in the body
export const blurChildren = (body, blur) => {
  body.childNodes.forEach((c) => {
    if (!(c instanceof HTMLElement)) return;
    c.style.filter = blur ? "blur(3px)" : "";
  });
};
  
// Utility function for rendering modal component with asyn behaviour
export const showDialogAsync = async (
  nodeFn,
  doBlur,
  modalId = "",
  parentId = ""
) => {
  let removeSelf = (x) => x;
  var ele = document.body;
  if (parentId) {
    ele = document.getElementById(parentId);
  }
  const promise = new Promise((resolve, reject) => {
    if (doBlur) {
      blurChildren(ele, doBlur);
    }
    const container = ele.appendChild(document.createElement("div"));
    if (modalId) container.id = modalId;
    removeSelf = () => {
      ReactDOM.unmountComponentAtNode(container);

      if (doBlur) {
        blurChildren(ele, false);
      }

      container.remove();
    };
    ReactDOM.render(nodeFn(resolve, reject), container);
  });
  promise.then(removeSelf, removeSelf);
  return promise;
};

// utility function to display differnet components in a modal
export const showModal = async (
  node,
  modalId = "",
  className = "",
  closeButtonName = "",
  extraClass = "",
  beforeClose = () => {},
  title = ""
) =>
  showDialogAsync(
    (resolve, reject) => (
      <Modal
        onConfirm={async () => {
          resolve();
          beforeClose && (await beforeClose());
        }}
        modalId={modalId}
        onCancel={reject}
        isOpen
        className={className}
        closeButtonName={closeButtonName}
        extraClass={extraClass}
        title={title}
      >
        {node}
      </Modal>
    ),
    true
  );

  // Utility function to render full-screen spinner
export const showFullScreenSpinner = async (fn, parentId = "") =>
showDialogAsync(
  (resolve, reject) => (
    <FullScreenSpinner
      functionReturningPromise={fn}
      onResolve={resolve}
      onReject={reject}
    />
  ),
  true,
  "",
  parentId
);

export const triggerCloseModal = (_) => {
  let el = document.getElementById("close-custom-modal");
  if (el) {
    el.click();
  }
};

export const showUserDetailsForm = async (
    callback = () => {},
    mode = "Submit",
    title = "User Details",
    data = {
      name: "",
      status: "",
      email: ""
    }
  ) =>
    showModal(
      <UserDetailForm mode={mode} userDetails={data} callback={callback} />,
      "form-modal",
      "",
      "",
      "user-detail-form-modal",
      null,
      title
    );