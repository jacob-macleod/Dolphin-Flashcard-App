import {React, useState, useEffect} from 'react';
import Heading5 from '../componments/Heading5';
import Button from '../componments/Button';
import WhiteOverlay from '../componments/WhiteOverlay';
import ProgressIndicator from '../componments/ProgressIndicator';
import { calculateStreak } from '../api/Api';
import { getCookie } from '../api/Authentication';
import '../App.css';

function GoalsWidget () {
    const [streak, setStreak] = useState(null)
    const [totalXP, setTotalXP] = useState("6093")
    const [weeklyXP, setWeeklyXP] = useState("72")

    const panelTitleStyle = {
        padding: "8px"
      }
      const panelTitleStyle2 = {
        padding: "0px",
        width: "100%"
      }
      const overlayStyle = {
        marginLeft: "16px",
        marginRight: "0px",
        width: "90%"
      }

      useEffect(() => {
        calculateStreak(getCookie("userID"), setStreak)
      }, []);

    return <>
    <WhiteOverlay style={overlayStyle}>
        <Heading5 text="Goals" style={panelTitleStyle} />
        <Button text="+ New Goal" style={{}} />
        <ProgressIndicator />
    </WhiteOverlay>
    </>
}

export default GoalsWidget;