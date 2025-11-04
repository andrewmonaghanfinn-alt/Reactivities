import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
//import ActivityCard from "../../features/activities/dashboard/ActivityCard";

function App() {
  //useState allows a component to store and update information (state)
  // const [the thing being stored, the function that can update it] = useState([]);

  //IMPORTANT: useState literally just returns a 2 element array with references to a variable and a function
  //the function is pretty much just a setter method for the variable, no other functionality occurs within this method
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  //useEffect triggers a function when the above mounts
  //we are using a fetch to grab a promise that holds the information returned from the API
  // then chaining .then()'s to get the JSON version and then getting the data
  //from the JSON response as a parameter to setActivities()
  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities/")
      .then((response) => setActivities(response.data));
  }, []);

  //takes in the id of an activity and finds the corresponding activity in the activities[]
  //sets selectedActivity to the queried value if possible
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = {...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id))
  }

  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  );
}

export default App;
