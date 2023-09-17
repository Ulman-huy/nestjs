import { CommentDTO } from "src/post/dto";
import { PostDTO } from "src/post/dto/post.dto";

function findInteract(userId: number, data: PostDTO) {
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
    if (data[key] && data[key].includes(userId)) {
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
function findInteractComment(userId: number, data: CommentDTO) {
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
    if (data[key] && data[key].includes(userId)) {
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
