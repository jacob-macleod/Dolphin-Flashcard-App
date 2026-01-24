import WhiteOverlay from "../../componments/WhiteOverlay/WhiteOverlay";
import Heading4 from "../../componments/Text/Heading4/Heading4";
import Paragraph from "../../componments/Text/Paragraph/Paragraph";
import Button from "../../componments/Button/Button";
import "./SharedFoldersOverview.css";

const SharedFoldersOverview = ({
  onCreateNewSharedFolder,
  onViewSharedFolder,
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

      <WhiteOverlay
        style={{
          paddingTop: "8px",
          marginBottom: "16px",
          width: "calc(100% - 32px)",
        }}
        innerOverlayClassName="shared-folder-wrapper flashcards-page"
      >
        <div className="shared-folder-element-wrapper">
          <Paragraph text={"My shared folder"} style={{ textAlign: "middle" }} />
          <Button
            text="View"
            onClick={onViewSharedFolder}
            style={{ width: "100%" }}
          />
        </div>
      </WhiteOverlay>

      <Button
        text="New Shared Folder"
        onClick={onCreateNewSharedFolder}
        style={{ width: "calc(100% - 32px)" }}
      />
    </WhiteOverlay>
  );
};

export default SharedFoldersOverview;
