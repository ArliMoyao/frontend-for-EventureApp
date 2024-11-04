import { Authing } from "./app";
import { EventDoc } from "./concepts/events"; // Add this line to import EventDoc

/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
export default class Responses {
  /**
   * Convert PostDoc into more readable format for the frontend by converting the author id into a username.
   */
  // static async post(post: PostDoc | null) {
  //   if (!post) {
  //     return post;
  //   }
  //   const author = await Authing.getUserById(post.author);
  //   return { ...post, author: author.username };
  // }

  static async event(event: EventDoc | null) {
    if (!event) {
      return event;
    }
    const host = await Authing.getUserById(event.host);
    return { ...event, host: host.username };
  }
}
