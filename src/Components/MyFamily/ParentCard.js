import { Button, Card, CardActionArea, CardContent, CardMedia, Avatar, Divider, Typography, Grid } from '@mui/material';
import React from 'react'
import { Edit } from '@mui/icons-material'
import ParentInfoEdit from './ParentInfoEdit';
import AddFamilyMemberDialog from './AddFamilyMemberDialog';
import * as GenericUtils from '../../Utils/genericUtils';

class ParentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editParentDialogOpen: false
        };
    }

    handleClick = () => {this.setState({editParentDialogOpen:true});}

    handleDialogClose = () => {this.setState({editParentDialogOpen:false});}

    render () {
        return (
            <div>
                <Card sx={{marginTop:'2%'}}>
                    <CardActionArea>
                        <CardMedia >
                            <Grid container>
                                <Grid item xs={0} sx={{marginTop:'0.5%', marginBottom:'0.5%', marginLeft:'0.5%'}}>
                                    <Avatar sx={{ backgroundColor:this.props.color}}>{GenericUtils.getInitialFromUserLogin(this.props.member.member.firstName)}</Avatar>
                                </Grid>
                                <Grid item xs={4} sx={{textAlign:'left', marginLeft:'1%', marginTop:'0.5%', marginBottom:'0.5%'}}>
                                    <Typography variant="h6" sx={{textAlign:'left'}}>{this.props.member.member.firstName+' '+this.props.member.member.lastName}</Typography>
                                </Grid>
                                <Grid item xs={7} sx={{marginTop:'0.5%', marginBottom:'0.5%', textAlign:'right'}}>
                                    <Button variant="contained" color="secondary" onClick={this.handleClick}>
                                        Edit
                                        <Edit sx={{marginLeft:'10%'}}/>
                                    </Button>
                                    <AddFamilyMemberDialog
                                        isOpen={this.state.editParentDialogOpen}
                                        onClose={this.handleDialogClose}
                                        onValidate={this.props.onRefresh}
                                        userId={this.props.userId}
                                        dialogColor={this.props.color}
                                        member={this.props.member}
                                        isTypeFrozen={true}
                                        isUpdateExistingMember={true}/>
                                </Grid>
                            </Grid>
                        </CardMedia>
                        <Divider/>
                        <CardContent>
                            <ParentInfoEdit member={this.props.member} editEnabled={false}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    };
}

export default ParentCard;