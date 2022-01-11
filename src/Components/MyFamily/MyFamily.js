import axios from 'axios';
import React from 'react'
import FamilyCard from './FamilyCard';
import ParentCard from './ParentCard';
import ChildCard from './ChildCard';

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

    handleFamilyRefresh = (isRefreshNeeded) => {
        this.setState({isGetFamilyMemberNeeded:isRefreshNeeded});
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
        var familyMembers = [];
        /**
         * Step 1 : Get parents
         */
        axios.get('http://localhost:9443/parent/userid/'+userId)
        .then(resParents => {
            var parentsData = resParents.data;
            //Add new ones
            parentsData.forEach(parentData => {
                const parentMember = {
                    type: "parent",
                    member: parentData,
                    isOnFocus: false
                };
                parents.push(parentMember);
            });

            /**
             * Step 2: Get children
             */
            const firstIdParent = parents[0] ? parents[0].member.id : null;
            const secondIdParent = parents[1] ? parents[1].member.id : null;
            axios.get('http://localhost:9443/child/parentsid/'+firstIdParent+'/'+secondIdParent)
                .then(resChildren => {
                    var childrenData = resChildren.data;
                    childrenData.forEach(childData => {
                        const childMember = {
                            type:"child",
                            member: childData,
                            isOnFocus: false
                        };
                        children.push(childMember);
                    })

                    familyMembers = parents.concat(children);
                    this.setState({family: {members:familyMembers}, isGetFamilyMemberNeeded: false});
                })
                .catch(err => this.setState({family: {members:parents}, isGetFamilyMemberNeeded: false}));
        });

        //We need to set it here because we don't have any guaranty that the request will be finish before next rendering
        // => multiple rendering could occur in the meantime and cause error
        this.setState({isGetFamilyMemberNeeded:false});
    }

    componentDidUpdate() {
        //Get all family members linked to the user
        if (this.props.userId && this.props.userId>0 && this.state.isGetFamilyMemberNeeded) {
            this.getFamilyMembers(this.props.userId);
        }       
    }

    handleFocusChange = (memberType, memberId) => {
        var familyMembers = this.state.family.members;
        familyMembers.forEach(familyMember => {
            if (familyMember.type.toString() === memberType && familyMember.member.id.toString() === memberId) {
                familyMember.isOnFocus = true;
            }
            else {
                familyMember.isOnFocus = false;
            }
        });

        this.setState({family:{members:familyMembers}});
    }

    render () {
        var memberCard;
        var focusedMember;
        this.state.family.members.forEach(member => {
            if (member.isOnFocus) {
                focusedMember = member;
            }
        });

        if (focusedMember) {
            if (focusedMember.type === "parent") {
                memberCard = <ParentCard 
                    color={this.props.color} 
                    onRefresh={this.handleFamilyRefresh}/>;
            }
            else if (focusedMember.type === "child") {
                memberCard = <ChildCard 
                color={this.props.color}
                onRefresh={this.handleFamilyRefresh}/>
            }
        }

        return (
            <div>
                <FamilyCard 
                    color={this.props.color} 
                    userId={this.props.userId} 
                    members={this.state.family.members} 
                    onRefresh={this.handleFamilyRefresh}
                    onSetFocusOnMember={this.handleFocusChange}/>
                {memberCard}
            </div>
        );
    }
}

export default MyFamily;