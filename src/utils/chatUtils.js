/**
 * Generates a unique chat ID based on two user IDs.
 *
 * The function ensures that the chat ID is consistent regardless
 * of the order the user IDs are provided in. It does this by sorting
 * the two user IDs and then joining them with an underscore.
 *
 * @param {string} userId - The ID of the first user.
 * @param {string} otherUserId - The ID of the second user.
 * @returns {string} - The generated chat ID.
 */

export function generateChatId(userId, otherUserId) {
  return [userId, otherUserId].sort().join('_');
}
