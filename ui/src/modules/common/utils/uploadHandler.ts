import { uploadHandler as common } from 'erxes-ui-utils';
import { getEnv } from 'apolloClient';

type FileInfo = {
  name: string;
  size: number;
  type: string;
};

type AfterUploadParams = {
  status: 'ok' | 'error';
  response: any;
  fileInfo: FileInfo;
};

type AfterReadParams = {
  result: any;
  fileInfo: FileInfo;
};

type Params = {
  files: FileList | null;
  beforeUpload: () => void;
  afterUpload: (params: AfterUploadParams) => void;
  afterRead?: (params: AfterReadParams) => void;
  url?: string;
  kind?: string;
  userId?: string;
  responseType?: string;
  extraFormData?: Array<{ key: string; value: string }>;
};

export const deleteHandler = (params: {
  fileName: string;
  url?: string;
  afterUpload: ({ status }: { status: string }) => any;
}) => {
  const { REACT_APP_API_URL } = getEnv();
  common.deleteHandler(params, REACT_APP_API_URL)
};

const uploadHandler = (params: Params) => {
  const { REACT_APP_API_URL } = getEnv();
  common.uploadHandler(params, REACT_APP_API_URL)
};

export default uploadHandler;
