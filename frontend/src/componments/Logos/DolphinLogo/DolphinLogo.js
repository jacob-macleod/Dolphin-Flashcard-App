import Image from '../../Image';
function DolphinLogo({ height="40px", width="40px", minWidth="40px", paddingTop="", paddingBottom="", paddingLeft="", paddingRight="" }) {
  return <Image
    height={height}
    width={width}
    minWidth={minWidth}
    paddingBottom={paddingBottom}
    paddingLeft={paddingLeft}
    paddingRight={paddingRight}
    paddingTop={paddingTop}
  />;
};

export default DolphinLogo;
