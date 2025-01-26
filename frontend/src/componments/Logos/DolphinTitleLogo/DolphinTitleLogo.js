import Image from '../../Image';
import Header from '../../Text/Header';
import Paragraph from '../../Text/Paragraph';
const DolphinTitleLogo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
      <Image height="40px" width="40px" minWidth="40px" />
      <Header
        text="Dolphin Flashcards"
        style={{
          fontSize: '16px',
        }}
      />
    </div>
  );
};

export default DolphinTitleLogo;
