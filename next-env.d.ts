declare module "*.scss";
declare module "*.svg";
declare module "*.jpg";

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
  };
};
