export function generateChatId(userId, otherUserId) {
  return [userId, otherUserId].sort().join('_');
}
