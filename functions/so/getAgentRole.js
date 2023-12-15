function getAgentRole(role) {
    switch (role) {
        case 1:
            return "Phường";
        case 2:
            return "Quận";
        case 3:
            return "Sở";
        case "1":
            return "Phường";
        case "2":
            return "Quận";
        case "3":
            return "Sở";
        default:
            return "Không xác định";
    }
}

module.exports.getAgentRole = getAgentRole;