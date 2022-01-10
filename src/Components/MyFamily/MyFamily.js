import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react'
import FamilyCard from './FamilyCard';
import ParentCard from './ParentCard';

class MyFamily extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            family:{
                members: []
            },
            isGetFamilyMemberNeeded: true
        }
    }

    getChildrenFromParent = (parentId) => {
        var children = [];
        axios.get('http://localhost:9443/child/parent1id/'+parentId)
            .then(resChildren => {
                resChildren.data.forEach(child => {
                    children = [...children,child];
                })
            });
        axios.get('http://localhost:9443/child/parent2id/'+parentId)
            .then(resChildren => {
                resChildren.data.forEach(child => {
                    if(!children.includes(child))
                    {children = [...children,child]}
                })
            });

        return children;
    }

    getFamilyMembers = (userId) => {
        //Clear previous family members
        this.setState({family:{members:[]}});

        var parents = [];
        var children = [];
        /**
         * Step 1 : Get parents
         */
        axios.get('http://localhost:9443/parent/userid/'+userId)
        .then(resParents => {
            var parents = resParents.data;
            //Add new ones
            parents.forEach(parent => {
                const parentMember = {
                    type: "parent",
                    member: parent
                };
                parents.push(parentMember);

                /**
                 * Step 2 : Get children (for this parent)
                 */
                var parentChildren = this.getChildrenFromParent(parent.id);
                parentChildren.forEach(child => {
                    const childMember = {
                        type: "child",
                        member: child
                    };
                    if(!children.includes(childMember))
                    {
                        children = [...children, childMember];
                    }
                });
            });
        });

        console.log(parents);
        console.log(children);
        this.setState({family: {members:parents.concat(children)}, isGetFamilyMemberNeeded: false});
    }

    render () {
        //Get all family members linked to the user
        if (this.props.userId && this.props.userId>0 && this.state.isGetFamilyMemberNeeded) {
            this.getFamilyMembers(this.props.userId);
        }
        
        return (
            <div>
                <FamilyCard color={this.props.color} userId={this.props.userId} members={this.state.family.members}/>
                <ParentCard color={this.props.color}/>
            </div>
        );
    }
}

export default MyFamily;