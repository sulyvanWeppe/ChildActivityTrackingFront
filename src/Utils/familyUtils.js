import axios from "axios";

export function getMemberFromFamilyByIdAndType(memberId, memberType, members) {
    const searchedMember = members.filter((member) => {return (member.type.toString() === memberType && member.member.id.toString() === memberId.toString())})
    return searchedMember[0];
}

export async function getFamilyParentByUserId(userId) {
    
    try {
        var parentReq = await axios.get('http://localhost:9443/parent/userid/'+userId)

        if (parentReq.status.toString() === "200") {
            return parentReq.data;
        }
    } catch (err) {
        if (err.response.status.toString() !== "404")
        {
            alert("An error occured while trying to get the family's parents")
        }
    }
}

export async function getFamilyChildrenByUserId(userId) {
    //First get the parents
    const parents = await getFamilyParentByUserId(userId);

    //Second get the children
    const firstIdParent = parents ? (parents[0] ? parents[0].id : undefined) : undefined;
    const secondIdParent = parents ? (parents[1] ? parents[1].id : undefined) : undefined;
    if (!firstIdParent || !secondIdParent)
    {
        return;
    }
    
    try {
        const childrenReq = await axios.get('http://localhost:9443/child/parentsid/'+firstIdParent+'/'+secondIdParent);
        return childrenReq.data;
    } catch (err)
    {
        if (err.response.status.toString() !== "404") {
            alert("An error occured while trying to get the family's children");
        }
    }
}