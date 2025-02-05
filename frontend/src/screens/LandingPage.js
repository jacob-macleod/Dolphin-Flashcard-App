import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import '../App.css';
import BlobBackground from '../containers/BlobBackground';
import GridContainer from '../componments/GridContainer';
import GridItem from '../componments/GridItem';
import Header from '../componments/Text/Header';
import Subheader from '../componments/Text/Subheader';
import '../componments/Text/Text/Text.css';
import '../componments/Text/Link/Link.css';
import '../componments/Text/BoldParagraph/Bold.css';
import Paragraph from '../componments/Text/Paragraph';
import MailChimpWidget from '../containers/MailChimpWidget';
import Mailchimp from '../componments/Mailchimp/Mailchimp';
import DolphinTitleLogo from '../componments/Logos/DolphinTitleLogo/DolphinTitleLogo';
import goals from '../static/goals.png';
import coffeeTable from '../static/coffee-table.png';
import cardSearch from '../static/card-search.png';
import heatmap from '../static/heatmap.png';
import card from '../static/card.png';
import cardEditor from '../static/card-editor.png';
import Image from '../componments/Image';
import BentoPanel from '../containers/BentoPanel/BentoPanel';
import Button from '../componments/Button';
import ErrorText from '../componments/Text/ErrorText';
import DevSection from '../componments/DevSection';
import LandingPageFooter from '../componments/LandingPageFooter';
import MailChimpInput from '../containers/MailChimpWidget/MailChimpInput';
import ProjectProgress from '../componments/ProjectProgress';
import SignInButton from '../componments/SignInButton';

