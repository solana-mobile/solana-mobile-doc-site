import React, { useState } from 'react';
import styles from './styles.module.css';
import CopyButton from '@theme/CodeBlock/CopyButton';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title?: string;
};

// Reusable Modal Component
const TermsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  title = 'Terms & Conditions'
}) => {
  const [hasChecked, setHasChecked] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  if (!isOpen) return null;

  const handleAcceptClick = () => {
    if (hasChecked) {
      onAccept();
      setShowValidationError(false);
    } else {
      setShowValidationError(true);
    }
  };

  // Hardcoded terms and conditions text
  const termsContent = `
    By accessing the reflector URL, you agree to the following terms and conditions:
    
    1. You will use this resource solely for authorized testing or educational purposes.
    2. You will not use this resource to perform any illegal activities or to harm others.
    3. You will not share this URL with unauthorized individuals.
    4. You understand that your activities may be logged and monitored.
    5. You understand that misuse of this resource may result in termination of access and potential legal consequences.
    
    This resource is provided "as is" without warranty of any kind, express or implied.
  `;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.termsText}>{termsContent}</div>
        </div>
        <div className={styles.modalFooter}>
          <label className={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              checked={hasChecked}
              onChange={() => {
                setHasChecked(!hasChecked);
                if (!hasChecked) setShowValidationError(false);
              }}
            />
            <span>I have read, understood, and agree to the terms and conditions.</span>
          </label>
          {showValidationError && (
            <div className={styles.validationError}>
              You must accept to view the URL.
            </div>
          )}
          <div className={styles.modalActions}>
            <button 
              className={styles.cancelButton} 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className={styles.acceptButton}
              onClick={handleAcceptClick}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Expandable URL Component
export const HiddenUrl: React.FC<{
  url: string;
  displayText?: string;
  modalTitle?: string;
}> = ({ 
  url, 
  displayText = "View Reflector URL",
  modalTitle = "Terms & Conditions"
}) => {
  const [showModal, setShowModal] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setShowModal(false);
  };

  return (
    <div className={styles.expandableContainer}>
      <div 
        className={styles.header} 
        onClick={() => !accepted && setShowModal(true)}
        role="button"
        tabIndex={0}
      >
        <span className={`${styles.chevron} ${accepted ? styles.chevronExpanded : ''}`}>▶</span>
        <span>{displayText}</span>
      </div>
      
      {accepted && (
        <div className={styles.expandedContent}>
          <div className={styles.urlContainer}>
            <span className={styles.urlText}>{url}</span>
            <div className={styles.buttonGroup}>
              <CopyButton className={styles.codeButton} code={url} />
            </div>
          </div>
        </div>
      )}

      <TermsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAccept={handleAccept}
        title={modalTitle}
      />
    </div>
  );
};

export default HiddenUrl;