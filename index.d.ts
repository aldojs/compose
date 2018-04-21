
declare function compose<T>(fns: compose.Middleware<T>[]): compose.ComposedMiddleware<T>;

declare namespace compose {
  type Middleware<T> = (context: T, next: () => any) => any;
  type ComposedMiddleware<T> = (context: T, done?: () => any) => any;
}

export = compose;
