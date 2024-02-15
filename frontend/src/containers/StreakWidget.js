import {React, useState, useEffect} from 'react';
import DelayedElement from '../componments/DelayedElement';
import Heading5 from '../componments/Heading5';
import WhiteOverlay from '../componments/WhiteOverlay';
import Header from '../componments/Header';
import { calculateStreak } from '../api/Api';
import Heading4 from '../componments/Heading4';
import { getCookie } from '../api/Authentication';
import '../App.css';

function StreakWidget () {
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
        <Heading5 text="Streak" style={panelTitleStyle} />
        <div style={{display: "inline-flex"}}>
        <DelayedElement child={<Header text={streak} style={{margin: "8px", marginTop: "0px"}}/>} childValue={streak} />
        <Heading4 color="blue" text="days" style={{justifyContent: "space-around", alignItems: "center", padding: "8px", paddingTop: "0px", paddingLeft: "0px"}}/>
        </div>
        <br></br>
        <div style={{display: "inline-flex", width: "100%"}}>
        <div style={{width:"50%"}}>
            <Heading5 text="Total XP" style={panelTitleStyle2} />
            <DelayedElement
            child={
                <Header text={totalXP} style={{marginTop: "8px", marginBottom: "8px"}} color='black'/>
            }
            childValue={totalXP}
            />
        </div>

        <div style={{width:"50%"}}>
            <Heading5 text="XP this week" style={panelTitleStyle2} />
            <DelayedElement
            child={
                <Header text={weeklyXP} style={{marginTop: "8px", marginBottom: "8px"}} color='black'/>
            }
            childValue={weeklyXP}
            />
        </div>
        </div>
    </WhiteOverlay>
    </>
}

export default StreakWidget;