import { ImageUploader as AntImageUploader } from 'antd-mobile';
import type { ImageUploaderProps } from 'antd-mobile';

export function ImageUploader(props: ImageUploaderProps) {
  return <AntImageUploader {...props} />;
}
