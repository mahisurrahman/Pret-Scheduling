import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TagManagementCompos } from "../TagManagementCompos/TagManagementCompos";
import { AllStatusesCompo } from "../AllStatusesCompo/AllStatusesCompo";
import { AllCheckpointsManagementCompo } from "../AllCheckpointsManagementCompo/AllCheckpointsManagementCompo";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HomePageSidebarFeatureCompos({
  setTimeInterval,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  timeInterval,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-5">
      <Box sx={{ width: "100%", backgroundColor: "black" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#eeff41",
              },
              "& .MuiTab-root": {
                color: "white",
              },
              "& .Mui-selected": {
                color: "#eeff41 !important",
              },
            }}
          >
            <Tab sx={{ color: "white" }} label="Type List" {...a11yProps(0)} />
            <Tab sx={{ color: "white" }} label="Status" {...a11yProps(1)} />
            <Tab
              sx={{ color: "white" }}
              label="Checkpoints"
              {...a11yProps(2)}
            />
            <Tab sx={{ color: "white" }} label="Settings" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TagManagementCompos />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllStatusesCompo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllCheckpointsManagementCompo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <SettingsPanel
            setTimeInterval={setTimeInterval}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            startTime={startTime}
            endTime={endTime}
            timeInterval={timeInterval}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
