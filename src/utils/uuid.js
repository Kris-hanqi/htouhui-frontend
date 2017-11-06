import { ulid } from 'ulid';

// 获取唯一的字符串
export default function getUuid() {
  return ulid();
}
