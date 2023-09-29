import { CommentDTO } from "src/post/dto";
import { PostDTO } from "src/post/dto/post.dto";

function findInteract(user_id: number, data: PostDTO) {
  let isInteract = false;
  let action = '';
  const interactKeys = [
    'likes',
    'hahas',
    'dears',
    'hearts',
    'angrys',
    'wows',
    'sads',
  ];
  for (const key of interactKeys) {
    if (data[key] && data[key].includes(user_id)) {
      isInteract = true;
      action = key;
      break;
    }
  }
  return {
    isInteract,
    action,
  };
}
function findInteractComment(user_id: number, data: CommentDTO) {
  let isInteract = false;
  let action = '';
  const interactKeys = [
    'likes',
    'hahas',
    'dears',
    'angrys',
    'wows',
    'sads',
    'hearts',
  ];
  for (const key of interactKeys) {
    if (data[key] && data[key].includes(user_id)) {
      isInteract = true;
      action = key;
      break;
    }
  }
  return {
    isInteract,
    action,
  };
}

export { findInteract, findInteractComment };
