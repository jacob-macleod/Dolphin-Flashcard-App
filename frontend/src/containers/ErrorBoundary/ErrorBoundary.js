import React, { Component } from "react"; // Removed redundant import
import { Helmet } from 'react-helmet';
import '../../App.css';
import BlobBackground from '../../containers/BlobBackground';
import GridContainer from '../../componments/GridContainer/GridContainer';
import GridItem from '../../componments/GridItem/GridItem';
import SidePanel from '../../containers/SidePanel/SidePanel';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import HamburgerBar from '../../containers/HamburgerBar/HamburgerBar';
import '../../componments/Text/Text/Text.css';
import '../../componments/Text/Link/Link.css';
import '../../componments/Text/BoldParagraph/Bold.css';
import Heading3 from '../../componments/Text/Heading3';
import Paragraph from '../../componments/Text/Paragraph';
import useWindowSize from '../../hooks/useWindowSize'; // Assuming you have a custom hook for this

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      mobileSidePanelVisible: false,
      view: this.getViewSize(),
      flashcardBoxHorizontalPadding: "16px"
    };
  }

  componentDidMount() {
    const view = this.getViewSize();
    const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";
    this.setState({ view, flashcardBoxHorizontalPadding });

    // Optionally, you can listen for window resize events to update view size dynamically
    window.addEventListener("resize", this.updateViewSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewSize);
  }

  getViewSize = () => {
    const mobileBreakpoint = 650;
    const tabletBreakpoint = 1090;
    const width = window.innerWidth;
    if (width <= mobileBreakpoint) return "mobile";
    if (width <= tabletBreakpoint) return "tablet";
    return "desktop";
  }

  updateViewSize = () => {
    const view = this.getViewSize();
    const flashcardBoxHorizontalPadding = view === "mobile" ? "8px" : "16px";
    this.setState({ view, flashcardBoxHorizontalPadding });
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service if needed
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, error, mobileSidePanelVisible, view, flashcardBoxHorizontalPadding } = this.state;

    if (hasError) {
      return (
        <div style={{ top: "0px" }}>
          <Helmet>
            <title>There was an error...</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
          <GridContainer layout={view !== "mobile" ? "240px auto" : "auto"} classType="two-column-grid">
            {view !== "mobile" && <SidePanel />}
            <GridItem
              style={{
                paddingLeft: flashcardBoxHorizontalPadding,
                paddingRight: flashcardBoxHorizontalPadding,
                paddingTop: "0px",
                width: view === "mobile" ? "100vw" : "",
                display: view === "mobile" ? "block" : "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {view === "mobile" && (
                <HamburgerBar 
                  menuVisible={mobileSidePanelVisible} 
                  setMenuVisible={visible => this.setState({ mobileSidePanelVisible: visible })} 
                  selectedItem="flashcards" 
                />
              )}
              <WhiteOverlay
                style={{
                  height: "max-content",
                  paddingBottom: view === "mobile" ? "80px" : "",
                  width: view === "desktop" ? "100%" : "calc(100% - 16px)",
                }}
              >
                <div style={{ maxWidth: "1200px", margin: "auto" }}>
                  <Heading3 text="We've run into an error..." />
                  <Paragraph text={error && error.message} />
                  <a className="link" href="/dashboard">Return to the dashboard</a>
                </div>
              </WhiteOverlay>
            </GridItem>
          </GridContainer>
          <BlobBackground />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
