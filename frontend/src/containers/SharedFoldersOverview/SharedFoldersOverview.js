import WhiteOverlay from "../../componments/WhiteOverlay/WhiteOverlay";
import Heading4 from "../../componments/Text/Heading4/Heading4";
import Button from "../../componments/Button/Button";
import SharedFolderTile from "../SharedFolderTile/SharedFolderTile";
import DelayedElement from "../DelayedElement";
import "./SharedFoldersOverview.css";

const SharedFoldersOverview = ({
  onCreateNewSharedFolder,
  onViewSharedFolder,
  sharedFolderData
}) => {
  return (
    <WhiteOverlay
      style={{
        height: "max-height",
        minWidth: "240px",
        padding: "0px",
        width: "100%",
        flex: "1",
      }}
      innerOverlayClassName="right-panel-wrapper flashcards-page"
      className="right-panel-overlay flashcards-page"
    >
      <Heading4
        text="Shared With You"
        style={{
          textAlign: "left",
          marginBottom: "16px",
          padding: "0px",
        }}
      />
      <DelayedElement
        child = {
          [...(sharedFolderData?.memberFolders || []), ...(sharedFolderData?.ownedFolders || [])].map(
            (folder) => (
              <SharedFolderTile
                key={folder.id}
                folder={folder}
                onViewSharedFolder={onViewSharedFolder}
              />
            )
          )
        }
        childValue={sharedFolderData}
      />
      <Button
        text="New Shared Folder"
        onClick={onCreateNewSharedFolder}
        style={{ width: "calc(100% - 32px)" }}
      />
    </WhiteOverlay>
  );
};

export default SharedFoldersOverview;
