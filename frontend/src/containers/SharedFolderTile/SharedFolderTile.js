import React from "react";
import WhiteOverlay from "../../componments/WhiteOverlay/WhiteOverlay";
import Paragraph from "../../componments/Text/Paragraph/Paragraph";
import Button from "../../componments/Button/Button";

const SharedFolderTile = ({ folder, onViewSharedFolder }) => {
  if (!folder) {
    return null;
  }

  return (
    <WhiteOverlay
      style={{
        paddingTop: "8px",
        marginBottom: "16px",
        width: "calc(100% - 32px)",
      }}
      innerOverlayClassName="shared-folder-wrapper flashcards-page"
    >
      <div className="shared-folder-element-wrapper">
        <Paragraph text={folder.name} style={{ textAlign: "middle" }} />
        <Button
          text="View"
          onClick={() => onViewSharedFolder(folder.id)}
          style={{ width: "100%" }}
        />
      </div>
    </WhiteOverlay>
  );
};

export default SharedFolderTile;
