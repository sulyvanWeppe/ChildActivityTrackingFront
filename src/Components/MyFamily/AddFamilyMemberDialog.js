import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import ChildInfoEdit from './ChildInfoEdit';
import ParentInfoEdit from './ParentInfoEdit';

class AddFamilyMemberDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            familyMemberType: "parent",
            parent:{
                firstName: null,
                lastName: null,
                email: null
            },
            child:{
                firstName: null,
                lastName: null,
                parent1: null,
                parent2: null,
                birthDate: null
            }
        };
    }

    handleClose = () => {
        this.props.onClose();
    }

    handleMemberTypeChange = (e) => {
        this.setState({familyMemberType: e.target.value});
    }

    handleParentFieldChange = (e) => {
        if (e.target.id == "firstNameField") {
            this.setState((state) => { return {parent:{firstName:e.target.value, lastName:state.parent.lastName, email:state.parent.email}}});
        }
        else if (e.target.id == "lastNameField") {
            this.setState((state) => { return {parent:{firstName:state.parent.firstName, lastName:e.target.value, email:state.parent.email}}});
        }
        else if (e.target.id == "emailField") {
            this.setState((state) => { return {parent:{firstName:state.parent.firstName, lastName:state.parent.lastName, email:e.target.value}}});
        }
    }

    handleChildFieldChange = (e) => {
        if (e.target.id == "firstNameField") {
            this.setState((state) => {
                const currentChild = state.child;
                return {child:{firstName:e.target.value,lastName:currentChild.lastName,parent1:currentChild.parent1,parent2:currentChild.parent2,birhtDate:currentChild.birhtDate}};
            });
        }
        else if (e.target.id == "lastNameField") {
            this.setState((state) => {
                const currentChild = state.child;
                return {child:{firstName:currentChild.firstName,lastName:e.target.value,parent1:currentChild.parent1,parent2:currentChild.parent2,birhtDate:currentChild.birhtDate}};
            });
        } 
    }

    handleChildComposedFieldChange = (e,fieldId) => {
        if (fieldId == "selectParent1Field") {
            this.setState((state) => {
                const currentChild = state.child;
                return {child:{firstName:currentChild.firstName,lastName:currentChild.lastName,parent1:e.target.value,parent2:currentChild.parent2,birhtDate:currentChild.birhtDate}};
            });
        }
        else if (fieldId== "selectParent2Field") {
            this.setState((state) => {
                const currentChild = state.child;
                return {child:{firstName:currentChild.firstName,lastName:currentChild.lastName,parent1:currentChild.parent1,parent2:e.target.value,birhtDate:currentChild.birhtDate}};
            });
        }
        else if (fieldId == "birthDateField") {
            this.setState((state) => {
                const currentChild = state.child;
                return {child:{firstName:currentChild.firstName,lastName:currentChild.lastName,parent1:currentChild.parent1,parent2:currentChild.parent2,birthDate:e}};
            });
        }
    }

    handleValidate = () => {
        if (this.state.familyMemberType == "parent") {
            var newParent = {
                userId: this.props.userId,
                firstName: this.state.parent.firstName,
                lastName: this.state.parent.lastName,
                emailAddress: this.state.parent.email
            }

            axios.post('http://localhost:9443/parent/', newParent)
                .then(res => {
                    this.props.onValidate();
                    this.props.onClose();
                })
                .catch(err => alert(err));
        } else if (this.state.familyMemberType == "child") {
            var newChild = {
                firstName: this.state.child.firstName,
                lastName: this.state.child.lastName, 
                parent1Id: this.state.child.parent1,
                parent2Id: this.state.child.parent2,
                birthDate: this.state.child.birthDate
            }

            axios.post('http://localhost:9443/child/', newChild)
                .then(res => {
                    this.props.onValidate(true);
                    this.props.onClose();
                })
                .catch(err => alert(err));
        }
    };

    render() {

        const mockParent1 = {id:680, firstName:"toto", lastName:"tata"}
        const mockParent2 = {id:681, firstName:"toto", lastName:"tata"}


        var content;
        if (this.state.familyMemberType == "parent") {
            content = <ParentInfoEdit editEnabled={true} onFieldUpdate={this.handleParentFieldChange}/>;
        }
        else if(this.state.familyMemberType == "child") {
            content = <ChildInfoEdit 
                        editEnabled={true} 
                        onFieldUpdate={this.handleChildFieldChange} 
                        onComposedFieldUpdate={this.handleChildComposedFieldChange} 
                        parent1={mockParent1}
                        parent2={mockParent2}
                        birthDate={this.state.child.birthDate}/>;
        }

        return (
            <div>
                <Dialog onClose={this.handleClose} open={this.props.isOpen}>
                    <DialogTitle sx={{backgroundColor:this.props.dialogColor, color:'white'}}>
                        <Typography variant='h5'>Add Family Member</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <FormControl variant="standard" sx={{marginLeft:'2%', width:'50%', marginBottom:'6%', marginTop:'2%'}}>
                            <InputLabel id="selectMemberTypeLabel">Member type</InputLabel>
                            <Select
                                labelId='selectMemberTypeLabel'
                                id="selectMemberType"    
                                onChange={this.handleMemberTypeChange}
                                defaultValue={this.state.familyMemberType}
                            >
                                <MenuItem value="parent">Parent</MenuItem>
                                <MenuItem value="child">Child</MenuItem>
                            </Select>
                        </FormControl>
                        <Divider sx={{marginBottom:'2%'}}/>
                       {content}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleValidate}>Validate</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddFamilyMemberDialog;