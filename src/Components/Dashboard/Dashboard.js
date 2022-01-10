import React from 'react'
import { Grid, Box } from '@mui/material';
import DashboardCard from './DashboardCard';
import axios from 'axios';

class Dashboard extends React.Component {


    /**
     * The below componentDidMount is just an axios use example
     */
    /*
    componentDidMount() {
        axios.get('http://localhost:9443/user/574')
        .then(res => alert(res.data.id+" "+res.data.emailAddress));
    };*/

    render () {
        const activities = Array.from(this.props.data.keys());
        const cards = activities.map((key) => 
        <Box component={Grid} item xs={6}>
            <DashboardCard 
                cardColor={this.props.color} 
                cardTitle={key} 
                gridRows={this.props.data.get(key).rows} 
                gridColumns={this.props.data.get(key).columns} 
                labelMapping={this.props.labelMapping}/>
        </Box>
        );

        return (
            <div>
                <Grid container spacing={2}>
                    {cards}
                </Grid>
            </div>
        );
    }
}

export default Dashboard;