function FeaturesBento({
  subheaderText,
  paragraphText,
  imageUrl,
  imageWidth,
  imageHeight,
  reverse,
  view,
  setJwtToken,
}) {
  const image = (
    <Image
      width={imageWidth}
      minWidth="200px"
      height={imageHeight}
      url={imageUrl}
      objectFit="contain"
    />
  );

  const text = (
    <div
      style={{
        textAlign: 'start',
        margin: view === 'mobile' ? '0 20px' : '0 24px 32px 24px',
      }}
    >
      <Subheader text={subheaderText} />
      <Paragraph
        text={paragraphText}
        style={{
          color: '#616583',
          textAlign: 'start',
          lineHeight: '30px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <SignInButton setJwtToken={setJwtToken} />
      </div>
    </div>
  );
  return (
    <BentoPanel
      item1={reverse ? image : text}
      item2={reverse ? text : image}
      view={view}
    />
  );
}

function LandingPage({ setJwtToken }) {
  const title = 'Dolphin Flashcards';
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 878;
  const tabletBreakpoint = 1200;
  const view = width < mobileBreakpoint ? 'mobile' : 'desktop';

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Set the initial window size
    setWidth(window.innerWidth);

    // Set up the event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const coffeeTableDesktopSize = { width: '80%', height: '532px' };
  const coffeeTableTabletSize = { width: '100%', height: '310px' };
  const goalsDesktopSize = { width: '80%', height: '465px' };
  const goalsTabletSize = { width: '100%', height: '100%' };
  const heatmapDesktopSize = { width: '100%', height: '100%' };
  const heatmapTabletSize = { width: '100%', height: '100%' };
  const cardDesktopSize = { width: '100%', height: '100%' };
  const cardTabletSize = { width: '80%', height: '249px' };
  const cardSearchDesktopSize = { width: '100%', height: '100%' };
  const cardSearchTabletSize = { width: '80%', height: '310px' };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>

      <GridContainer
        layout="auto"
        classType="centered-grid-container"
        style={{ marginTop: view === 'mobile' ? '40px' : '120px' }}
      >
        <GridItem
          style={{
            textAlign: 'left',
            width: view === 'mobile' ? 0.8 * width : 0.6 * width,
            display: 'flex',
            flexDirection: view === 'mobile' ? 'column-reverse' : 'row',
            justifyContent: 'center',
            // justifyContent: 'center',
            gap: view === 'mobile' ? '40px' : '80px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              width: view === 'mobile' ? undefined : 0.29 * width,
            }}
          >
            <Image
              width={'100%'}
              minWidth="200px"
              height={'auto'}
              url={coffeeTable}
              objectFit="cover"
              paddingRight="0px"
              style={{ aspectRatio: '1/1', borderRadius: '16px' }}
            />
          </div>
          <div
            style={{
              width: view === 'mobile' ? undefined : 0.27 * width,
              height: '100%',
            }}
          >
            <DolphinTitleLogo />
            <Header
              text="Struggling to remember what you study?"
              style={{ fontWeight: 'bold', fontSize: '50px' }}
            />
            <Paragraph
              text="Flashcards can help, but they’re not fun to use. Dolphin Flashcards is being built from the ground up to actually make studying flashcards enjoyable - and even more effective! "
              style={{
                color: '#616583',
                textAlign: 'start',
                lineHeight: '30px',
              }}
            />

            <Paragraph
              text="Sign up to our newsletter to receive updates and be notified when we launch."
              style={{
                color: '#616583',
                textAlign: 'start',
                lineHeight: '30px',
              }}
            />
            <MailChimpInput />
          </div>
        </GridItem>
        {/* Bento Panels */}
        <GridItem
          style={{
            margin: '0 auto',
            height: 'max-content',
            width: view === 'mobile' ? 0.8 * width : 0.6 * width,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <FeaturesBento
            subheaderText="Set goals, view them and see your progress - all in one place."
            paragraphText="Setting goals? Important.
                  Tracking them and achieving them? Even more. With Dolphin Flashcards
                  you can easily view and track your goals so you never have to explain
                  why you missed your deadline."
            imageUrl={goals}
            imageWidth={'100%'}
            imageHeight={
              width < tabletBreakpoint
                ? goalsTabletSize.height
                : goalsDesktopSize.height
            }
            reverse={false}
            view={view}
            setJwtToken={setJwtToken}
          />
          <FeaturesBento
            subheaderText="Track & analyse your progress over time"
            paragraphText="With an integrated view
                providing information on your streak and XP,
                Dolphin Flashcards makes it easy to be consistent with studying."
            imageUrl={heatmap}
            imageWidth={
              width < tabletBreakpoint
                ? heatmapTabletSize.width
                : heatmapDesktopSize.width
            }
            imageHeight={
              width < tabletBreakpoint
                ? heatmapTabletSize.height
                : heatmapDesktopSize.height
            }
            reverse={true}
            view={view}
            setJwtToken={setJwtToken}
          />
          <FeaturesBento
            subheaderText="Memorise effectively with our spaced-repetition algorithm"
            paragraphText="Studying flashcards is vital.
                But remembering them long-term? Even more.
                That’s why we’ve built an effective spaced-repetition system to
                help you remember what you study long into the future."
            imageUrl={card}
            imageWidth={
              width < tabletBreakpoint
                ? cardTabletSize.width
                : cardDesktopSize.width
            }
            imageHeight={
              width < tabletBreakpoint
                ? cardTabletSize.height
                : cardDesktopSize.height
            }
            reverse={false}
            view={view}
            setJwtToken={setJwtToken}
          />
          <FeaturesBento
            subheaderText="Add images, colors and more to your flashcards with our integrated editor"
            paragraphText="Our platform allows you to add images, colors, lists, bullet points
                and more to your flashcards, so you can improve your recall by introducing visuals
                to your flashcards."
            imageUrl={cardEditor}
            imageWidth={
              width < tabletBreakpoint
                ? cardTabletSize.width
                : cardDesktopSize.width
            }
            imageHeight={'auto'}
            reverse={true}
            view={view}
            setJwtToken={setJwtToken}
          />
          <FeaturesBento
            subheaderText="Search through our array of community-generated flashcard sets"
            paragraphText="Can’t be bothered to make your own flashcards? See if someone else has made something similar already."
            imageUrl={cardSearch}
            imageWidth={
              width < tabletBreakpoint
                ? cardSearchTabletSize.width
                : cardSearchDesktopSize.width
            }
            imageHeight={'auto'}
            reverse={false}
            view={view}
            setJwtToken={setJwtToken}
          />
          <DevSection view={view} />
          <div>
            <Header text="Sign up today!" />
            <div
              style={{
                width: view === 'mobile' ? '100%' : 0.3 * width,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              <Paragraph
                text="Sign up to our newsletter today to get updates about dolphin flashcards - and to be notified when we launch!"
                style={{
                  color: '#616583',
                  lineHeight: '30px',
                }}
              />

              <MailChimpInput />
            </div>
          </div>
          <ProjectProgress view={view} />
          <div
            style={{
              textAlign: 'start',
              width: '100%',
            }}
          >
            <Header text={'Frequently Asked Questions'} />
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: view === 'mobile' ? '1fr' : '1fr 1fr',
                columnGap: '50px',
              }}
            >
              <div>
                <Subheader
                  text={'How can I get involved?'}
                  style={{ fontSize: '24px' }}
                />
                <Paragraph
                  text={'Lorem ispum dolor'}
                  style={{
                    color: '#616583',
                    textAlign: 'start',
                    lineHeight: '24px',
                    marginTop: '-10px',
                    width: '90%',
                  }}
                />
              </div>
              <div>
                <Subheader
                  text={'How much will it cost?'}
                  style={{ fontSize: '24px' }}
                />
                <Paragraph
                  text={'Lorem ispum dolor'}
                  style={{
                    color: '#616583',
                    textAlign: 'start',
                    lineHeight: '24px',
                    marginTop: '-10px',
                    width: '90%',
                  }}
                />
              </div>
              <div>
                <Subheader
                  text={'What makes Dolphin different to competitors?'}
                  style={{ fontSize: '24px' }}
                />
                <Paragraph
                  text={'Lorem ispum dolor'}
                  style={{
                    color: '#616583',
                    textAlign: 'start',
                    lineHeight: '24px',
                    marginTop: '-10px',
                    width: '90%',
                  }}
                />
              </div>
              <div>
                <Subheader
                  text={'Why should it be fun to learn flashcards?'}
                  style={{ fontSize: '24px' }}
                />
                <Paragraph
                  text={'Lorem ispum dolor'}
                  style={{
                    color: '#616583',
                    textAlign: 'start',
                    lineHeight: '24px',
                    marginTop: '-10px',
                    width: '90%',
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <Header text="So, what are you waiting for?" />
            <div
              style={{
                width: view === 'mobile' ? '100%' : 0.3 * width,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                margin: '0 auto',
              }}
            >
              <Paragraph
                text="Sign up to our newsletter today to get updates about dolphin flashcards - and to be notified when we launch!"
                style={{
                  color: '#616583',
                  lineHeight: '30px',
                }}
              />

              <MailChimpInput />
            </div>
          </div>
          <LandingPageFooter width={width} view={view} />
        </GridItem>
      </GridContainer>
      <BlobBackground />
    </>
  );
}

export default LandingPage;
