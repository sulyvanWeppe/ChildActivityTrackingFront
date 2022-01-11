import { CardContent, Card, Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import AddFamilyMemberDialog from './AddFamilyMemberDialog';

class FamilyCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addFamilyMemberDialogOpen: false
        };
    }

    handleClick = () => {this.setState({addFamilyMemberDialogOpen:true});}

    handleDialogClose = () => {this.setState({addFamilyMemberDialogOpen:false});}

    getInitialFromUserLogin = (userLogin) => {
        return userLogin.charAt(0);
    }

    render () {
        var membersDisplay;
        var familyParents;
        if (this.props.members && this.props.members.length>0) {
            membersDisplay = this.props.members.map((member) =>
                <Grid item sx={{display:'flex', flexDirection:'column', marginLeft:'4%'}} key={member.member.firstName+member.member.lastName}>
                    <Avatar 
                        sx={{ bgcolor:'black', opacity:'0.8', height:'100%', width:80, marginBottom:'7%', border:'solid '+this.props.color}} 
                        style={{ text_align: "center" }}>
                        {this.getInitialFromUserLogin(member.member.firstName)}
                    </Avatar>
                    <Typography variant='button' sx={{fontSize:10, color:'#8c8c89'}}>{member.member.firstName}</Typography>
                </Grid>
            );

            familyParents = this.props.members.filter((member) => {return member.type==="parent"});
        }

        return (
            <div>
                <Card sx={{marginTop:'2%'}}>
                    <CardContent sx={{height:120}}>
                        <Grid container sx={{display:'flex', flexDirection:'row', minHeight:'100%', minWidth:'100%'}}>
                                <Grid item sx={{display:'flex', flexDirection:'column', marginLeft:'4%'}}>
                                    <Avatar sx={{ bgcolor:this.props.color, opacity:'0.8', height:'100%', width:80, marginBottom:'7%', fontSize:50}} onClick={this.handleClick}>+</Avatar>
                                    <Typography variant='button' sx={{fontSize:10, color:'#8c8c89'}}>Add</Typography>
                                </Grid>
                                <AddFamilyMemberDialog
                                    isOpen={this.state.addFamilyMemberDialogOpen}
                                    onClose={this.handleDialogClose}
                                    onValidate={this.props.onRefresh}
                                    dialogColor={this.props.color}
                                    userId={this.props.userId}
                                    parents={familyParents}/>
                                {membersDisplay}
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    }

}

export default FamilyCard;