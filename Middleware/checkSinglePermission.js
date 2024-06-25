const checkSinglePermission = (PName, permissions) => {
    const isPermit = permissions.some((item) => item.name === PName);
    if (!isPermit) {
        throw new Error("You do not have access to this route");
    }
};

module.exports = checkSinglePermission;