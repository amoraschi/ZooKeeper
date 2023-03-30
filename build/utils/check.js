import { addDoc } from '../database.js'
async function onStart (members) {
  console.log(members.length)
  for (const member of members) {
    await addDoc({
      id: member.id,
      reason: 'No reason specified, wasn\'t in database',
      timestamp: Date.now()
    })
  }
}
export { onStart }
