
// AUTOROLE BADGES
module.exports = async (client, member) => {

    if(member.guild.id !== "") return; // ID DO SERVIDOR
  
    try {
      let userflags = member.user.flags;
    if (userflags.has('HYPESQUAD_EVENTS')) {
    const badgerole = member.guild.roles.cache.get("") //<<<< ID DO CARGO DE HYPESQUAD
    await member.roles.add(badgerole).catch(() => {})
    }
    if (userflags.has('EARLY_SUPPORTER')) {
    const badgerole = member.guild.roles.cache.get("") //<<<< ID DO CARGO DE EARLY SUPPORT 
    await member.roles.add(badgerole).catch(() => {})
    } else if (userflags.has('EARLY_VERIFIED_BOT_DEVELOPER')) {
    const badgerole = member.guild.roles.cache.get("") //<<<< ID DO CARGO DE DEVELOPER
    await member.roles.add(badgerole).catch(() => {})

    }
    } catch (e) {}
  }