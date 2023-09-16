import styles from './TermsAndConditionsModal.module.scss';
function TermsAndConditionsModal(props: any) {
  function dismissModal() {
    // @ts-ignore
    window.tec_modal.close();
  }
  return (
    <dialog id="tec_modal" className="modal" {...props}>
      <form method="dialog" className="modal-box flex flex-col">
        <h3 className="font-bold text-lg mt-2 mb-4 text-center pb-2">
          Termos e condições - English Helper
        </h3>
        <div className={styles.termsDiv}>
          <p className="my-0">termos</p>
        </div>
        <button className="btn btn-primary mt-4 mx-auto" onClick={dismissModal}>
          Fechar
        </button>
      </form>
      <form method="dialog" className={`modal-backdrop ${styles.backdrop}`}>
        <button>close</button>
      </form>
    </dialog>
  );
}

export default TermsAndConditionsModal;
