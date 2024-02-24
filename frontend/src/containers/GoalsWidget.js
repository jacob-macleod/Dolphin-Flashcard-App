import {React, useState, useEffect} from 'react';
import Heading5 from '../componments/Heading5';
import Button from '../componments/Button';
import WhiteOverlay from '../componments/WhiteOverlay';
import Goal from '../componments/Goal';
import apiManager from '../api/Api';
import { getCookie } from '../api/Authentication';
import '../App.css';
import DelayedElement from '../componments/DelayedElement';

function GoalsWidget ({newGoalPopupVisible, setNewGoalPopupVisible, editGoalPopupVisible, setEditGoalPopupVisible}) {
    const [goals, setGoals] = useState(null);

    function showNewGoalPopup() {
        setNewGoalPopupVisible(true);
    }

    function showEditGoalPopup(goal, id) {
        setEditGoalPopupVisible({id: id, contents: {goal}});
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
        apiManager.updateGoals(getCookie("userID"), setGoals);
      }, [newGoalPopupVisible, editGoalPopupVisible]);

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
                          goal.type === "XP" ? <Goal data={goal} clickEvent={() => showEditGoalPopup(goal, goalId)}/>
                          : <Goal data={goal}clickEvent={() => showEditGoalPopup(goal, goalId)}/>
                        }
                        childValue={goals}
                    />
                );
            })}
    </WhiteOverlay>
    </>
}

export default GoalsWidget;