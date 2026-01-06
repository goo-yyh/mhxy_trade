import { ImageViewer as AntImageViewer } from 'antd-mobile';

interface ImageViewerProps {
  visible: boolean;
  image: string;
  onClose: () => void;
}

export function ImageViewer({ visible, image, onClose }: ImageViewerProps) {
  return <AntImageViewer image={image} visible={visible} onClose={onClose} />;
}
