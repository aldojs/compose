
declare function compose<T>(fns: compose.Middleware<T>[]): compose.ComposedMiddleware<T>;

declare namespace compose {
  type Middleware<T> = (context: T, next: () => Promise<any>) => any;
  type ComposedMiddleware<T> = (context: T, next?: () => Promise<any>) => Promise<any>;
}

export = compose;
