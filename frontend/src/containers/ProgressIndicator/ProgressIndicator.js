import React from 'react';
import './ProgressIndicator.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressIndicator({start, end}) {

    return (<>
        <div style={{width: "130px", height: "130px", alignContent: "center"}}>
            <CircularProgressbarWithChildren
                value={(start/end)*100}
                strokeWidth={12}
                styles={buildStyles({
                    pathColor: `#32519E`,
                    textColor: '#32519E',
                    trailColor: '#93ABE5',
                    textSize: "21px",
                    textFontFamily: "Roboto",
                })}
            >
                <p className="text">{start}/{end}</p>
            </CircularProgressbarWithChildren>
        </div>
        </>
    );
}

export default ProgressIndicator;