import React from 'react';
import Heading5 from './Heading5';
import './ReviewBarChart.css'

function ReviewBarChart({ studying, recapping, notStarted, view }) {
    const totalCards = studying + recapping + notStarted;
    const studyingPercentage = (studying / totalCards) * 100;
    const recappingPercentage = (recapping / totalCards) * 100;
    const notStartedPercentage = (notStarted / totalCards) * 100;

    return (
        <div className={view == "mobile" ? 'bar-chart-wrapper-mobile' : 'bar-chart-wrapper'}>
            <div className='not-started-bar' style={{width: notStartedPercentage + '%'}}>
                {notStarted != 0 ? <Heading5 text={notStarted + " cards"} style={{color: "#FFFFFF"}}/> : <></>}
            </div>

            <div className='studying-bar' style={{width: studyingPercentage + '%'}}>
                {studying != 0 ? <Heading5 text={studying + " cards"} style={{color: "#FFFFFF"}}/> : <></>}
            </div>

            <div className='recapping-bar' style={{width: recappingPercentage + '%'}}>
                {recapping != 0 ? <Heading5 text={recapping + " cards"} style={{color: "#FFFFFF"}}/> : <></>}
            </div>
        </div>
    );
}

export default ReviewBarChart;