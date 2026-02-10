import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import GhostButton from '../../../componments/GhostButton';
import Button from '../../../componments/Button';
import Heading3 from '../../../componments/Text/Heading3/Heading3';
import Paragraph from '../../../componments/Text/Paragraph';
import ErrorText from '../../../componments/Text/ErrorText';
import apiManager from '../../../api/Api';
import {getCookie} from '../../../api/Authentication';
import '../MoveFolderDialogue/MoveFolderDialogue.css'
import '../Modal.css';
import DelayedElement from '../../DelayedElement';
import { dropIn } from '../../../animations/animations';

function CreateNewSharedFolderPopup({ visible, setVisible, view, setReload }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageVisibility, setErrorMessageVisibility] = useState("none");
    const [loadingIconVisible, setLoadingIconVisible] = useState("visible"); // If null, loading icon shows
    const buttonStyle = {
        display: "inline-grid",
        margin: "0px 16px"
    }

    useEffect(() => {
      setLoadingIconVisible("visible");
    }, [visible]);

      return (
        visible !== false ?
        <div className={view != "mobile" ? 'darken-background' : 'whiten-background'}>
            <motion.div
              className={view == "desktop" ? "popup-container" : view == "tablet" ? "popup-container-tablet" : "popup-container-mobile"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              style={view !== "mobile" ? {height: "fit-content"} : null}
            >
                <Heading3 text="Create New Shared Folder:" />

                <ErrorText text={errorMessage} style={{ display: errorMessageVisibility}} />

                <div className="input-container" style={{ marginBottom: "16px" }}>
                    <Paragraph text="Name: " style={{ display: "flex", alignItems: "center", marginRight: "8px" }} />
                    <input type="text" className="input"/>
                </div>
                <div className="input-container" >
                    <Paragraph text="Description: " style={{ display: "flex", alignItems: "center", marginRight: "8px" }} />
                    <input type="text" className="input" style={{height: "40px"}}/>
                </div>

                <div className='button-container'>
                    <GhostButton text="Cancel" onClick={() => {setErrorMessageVisibility("none"); setVisible(false)}} style={buttonStyle} />
                    <Button text="Create" style={buttonStyle} onClick={() => {window.location.href = "/CreatedSharedFolder";}} />
                </div>

                <div className={"loading-icon-wrapper"}>
                  <DelayedElement child={<></>} childValue={loadingIconVisible} />
                </div>
            </motion.div>
        </div>
        : null
    );
}

export default CreateNewSharedFolderPopup;
