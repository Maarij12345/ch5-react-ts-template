export type CameraConfig = {
  label: string;
  url: string;
  password: string;
  userId?: string;
};

export const cameraData: Record<string, CameraConfig> = {
  '1': {
    label: 'Front Door',
    url: 'rtsp://admin:Maari377@192.168.10.113:554//Preview_01_sub',
    password: 'Maari377',
  },
  '2': {
    label: 'PTZ',
    url: 'rtsp://admin:Maari377@192.168.10.101:554//Preview_01_main',
    password: 'Maari377',
  },
  '3': {
    label: 'Masterbed Front',
    url: 'rtsp://admin:Wzerafsh99@192.168.10.18:554/h264/ch3/sub/av_stream',
    password: 'Maari377',
  },
  '4': {
    label: 'Garage',
    url: 'rtsp://admin:Wzerafsh99@192.168.10.18:554/h264/ch4/sub/av_stream',
    password: 'Maari377',
  },
  '5': {
    label: 'Camera 5',
    url: 'rtsp://admin:Wzerafsh99@192.168.10.18:554/h264/ch5/sub/av_stream',
    password: 'Maari377',
  },
  '6': {
    label: 'Camera 6',
    url: 'rtsp://admin:Wzerafsh99@192.168.10.18:554/h264/ch6/sub/av_stream',
    password: 'Maari377',
  },
};
