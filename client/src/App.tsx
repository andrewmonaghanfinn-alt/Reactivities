import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //useState allows a component to store and update information (state)
  // const [the thing being stored, the function that can update it] = useState([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  //useEffect triggers a function when the above mounts
  //we are using a fetch to grab a promise that holds the information returned from the API
  // then chaining .then()'s to get the JSON version and then getting the data
  //from the JSON response as a parameter to setActivities()
  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities/")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <>
      <Typography variant="h3">Welcome to Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
