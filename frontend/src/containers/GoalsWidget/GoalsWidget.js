import {React, useState, useEffect} from 'react';
import Heading5 from '../../componments/Text/Heading5/Heading5';
import Button from '../../componments/Button';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import Goal from '../Goal';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';
import DelayedElement from '../DelayedElement';

function GoalsWidget ({newGoalPopupVisible, setNewGoalPopupVisible, editGoalPopupVisible, setEditGoalPopupVisible, view}) {
    const [goals, setGoals] = useState(null);

    function showNewGoalPopup() {
        setNewGoalPopupVisible(true);
    }

    function showEditGoalPopup(goal, id) {
        setEditGoalPopupVisible({id: id, contents: {goal}});
    }
    const newGoalsButtonStyle = {
        marginLeft: view === "mobile" ? "16px" : "0px",
        marginRight: view === "mobile" ? "16px" : "0px",
        width: view === "mobile" ? "90%" : "auto"
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
        apiManager.updateGoals(getCookie("jwtToken"), setGoals);
      }, [newGoalPopupVisible, editGoalPopupVisible]);

    return <>
    <WhiteOverlay style={overlayStyle}>
        <Heading5 text="Goals" style={panelTitleStyle} />

        <div style={newGoalsButtonStyle}>
            <Button text="+ New Goal" onClick={showNewGoalPopup} view={view}/>
        </div>

        {goals && Object.keys(goals).length > 0 ? (
          Object.keys(goals).map(goalId => {
              const goal = goals[goalId];
              return (
                  <DelayedElement
                      key={goalId}
                      child={
                          goal.type === "XP" ? <Goal data={goal} id={goalId} clickEvent={() => showEditGoalPopup(goal, goalId)}/>
                          : <Goal data={goal} id={goalId} clickEvent={() => showEditGoalPopup(goal, goalId)}/>
                      }
                      childValue={goals}
                  />
              );
          })
      ) : (
          <Heading5 text="You haven't made any goals yet!" style={{padding: "16px"}}/>
      )}
    </WhiteOverlay>
    </>
}

export default GoalsWidget;