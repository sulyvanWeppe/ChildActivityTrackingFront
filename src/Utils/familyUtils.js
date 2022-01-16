export function getMemberFromFamilyByIdAndType(memberId, memberType, members) {
    const searchedMember = members.filter((member) => {return (member.type.toString() === memberType && member.member.id.toString() === memberId.toString())})
    return searchedMember[0];
}