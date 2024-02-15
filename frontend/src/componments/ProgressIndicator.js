import React from 'react';
import './ProgressIndicator.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressIndicator() {
    return (<>
        <div style={{width: "100px", height: "100px"}}>
            <CircularProgressbarWithChildren
                value={60}
                strokeWidth={12}
                styles={buildStyles({
                    pathColor: `#32519E`,
                    textColor: '#32519E',
                    trailColor: '#93ABE5',
                    textSize: "21px",
                    textFontFamily: "Roboto",
                })}
            >
                <p class="text">30/50</p>
            </CircularProgressbarWithChildren>
        </div>
        </>
    );
}

export default ProgressIndicator;