'use client';

import { Upload } from 'antd';
import type { UploadProps } from 'antd';

export function ImageUploader(props: UploadProps) {
  return <Upload listType="picture-card" {...props} />;
}
