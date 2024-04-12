import {React, useState, useEffect} from 'react';
import Heading5 from '../../componments/Text/Heading5/Heading5';
import Button from '../../componments/Button';
import WhiteOverlay from '../../componments/WhiteOverlay/WhiteOverlay';
import Goal from '../Goal';
import apiManager from '../../api/Api';
import { getCookie } from '../../api/Authentication';
import DelayedElement from '../DelayedElement';

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