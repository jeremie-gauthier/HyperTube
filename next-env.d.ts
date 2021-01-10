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

// Extending the next & next/app types
declare module "next" {
  type NextLayoutComponentType<
    P = Record<string, unknown>
  > = NextComponentType<P> & {
    Layout?: (page: React.ReactNode) => JSX.Element;
  };

  type NextLayoutPage<P = Record<string, unknown>, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    Layout?: (page: React.ReactNode) => JSX.Element;
  };
}

declare module "next/app" {
  type AppLayoutProps = AppProps & {
    Component: NextLayoutComponentType;
  };
}
