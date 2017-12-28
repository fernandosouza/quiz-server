const drop = !!process.argv.some(opt => opt === '--drop');

module.exports = { drop };