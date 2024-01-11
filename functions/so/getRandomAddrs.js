function getRandomAddrs(RandomAddrsList, id) {
    return RandomAddrsList.filter(pos => pos.id == id)[0].area;
}

module.exports.getRandomAddrs = getRandomAddrs;