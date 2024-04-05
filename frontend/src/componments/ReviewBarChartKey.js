import React from 'react';
import Heading5 from './Heading5';
import './ReviewBarChartKey.css'

function ReviewBarChartKey({ view }) {
    const notStartedColor = "#32519E";
    const studyingColor = "#6A84C5";
    const recappingColor = "#93ABE5";

    const headingStyle = {
        paddingLeft: "8px",
        paddingRight: "8px"
    }

    return (
        <div className={view == "desktop" ? 'key-wrapper' : 'key-wrapper-mobile'}>
            <div className='color-box' style={{background: notStartedColor}}></div>
            <Heading5 text="Not Started" style={headingStyle} />

            <div className='color-box' style={{background: studyingColor}}></div>
            <Heading5 text="Studying" style={headingStyle} />

            <div className='color-box' style={{background: recappingColor}}></div>
            <Heading5 text="Recappping" style={headingStyle} />
        </div>
    );
}

export default ReviewBarChartKey;