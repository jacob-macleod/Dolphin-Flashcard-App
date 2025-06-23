import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import FolderTreeView from '../../FolderTreeView';
import Paragraph from '../../../componments/Text/Paragraph';
import ErrorText from '../../../componments/Text/ErrorText';
import apiManager from '../../../api/Api';
import { getCookie } from '../../../api/Authentication';
import '../MoveFolderDialogue/MoveFolderDialogue.css';
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function ImportFromAnkiDialogue({ visible, setVisible, view, setReload }) {
  const [selectedPath, setSelectedPath] = React.useState(null);
  const [filePath, setFilePath] = useState('');
  const [ankiFile, setAnkiFile] = useState(null);
  const [flashcardName, setFlashcardName] = useState('');
  const [flashcardDescription, setFlashcardDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageVisibility, setErrorMessageVisibility] = useState('none');
  const [loadingIconVisible, setLoadingIconVisible] = useState('visisnle'); // If null, loading icon shows
  const [loadEditFlashcardPage, setLoadEditFlashcardPage] = useState(false);

  const buttonStyle = {
    display: 'inline-grid',
    margin: view !== 'mobile' ? '0px 16px' : '8px 0px',
  };
  const flashcardID = visible.flashcardID;
  const currentPath = visible.path;

  function clearFormData() {
    setAnkiFile(null);
    setFilePath('');
    setFlashcardName('');
    setFlashcardDescription('');
    setErrorMessage(null);
    setErrorMessageVisibility('none');
  }

  // When component mounts, clear the form data to stop the form errors being shown
  useEffect(() => {
    clearFormData();
  }, []);

  // When the flashcard name is chaned using the input box
  const onFlashcardNameChange = (event) => {
    setFlashcardName(event.target.value);
  };

  // When the flashcard description is chaned using the input box
  const onFlashcardDescriptionChange = (event) => {
    setFlashcardDescription(event.target.value);
  };

  useEffect(() => {
    /* Generate an error message when the user clicks "Submit" */
    if (selectedPath === null) {
      setErrorMessage('Please select a folder!');
    } else if (flashcardName === '') {
      setErrorMessage('Please enter a name!');
    } else if (flashcardDescription === '') {
      setErrorMessage('Please enter a description!');
    } else {
      setErrorMessage(null);
    }
  }, [selectedPath, flashcardName, flashcardDescription]);

  function createSet() {
    setErrorMessageVisibility('block');
    if (errorMessage === null) {
      if (selectedPath != null) {
        setLoadingIconVisible(null);
        apiManager.createFlashcard(
          getCookie('jwtToken'),
          flashcardName,
          flashcardDescription,
          selectedPath,
          [],
          setLoadEditFlashcardPage
        );
      }
    }
  }

  function uploadAnkiPackage() {
    setErrorMessageVisibility('block');
    if (errorMessage === null) {
      if (selectedPath != null) {
        setLoadingIconVisible(null);
        apiManager.importFromAnki(
          ankiFile,
          getCookie('jwtToken'),
          flashcardName,
          flashcardDescription,
          selectedPath,
          setVisible,
          setReload,
          clearFormData
        );
      }
    }
  }

  useEffect(() => {
    if (loadEditFlashcardPage != false) {
      setLoadingIconVisible(false);
      window.open(
        '/edit-flashcard-set?flashcardName=' +
          flashcardName +
          '&folder=' +
          selectedPath +
          '&flashcardDescription=' +
          flashcardDescription +
          '&flashcardID=' +
          loadEditFlashcardPage.flashcardID,
        '_self'
      );
    }
  }, [loadEditFlashcardPage]);

  useEffect(() => {
    setLoadingIconVisible('visible');
  }, [visible]);

  return visible !== false ? (
    <div
      className={view != 'mobile' ? 'darken-background' : 'whiten-background'}
    >
      <motion.div
        className={
          view == 'desktop'
            ? 'popup-container'
            : view == 'tablet'
            ? 'popup-container-tablet'
            : 'popup-container-mobile'
        }
        initial={view !== 'mobile' ? 'hidden' : ''}
        animate={view !== 'mobile' ? 'visible' : ''}
        exit={view !== 'mobile' ? 'exit' : ''}
        variants={view !== 'mobile' ? dropIn : null}
        style={view !== 'mobile' ? { height: 'fit-content' } : null}
      >
        <Heading3 text="Upload Anki file (.apkg):" />
        <div>
          <input
            type="file"
            accept=".apkg"
            multiple={false}
            value={filePath}
            onChange={(e) => {
              setFilePath(e.target.value);
              setAnkiFile(e.target.files[0]);
            }}
          />
        </div>
        <Heading3 text="Choose a location:" />

        <div className="card-overview" style={{ cursor: 'pointer' }}>
          <FolderTreeView
            visible={visible}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
          />
        </div>

        <Heading3 text="Choose other details:" />

        <div
          className={
            view !== 'mobile' ? 'input-container' : 'input-container-mobile'
          }
          style={{
            display: view == 'mobile' ? 'block' : 'flex',
            marginBottom: '4%',
          }}
        >
          <Paragraph
            text="Name: "
            style={{
              marginRight: view === 'mobile' ? '0px' : '20%',
              textAlign: view === 'mobile' ? 'left' : 'center',
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Folder name..."
            value={flashcardName}
            onChange={onFlashcardNameChange}
            style={{ width: 'calc(100% - 32px)' }}
          />
        </div>

        <div
          className={
            view !== 'mobile' ? 'input-container' : 'input-container-mobile'
          }
        >
          <Paragraph
            text="Description: "
            style={{
              marginRight: view === 'mobile' ? '0px' : '10%',
              textAlign: view === 'mobile' ? 'left' : 'center',
            }}
          />
          <textarea
            cols="40"
            rows="5"
            style={{ resize: 'none', width: 'calc(100% - 32px)' }}
            className="input"
            placeholder="Folder description"
            value={flashcardDescription}
            onChange={onFlashcardDescriptionChange}
          />
        </div>

        <ErrorText
          text={errorMessage}
          style={{ display: errorMessageVisibility }}
        />

        <div
          className={
            view !== 'mobile' ? 'button-container' : 'button-container-mobile'
          }
        >
          <GhostButton
            text="Cancel"
            onClick={() => {
              setErrorMessageVisibility('none');
              setVisible(false);
            }}
            style={buttonStyle}
            view={view}
          />
          <Button
            text="Upload"
            onClick={uploadAnkiPackage}
            style={buttonStyle}
            view={view}
          />
        </div>

        <div className={'loading-icon-wrapper'}>
          <DelayedElement child={<></>} childValue={loadingIconVisible} />
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default ImportFromAnkiDialogue;
