import {React, useState, useEffect} from 'react';
import Heading5 from '../componments/Heading5';
import Button from '../componments/Button';
import WhiteOverlay from '../componments/WhiteOverlay';
import Goal from '../componments/Goal';
import { updateGoals } from '../api/Api';
import { getCookie } from '../api/Authentication';
import '../App.css';
import DelayedElement from '../componments/DelayedElement';

function GoalsWidget ({newGoalPopupVisible, setNewGoalPopupVisible, editGoalPopupVisible, setEditGoalPopupVisible}) {
    const [goals, setGoals] = useState(null);

    function showNewGoalPopup() {
        setNewGoalPopupVisible(true);
    }

    function showEditGoalPopup() {
        setEditGoalPopupVisible(true);
    }

    const panelTitleStyle = {
        padding: "8px"
      }
      const overlayStyle = {
        marginLeft: "16px",
        marginRight: "0px",
        width: "90%"
      }

      useEffect(() => {
        updateGoals(getCookie("userID"), setGoals);
      }, [newGoalPopupVisible])

    return <>
    <WhiteOverlay style={overlayStyle}>
        <Heading5 text="Goals" style={panelTitleStyle} />
        <Button text="+ New Goal" style={{}} onClick={showNewGoalPopup} />
        {goals && Object.keys(goals).map(goalId => {
                const goal = goals[goalId];
                return (
                    <DelayedElement
                        key={goalId}
                        child={
                          goal.type === "XP" ? <Goal start={goal.data.starting_xp} end={goal.data.goal_xp} title={goal.title} dueDate={goal.end_date} clickEvent={showEditGoalPopup}/>
                          : <Goal start={goal.data.cards_revised_so_far} end={goal.data.cards_to_revise} title={goal.title} dueDate={goal.end_date} clickEvent={showEditGoalPopup}/>
                        }
                        childValue={goals}
                    />
                );
            })}
    </WhiteOverlay>
    </>
}

export default GoalsWidget;