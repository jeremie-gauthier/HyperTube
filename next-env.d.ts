declare module "*.scss";
declare module "*.svg";
declare module "*.jpg";
declare module "@ramda/isempty";
declare module "@ramda/pipe";
declare module "@ramda/pick";

type NextImageOpts = {
  deviceSizes: number[];
  imageSizes: never[];
  domains: string[];
  path: string;
  loader: string;
};

declare let process: {
  env: {
    __NEXT_IMAGE_OPTS: NextImageOpts;
    NODE_ENV: string;
    HYPERTUBE_API_URL: string;
  };
};
