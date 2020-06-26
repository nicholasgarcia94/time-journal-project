import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BsFillTrashFill } from "react-icons/bs";
import { IActivity, Activity } from "./models/IActivity";
import { AddActivityForm } from './components/AddActivityForm';
import { ActivityService, activityService } from "./services/ActivitiesService";


function App() {
  const emptyArray: IActivity[] = [new Activity(0, '', 0, new Date)];
  const [activities, setActivites] = useState(emptyArray);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    activityService.getActivities().then((results: React.SetStateAction<IActivity[]>)  => setActivites(results));
  }, [counter]);

  async function addActivity() {
    const name: string | null = prompt("Enter activity name");
    const sDuration: string | null = prompt("Enter duration");
    const duration: number = sDuration ? parseInt(sDuration, 10) : 10;
    await activityService.postActivity(name, duration);
    setCounter(c => c + 1);
  }

  async function removeActivity(activity: IActivity) {
    await activityService.deleteActivity(activity.id);
    setCounter(c => c + 1);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header> */}
      <AddActivityForm />
      <ul>
        {activities.map(activity => {
            return (
                <li key={activity.id} onClick={() => console.log(`${activity.name} clicked!`)}>{activity.name}
                  <a style={styles.trashStyle} href="javascript:;"><BsFillTrashFill onClick={(() => removeActivity(activity))}/></a>
                </li>
            )
        })}
      </ul>
      <div>
        <button onClick={addActivity}>Add activity</button>
      </div>
    </div>
  );
}

const styles = {
  trashStyle: {
    paddingLeft: 20
  }
}

export default App;
