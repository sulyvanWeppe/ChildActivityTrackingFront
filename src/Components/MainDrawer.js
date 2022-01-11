import React from "react";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Dashboard, CalendarToday, Description, Person, FamilyRestroom } from "@mui/icons-material";
//import { makeStyles } from "@mui/material";
import { withStyles } from "@mui/styles";

const useStyles = theme => ({
    root: {
        backgroundColor: "black",
        opacity: "0.8",
        color: "white"
    },
});
const drawerWidth = 240;

class MainDrawer extends React.Component {
    

    handleItemSelection = (e) => {
        this.props.handleItemChange(e.target.innerText);
    }
    
    render() {
    
        const { classes } = this.props;

        return (
            <div>
                <Drawer 
                    classes={{paper: classes.root}}
                    sx={{width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                          },
                        }}
                    variant= "permanent">
                        <Toolbar />
                            <h2>UserLogin</h2>
                        <Divider sx={{backgroundColor:'white'}}/>
                        <List>
                            <ListItem disablePadding onClick={this.handleItemSelection}>
                                <ListItemButton>
                                    <ListItemIcon><Dashboard color="secondary"/></ListItemIcon>
                                    <ListItemText>Dashboard</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={this.handleItemSelection}>
                                <ListItemButton>
                                    <ListItemIcon><CalendarToday color="secondary"/></ListItemIcon>
                                    <ListItemText>My Day</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={this.handleItemSelection}>
                                <ListItemButton>
                                    <ListItemIcon><Description color="secondary"/></ListItemIcon>
                                    <ListItemText>Documents</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={this.handleItemSelection}>
                                <ListItemButton>
                                    <ListItemIcon><FamilyRestroom color="secondary"/></ListItemIcon>
                                    <ListItemText>My Family</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={this.handleItemSelection}>
                                    <ListItemIcon><Person color="secondary"/></ListItemIcon>
                                    <ListItemText>User Profile</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                </Drawer>
            </div>
        );
    }

}

export default withStyles(useStyles)(MainDrawer);