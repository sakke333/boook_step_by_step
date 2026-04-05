
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model BookListing
 * 
 */
export type BookListing = $Result.DefaultSelection<Prisma.$BookListingPayload>
/**
 * Model Reservation
 * 
 */
export type Reservation = $Result.DefaultSelection<Prisma.$ReservationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model TokenTransaction
 * 
 */
export type TokenTransaction = $Result.DefaultSelection<Prisma.$TokenTransactionPayload>
/**
 * Model WishListing
 * 
 */
export type WishListing = $Result.DefaultSelection<Prisma.$WishListingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BookListingStatus: {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  COMPLETED: 'COMPLETED'
};

export type BookListingStatus = (typeof BookListingStatus)[keyof typeof BookListingStatus]


export const ReservationStatus: {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus]

}

export type BookListingStatus = $Enums.BookListingStatus

export const BookListingStatus: typeof $Enums.BookListingStatus

export type ReservationStatus = $Enums.ReservationStatus

export const ReservationStatus: typeof $Enums.ReservationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookListing`: Exposes CRUD operations for the **BookListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookListings
    * const bookListings = await prisma.bookListing.findMany()
    * ```
    */
  get bookListing(): Prisma.BookListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reservation`: Exposes CRUD operations for the **Reservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservations
    * const reservations = await prisma.reservation.findMany()
    * ```
    */
  get reservation(): Prisma.ReservationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenTransaction`: Exposes CRUD operations for the **TokenTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenTransactions
    * const tokenTransactions = await prisma.tokenTransaction.findMany()
    * ```
    */
  get tokenTransaction(): Prisma.TokenTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wishListing`: Exposes CRUD operations for the **WishListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WishListings
    * const wishListings = await prisma.wishListing.findMany()
    * ```
    */
  get wishListing(): Prisma.WishListingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    BookListing: 'BookListing',
    Reservation: 'Reservation',
    Message: 'Message',
    TokenTransaction: 'TokenTransaction',
    WishListing: 'WishListing'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "bookListing" | "reservation" | "message" | "tokenTransaction" | "wishListing"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      BookListing: {
        payload: Prisma.$BookListingPayload<ExtArgs>
        fields: Prisma.BookListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          findFirst: {
            args: Prisma.BookListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          findMany: {
            args: Prisma.BookListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>[]
          }
          create: {
            args: Prisma.BookListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          createMany: {
            args: Prisma.BookListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>[]
          }
          delete: {
            args: Prisma.BookListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          update: {
            args: Prisma.BookListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          deleteMany: {
            args: Prisma.BookListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>[]
          }
          upsert: {
            args: Prisma.BookListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookListingPayload>
          }
          aggregate: {
            args: Prisma.BookListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookListing>
          }
          groupBy: {
            args: Prisma.BookListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookListingCountArgs<ExtArgs>
            result: $Utils.Optional<BookListingCountAggregateOutputType> | number
          }
        }
      }
      Reservation: {
        payload: Prisma.$ReservationPayload<ExtArgs>
        fields: Prisma.ReservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findFirst: {
            args: Prisma.ReservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          findMany: {
            args: Prisma.ReservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          create: {
            args: Prisma.ReservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          createMany: {
            args: Prisma.ReservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          delete: {
            args: Prisma.ReservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          update: {
            args: Prisma.ReservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          deleteMany: {
            args: Prisma.ReservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>[]
          }
          upsert: {
            args: Prisma.ReservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservationPayload>
          }
          aggregate: {
            args: Prisma.ReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservation>
          }
          groupBy: {
            args: Prisma.ReservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservationCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      TokenTransaction: {
        payload: Prisma.$TokenTransactionPayload<ExtArgs>
        fields: Prisma.TokenTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          findFirst: {
            args: Prisma.TokenTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          findMany: {
            args: Prisma.TokenTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>[]
          }
          create: {
            args: Prisma.TokenTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          createMany: {
            args: Prisma.TokenTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>[]
          }
          delete: {
            args: Prisma.TokenTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          update: {
            args: Prisma.TokenTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          deleteMany: {
            args: Prisma.TokenTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>[]
          }
          upsert: {
            args: Prisma.TokenTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenTransactionPayload>
          }
          aggregate: {
            args: Prisma.TokenTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenTransaction>
          }
          groupBy: {
            args: Prisma.TokenTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TokenTransactionCountAggregateOutputType> | number
          }
        }
      }
      WishListing: {
        payload: Prisma.$WishListingPayload<ExtArgs>
        fields: Prisma.WishListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WishListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WishListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          findFirst: {
            args: Prisma.WishListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WishListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          findMany: {
            args: Prisma.WishListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>[]
          }
          create: {
            args: Prisma.WishListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          createMany: {
            args: Prisma.WishListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WishListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>[]
          }
          delete: {
            args: Prisma.WishListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          update: {
            args: Prisma.WishListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          deleteMany: {
            args: Prisma.WishListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WishListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WishListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>[]
          }
          upsert: {
            args: Prisma.WishListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishListingPayload>
          }
          aggregate: {
            args: Prisma.WishListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWishListing>
          }
          groupBy: {
            args: Prisma.WishListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<WishListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.WishListingCountArgs<ExtArgs>
            result: $Utils.Optional<WishListingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    bookListing?: BookListingOmit
    reservation?: ReservationOmit
    message?: MessageOmit
    tokenTransaction?: TokenTransactionOmit
    wishListing?: WishListingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookListings: number
    reservations: number
    sentMessages: number
    sentTransactions: number
    receivedTransactions: number
    wishListings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookListings?: boolean | UserCountOutputTypeCountBookListingsArgs
    reservations?: boolean | UserCountOutputTypeCountReservationsArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    sentTransactions?: boolean | UserCountOutputTypeCountSentTransactionsArgs
    receivedTransactions?: boolean | UserCountOutputTypeCountReceivedTransactionsArgs
    wishListings?: boolean | UserCountOutputTypeCountWishListingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWishListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishListingWhereInput
  }


  /**
   * Count Type ReservationCountOutputType
   */

  export type ReservationCountOutputType = {
    messages: number
  }

  export type ReservationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ReservationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ReservationCountOutputType without action
   */
  export type ReservationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservationCountOutputType
     */
    select?: ReservationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReservationCountOutputType without action
   */
  export type ReservationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    tokenBalance: number | null
  }

  export type UserSumAggregateOutputType = {
    tokenBalance: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    walletAddress: string | null
    createdAt: Date | null
    tokenBalance: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
    walletAddress: string | null
    createdAt: Date | null
    tokenBalance: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    image: number
    walletAddress: number
    createdAt: number
    tokenBalance: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    tokenBalance?: true
  }

  export type UserSumAggregateInputType = {
    tokenBalance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    walletAddress?: true
    createdAt?: true
    tokenBalance?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    walletAddress?: true
    createdAt?: true
    tokenBalance?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    image?: true
    walletAddress?: true
    createdAt?: true
    tokenBalance?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    image: string | null
    walletAddress: string | null
    createdAt: Date
    tokenBalance: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    tokenBalance?: boolean
    bookListings?: boolean | User$bookListingsArgs<ExtArgs>
    reservations?: boolean | User$reservationsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    sentTransactions?: boolean | User$sentTransactionsArgs<ExtArgs>
    receivedTransactions?: boolean | User$receivedTransactionsArgs<ExtArgs>
    wishListings?: boolean | User$wishListingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    tokenBalance?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    tokenBalance?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    image?: boolean
    walletAddress?: boolean
    createdAt?: boolean
    tokenBalance?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "image" | "walletAddress" | "createdAt" | "tokenBalance", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookListings?: boolean | User$bookListingsArgs<ExtArgs>
    reservations?: boolean | User$reservationsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    sentTransactions?: boolean | User$sentTransactionsArgs<ExtArgs>
    receivedTransactions?: boolean | User$receivedTransactionsArgs<ExtArgs>
    wishListings?: boolean | User$wishListingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bookListings: Prisma.$BookListingPayload<ExtArgs>[]
      reservations: Prisma.$ReservationPayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      sentTransactions: Prisma.$TokenTransactionPayload<ExtArgs>[]
      receivedTransactions: Prisma.$TokenTransactionPayload<ExtArgs>[]
      wishListings: Prisma.$WishListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      image: string | null
      walletAddress: string | null
      createdAt: Date
      tokenBalance: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookListings<T extends User$bookListingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reservations<T extends User$reservationsArgs<ExtArgs> = {}>(args?: Subset<T, User$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentTransactions<T extends User$sentTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedTransactions<T extends User$receivedTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wishListings<T extends User$wishListingsArgs<ExtArgs> = {}>(args?: Subset<T, User$wishListingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly tokenBalance: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bookListings
   */
  export type User$bookListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    where?: BookListingWhereInput
    orderBy?: BookListingOrderByWithRelationInput | BookListingOrderByWithRelationInput[]
    cursor?: BookListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookListingScalarFieldEnum | BookListingScalarFieldEnum[]
  }

  /**
   * User.reservations
   */
  export type User$reservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    cursor?: ReservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.sentTransactions
   */
  export type User$sentTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    where?: TokenTransactionWhereInput
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    cursor?: TokenTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenTransactionScalarFieldEnum | TokenTransactionScalarFieldEnum[]
  }

  /**
   * User.receivedTransactions
   */
  export type User$receivedTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    where?: TokenTransactionWhereInput
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    cursor?: TokenTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenTransactionScalarFieldEnum | TokenTransactionScalarFieldEnum[]
  }

  /**
   * User.wishListings
   */
  export type User$wishListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    where?: WishListingWhereInput
    orderBy?: WishListingOrderByWithRelationInput | WishListingOrderByWithRelationInput[]
    cursor?: WishListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishListingScalarFieldEnum | WishListingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model BookListing
   */

  export type AggregateBookListing = {
    _count: BookListingCountAggregateOutputType | null
    _min: BookListingMinAggregateOutputType | null
    _max: BookListingMaxAggregateOutputType | null
  }

  export type BookListingMinAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    isbn: string | null
    condition: string | null
    location: string | null
    availableTime: string | null
    description: string | null
    status: $Enums.BookListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    giverId: string | null
  }

  export type BookListingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    isbn: string | null
    condition: string | null
    location: string | null
    availableTime: string | null
    description: string | null
    status: $Enums.BookListingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    giverId: string | null
  }

  export type BookListingCountAggregateOutputType = {
    id: number
    title: number
    author: number
    isbn: number
    condition: number
    location: number
    availableTime: number
    description: number
    status: number
    createdAt: number
    updatedAt: number
    giverId: number
    _all: number
  }


  export type BookListingMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    condition?: true
    location?: true
    availableTime?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    giverId?: true
  }

  export type BookListingMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    condition?: true
    location?: true
    availableTime?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    giverId?: true
  }

  export type BookListingCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    condition?: true
    location?: true
    availableTime?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    giverId?: true
    _all?: true
  }

  export type BookListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookListing to aggregate.
     */
    where?: BookListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookListings to fetch.
     */
    orderBy?: BookListingOrderByWithRelationInput | BookListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookListings
    **/
    _count?: true | BookListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookListingMaxAggregateInputType
  }

  export type GetBookListingAggregateType<T extends BookListingAggregateArgs> = {
        [P in keyof T & keyof AggregateBookListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookListing[P]>
      : GetScalarType<T[P], AggregateBookListing[P]>
  }




  export type BookListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookListingWhereInput
    orderBy?: BookListingOrderByWithAggregationInput | BookListingOrderByWithAggregationInput[]
    by: BookListingScalarFieldEnum[] | BookListingScalarFieldEnum
    having?: BookListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookListingCountAggregateInputType | true
    _min?: BookListingMinAggregateInputType
    _max?: BookListingMaxAggregateInputType
  }

  export type BookListingGroupByOutputType = {
    id: string
    title: string
    author: string | null
    isbn: string | null
    condition: string
    location: string
    availableTime: string | null
    description: string | null
    status: $Enums.BookListingStatus
    createdAt: Date
    updatedAt: Date
    giverId: string
    _count: BookListingCountAggregateOutputType | null
    _min: BookListingMinAggregateOutputType | null
    _max: BookListingMaxAggregateOutputType | null
  }

  type GetBookListingGroupByPayload<T extends BookListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookListingGroupByOutputType[P]>
            : GetScalarType<T[P], BookListingGroupByOutputType[P]>
        }
      >
    >


  export type BookListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    condition?: boolean
    location?: boolean
    availableTime?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    giverId?: boolean
    giver?: boolean | UserDefaultArgs<ExtArgs>
    reservation?: boolean | BookListing$reservationArgs<ExtArgs>
  }, ExtArgs["result"]["bookListing"]>

  export type BookListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    condition?: boolean
    location?: boolean
    availableTime?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    giverId?: boolean
    giver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookListing"]>

  export type BookListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    condition?: boolean
    location?: boolean
    availableTime?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    giverId?: boolean
    giver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookListing"]>

  export type BookListingSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    condition?: boolean
    location?: boolean
    availableTime?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    giverId?: boolean
  }

  export type BookListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "isbn" | "condition" | "location" | "availableTime" | "description" | "status" | "createdAt" | "updatedAt" | "giverId", ExtArgs["result"]["bookListing"]>
  export type BookListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    giver?: boolean | UserDefaultArgs<ExtArgs>
    reservation?: boolean | BookListing$reservationArgs<ExtArgs>
  }
  export type BookListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    giver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BookListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    giver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BookListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookListing"
    objects: {
      giver: Prisma.$UserPayload<ExtArgs>
      reservation: Prisma.$ReservationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      author: string | null
      isbn: string | null
      condition: string
      location: string
      availableTime: string | null
      description: string | null
      status: $Enums.BookListingStatus
      createdAt: Date
      updatedAt: Date
      giverId: string
    }, ExtArgs["result"]["bookListing"]>
    composites: {}
  }

  type BookListingGetPayload<S extends boolean | null | undefined | BookListingDefaultArgs> = $Result.GetResult<Prisma.$BookListingPayload, S>

  type BookListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookListingCountAggregateInputType | true
    }

  export interface BookListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookListing'], meta: { name: 'BookListing' } }
    /**
     * Find zero or one BookListing that matches the filter.
     * @param {BookListingFindUniqueArgs} args - Arguments to find a BookListing
     * @example
     * // Get one BookListing
     * const bookListing = await prisma.bookListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookListingFindUniqueArgs>(args: SelectSubset<T, BookListingFindUniqueArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookListingFindUniqueOrThrowArgs} args - Arguments to find a BookListing
     * @example
     * // Get one BookListing
     * const bookListing = await prisma.bookListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookListingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingFindFirstArgs} args - Arguments to find a BookListing
     * @example
     * // Get one BookListing
     * const bookListing = await prisma.bookListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookListingFindFirstArgs>(args?: SelectSubset<T, BookListingFindFirstArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingFindFirstOrThrowArgs} args - Arguments to find a BookListing
     * @example
     * // Get one BookListing
     * const bookListing = await prisma.bookListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookListingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookListings
     * const bookListings = await prisma.bookListing.findMany()
     * 
     * // Get first 10 BookListings
     * const bookListings = await prisma.bookListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookListingWithIdOnly = await prisma.bookListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookListingFindManyArgs>(args?: SelectSubset<T, BookListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookListing.
     * @param {BookListingCreateArgs} args - Arguments to create a BookListing.
     * @example
     * // Create one BookListing
     * const BookListing = await prisma.bookListing.create({
     *   data: {
     *     // ... data to create a BookListing
     *   }
     * })
     * 
     */
    create<T extends BookListingCreateArgs>(args: SelectSubset<T, BookListingCreateArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookListings.
     * @param {BookListingCreateManyArgs} args - Arguments to create many BookListings.
     * @example
     * // Create many BookListings
     * const bookListing = await prisma.bookListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookListingCreateManyArgs>(args?: SelectSubset<T, BookListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookListings and returns the data saved in the database.
     * @param {BookListingCreateManyAndReturnArgs} args - Arguments to create many BookListings.
     * @example
     * // Create many BookListings
     * const bookListing = await prisma.bookListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookListings and only return the `id`
     * const bookListingWithIdOnly = await prisma.bookListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookListingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookListing.
     * @param {BookListingDeleteArgs} args - Arguments to delete one BookListing.
     * @example
     * // Delete one BookListing
     * const BookListing = await prisma.bookListing.delete({
     *   where: {
     *     // ... filter to delete one BookListing
     *   }
     * })
     * 
     */
    delete<T extends BookListingDeleteArgs>(args: SelectSubset<T, BookListingDeleteArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookListing.
     * @param {BookListingUpdateArgs} args - Arguments to update one BookListing.
     * @example
     * // Update one BookListing
     * const bookListing = await prisma.bookListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookListingUpdateArgs>(args: SelectSubset<T, BookListingUpdateArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookListings.
     * @param {BookListingDeleteManyArgs} args - Arguments to filter BookListings to delete.
     * @example
     * // Delete a few BookListings
     * const { count } = await prisma.bookListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookListingDeleteManyArgs>(args?: SelectSubset<T, BookListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookListings
     * const bookListing = await prisma.bookListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookListingUpdateManyArgs>(args: SelectSubset<T, BookListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookListings and returns the data updated in the database.
     * @param {BookListingUpdateManyAndReturnArgs} args - Arguments to update many BookListings.
     * @example
     * // Update many BookListings
     * const bookListing = await prisma.bookListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookListings and only return the `id`
     * const bookListingWithIdOnly = await prisma.bookListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookListingUpdateManyAndReturnArgs>(args: SelectSubset<T, BookListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookListing.
     * @param {BookListingUpsertArgs} args - Arguments to update or create a BookListing.
     * @example
     * // Update or create a BookListing
     * const bookListing = await prisma.bookListing.upsert({
     *   create: {
     *     // ... data to create a BookListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookListing we want to update
     *   }
     * })
     */
    upsert<T extends BookListingUpsertArgs>(args: SelectSubset<T, BookListingUpsertArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingCountArgs} args - Arguments to filter BookListings to count.
     * @example
     * // Count the number of BookListings
     * const count = await prisma.bookListing.count({
     *   where: {
     *     // ... the filter for the BookListings we want to count
     *   }
     * })
    **/
    count<T extends BookListingCountArgs>(
      args?: Subset<T, BookListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookListingAggregateArgs>(args: Subset<T, BookListingAggregateArgs>): Prisma.PrismaPromise<GetBookListingAggregateType<T>>

    /**
     * Group by BookListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookListingGroupByArgs['orderBy'] }
        : { orderBy?: BookListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookListing model
   */
  readonly fields: BookListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    giver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reservation<T extends BookListing$reservationArgs<ExtArgs> = {}>(args?: Subset<T, BookListing$reservationArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookListing model
   */
  interface BookListingFieldRefs {
    readonly id: FieldRef<"BookListing", 'String'>
    readonly title: FieldRef<"BookListing", 'String'>
    readonly author: FieldRef<"BookListing", 'String'>
    readonly isbn: FieldRef<"BookListing", 'String'>
    readonly condition: FieldRef<"BookListing", 'String'>
    readonly location: FieldRef<"BookListing", 'String'>
    readonly availableTime: FieldRef<"BookListing", 'String'>
    readonly description: FieldRef<"BookListing", 'String'>
    readonly status: FieldRef<"BookListing", 'BookListingStatus'>
    readonly createdAt: FieldRef<"BookListing", 'DateTime'>
    readonly updatedAt: FieldRef<"BookListing", 'DateTime'>
    readonly giverId: FieldRef<"BookListing", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BookListing findUnique
   */
  export type BookListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter, which BookListing to fetch.
     */
    where: BookListingWhereUniqueInput
  }

  /**
   * BookListing findUniqueOrThrow
   */
  export type BookListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter, which BookListing to fetch.
     */
    where: BookListingWhereUniqueInput
  }

  /**
   * BookListing findFirst
   */
  export type BookListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter, which BookListing to fetch.
     */
    where?: BookListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookListings to fetch.
     */
    orderBy?: BookListingOrderByWithRelationInput | BookListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookListings.
     */
    cursor?: BookListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookListings.
     */
    distinct?: BookListingScalarFieldEnum | BookListingScalarFieldEnum[]
  }

  /**
   * BookListing findFirstOrThrow
   */
  export type BookListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter, which BookListing to fetch.
     */
    where?: BookListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookListings to fetch.
     */
    orderBy?: BookListingOrderByWithRelationInput | BookListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookListings.
     */
    cursor?: BookListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookListings.
     */
    distinct?: BookListingScalarFieldEnum | BookListingScalarFieldEnum[]
  }

  /**
   * BookListing findMany
   */
  export type BookListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter, which BookListings to fetch.
     */
    where?: BookListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookListings to fetch.
     */
    orderBy?: BookListingOrderByWithRelationInput | BookListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookListings.
     */
    cursor?: BookListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookListings.
     */
    distinct?: BookListingScalarFieldEnum | BookListingScalarFieldEnum[]
  }

  /**
   * BookListing create
   */
  export type BookListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * The data needed to create a BookListing.
     */
    data: XOR<BookListingCreateInput, BookListingUncheckedCreateInput>
  }

  /**
   * BookListing createMany
   */
  export type BookListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookListings.
     */
    data: BookListingCreateManyInput | BookListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookListing createManyAndReturn
   */
  export type BookListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * The data used to create many BookListings.
     */
    data: BookListingCreateManyInput | BookListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookListing update
   */
  export type BookListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * The data needed to update a BookListing.
     */
    data: XOR<BookListingUpdateInput, BookListingUncheckedUpdateInput>
    /**
     * Choose, which BookListing to update.
     */
    where: BookListingWhereUniqueInput
  }

  /**
   * BookListing updateMany
   */
  export type BookListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookListings.
     */
    data: XOR<BookListingUpdateManyMutationInput, BookListingUncheckedUpdateManyInput>
    /**
     * Filter which BookListings to update
     */
    where?: BookListingWhereInput
    /**
     * Limit how many BookListings to update.
     */
    limit?: number
  }

  /**
   * BookListing updateManyAndReturn
   */
  export type BookListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * The data used to update BookListings.
     */
    data: XOR<BookListingUpdateManyMutationInput, BookListingUncheckedUpdateManyInput>
    /**
     * Filter which BookListings to update
     */
    where?: BookListingWhereInput
    /**
     * Limit how many BookListings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookListing upsert
   */
  export type BookListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * The filter to search for the BookListing to update in case it exists.
     */
    where: BookListingWhereUniqueInput
    /**
     * In case the BookListing found by the `where` argument doesn't exist, create a new BookListing with this data.
     */
    create: XOR<BookListingCreateInput, BookListingUncheckedCreateInput>
    /**
     * In case the BookListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookListingUpdateInput, BookListingUncheckedUpdateInput>
  }

  /**
   * BookListing delete
   */
  export type BookListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
    /**
     * Filter which BookListing to delete.
     */
    where: BookListingWhereUniqueInput
  }

  /**
   * BookListing deleteMany
   */
  export type BookListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookListings to delete
     */
    where?: BookListingWhereInput
    /**
     * Limit how many BookListings to delete.
     */
    limit?: number
  }

  /**
   * BookListing.reservation
   */
  export type BookListing$reservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    where?: ReservationWhereInput
  }

  /**
   * BookListing without action
   */
  export type BookListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookListing
     */
    select?: BookListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookListing
     */
    omit?: BookListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookListingInclude<ExtArgs> | null
  }


  /**
   * Model Reservation
   */

  export type AggregateReservation = {
    _count: ReservationCountAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  export type ReservationMinAggregateOutputType = {
    id: string | null
    status: $Enums.ReservationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    bookListingId: string | null
    receiverId: string | null
  }

  export type ReservationMaxAggregateOutputType = {
    id: string | null
    status: $Enums.ReservationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    bookListingId: string | null
    receiverId: string | null
  }

  export type ReservationCountAggregateOutputType = {
    id: number
    status: number
    createdAt: number
    updatedAt: number
    bookListingId: number
    receiverId: number
    _all: number
  }


  export type ReservationMinAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    bookListingId?: true
    receiverId?: true
  }

  export type ReservationMaxAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    bookListingId?: true
    receiverId?: true
  }

  export type ReservationCountAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    bookListingId?: true
    receiverId?: true
    _all?: true
  }

  export type ReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservation to aggregate.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reservations
    **/
    _count?: true | ReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationMaxAggregateInputType
  }

  export type GetReservationAggregateType<T extends ReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservation[P]>
      : GetScalarType<T[P], AggregateReservation[P]>
  }




  export type ReservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservationWhereInput
    orderBy?: ReservationOrderByWithAggregationInput | ReservationOrderByWithAggregationInput[]
    by: ReservationScalarFieldEnum[] | ReservationScalarFieldEnum
    having?: ReservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationCountAggregateInputType | true
    _min?: ReservationMinAggregateInputType
    _max?: ReservationMaxAggregateInputType
  }

  export type ReservationGroupByOutputType = {
    id: string
    status: $Enums.ReservationStatus
    createdAt: Date
    updatedAt: Date
    bookListingId: string
    receiverId: string
    _count: ReservationCountAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  type GetReservationGroupByPayload<T extends ReservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationGroupByOutputType[P]>
        }
      >
    >


  export type ReservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookListingId?: boolean
    receiverId?: boolean
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Reservation$messagesArgs<ExtArgs>
    _count?: boolean | ReservationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookListingId?: boolean
    receiverId?: boolean
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookListingId?: boolean
    receiverId?: boolean
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type ReservationSelectScalar = {
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookListingId?: boolean
    receiverId?: boolean
  }

  export type ReservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "createdAt" | "updatedAt" | "bookListingId" | "receiverId", ExtArgs["result"]["reservation"]>
  export type ReservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Reservation$messagesArgs<ExtArgs>
    _count?: boolean | ReservationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookListing?: boolean | BookListingDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reservation"
    objects: {
      bookListing: Prisma.$BookListingPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.ReservationStatus
      createdAt: Date
      updatedAt: Date
      bookListingId: string
      receiverId: string
    }, ExtArgs["result"]["reservation"]>
    composites: {}
  }

  type ReservationGetPayload<S extends boolean | null | undefined | ReservationDefaultArgs> = $Result.GetResult<Prisma.$ReservationPayload, S>

  type ReservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReservationCountAggregateInputType | true
    }

  export interface ReservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reservation'], meta: { name: 'Reservation' } }
    /**
     * Find zero or one Reservation that matches the filter.
     * @param {ReservationFindUniqueArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservationFindUniqueArgs>(args: SelectSubset<T, ReservationFindUniqueArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReservationFindUniqueOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservationFindFirstArgs>(args?: SelectSubset<T, ReservationFindFirstArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindFirstOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservations
     * const reservations = await prisma.reservation.findMany()
     * 
     * // Get first 10 Reservations
     * const reservations = await prisma.reservation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reservationWithIdOnly = await prisma.reservation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReservationFindManyArgs>(args?: SelectSubset<T, ReservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reservation.
     * @param {ReservationCreateArgs} args - Arguments to create a Reservation.
     * @example
     * // Create one Reservation
     * const Reservation = await prisma.reservation.create({
     *   data: {
     *     // ... data to create a Reservation
     *   }
     * })
     * 
     */
    create<T extends ReservationCreateArgs>(args: SelectSubset<T, ReservationCreateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reservations.
     * @param {ReservationCreateManyArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservationCreateManyArgs>(args?: SelectSubset<T, ReservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservations and returns the data saved in the database.
     * @param {ReservationCreateManyAndReturnArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservations and only return the `id`
     * const reservationWithIdOnly = await prisma.reservation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reservation.
     * @param {ReservationDeleteArgs} args - Arguments to delete one Reservation.
     * @example
     * // Delete one Reservation
     * const Reservation = await prisma.reservation.delete({
     *   where: {
     *     // ... filter to delete one Reservation
     *   }
     * })
     * 
     */
    delete<T extends ReservationDeleteArgs>(args: SelectSubset<T, ReservationDeleteArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reservation.
     * @param {ReservationUpdateArgs} args - Arguments to update one Reservation.
     * @example
     * // Update one Reservation
     * const reservation = await prisma.reservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservationUpdateArgs>(args: SelectSubset<T, ReservationUpdateArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reservations.
     * @param {ReservationDeleteManyArgs} args - Arguments to filter Reservations to delete.
     * @example
     * // Delete a few Reservations
     * const { count } = await prisma.reservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservationDeleteManyArgs>(args?: SelectSubset<T, ReservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservationUpdateManyArgs>(args: SelectSubset<T, ReservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations and returns the data updated in the database.
     * @param {ReservationUpdateManyAndReturnArgs} args - Arguments to update many Reservations.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reservations and only return the `id`
     * const reservationWithIdOnly = await prisma.reservation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReservationUpdateManyAndReturnArgs>(args: SelectSubset<T, ReservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reservation.
     * @param {ReservationUpsertArgs} args - Arguments to update or create a Reservation.
     * @example
     * // Update or create a Reservation
     * const reservation = await prisma.reservation.upsert({
     *   create: {
     *     // ... data to create a Reservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reservation we want to update
     *   }
     * })
     */
    upsert<T extends ReservationUpsertArgs>(args: SelectSubset<T, ReservationUpsertArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationCountArgs} args - Arguments to filter Reservations to count.
     * @example
     * // Count the number of Reservations
     * const count = await prisma.reservation.count({
     *   where: {
     *     // ... the filter for the Reservations we want to count
     *   }
     * })
    **/
    count<T extends ReservationCountArgs>(
      args?: Subset<T, ReservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationAggregateArgs>(args: Subset<T, ReservationAggregateArgs>): Prisma.PrismaPromise<GetReservationAggregateType<T>>

    /**
     * Group by Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservationGroupByArgs['orderBy'] }
        : { orderBy?: ReservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reservation model
   */
  readonly fields: ReservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookListing<T extends BookListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookListingDefaultArgs<ExtArgs>>): Prisma__BookListingClient<$Result.GetResult<Prisma.$BookListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    messages<T extends Reservation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Reservation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reservation model
   */
  interface ReservationFieldRefs {
    readonly id: FieldRef<"Reservation", 'String'>
    readonly status: FieldRef<"Reservation", 'ReservationStatus'>
    readonly createdAt: FieldRef<"Reservation", 'DateTime'>
    readonly updatedAt: FieldRef<"Reservation", 'DateTime'>
    readonly bookListingId: FieldRef<"Reservation", 'String'>
    readonly receiverId: FieldRef<"Reservation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Reservation findUnique
   */
  export type ReservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findUniqueOrThrow
   */
  export type ReservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation findFirst
   */
  export type ReservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findFirstOrThrow
   */
  export type ReservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservation to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation findMany
   */
  export type ReservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter, which Reservations to fetch.
     */
    where?: ReservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservations to fetch.
     */
    orderBy?: ReservationOrderByWithRelationInput | ReservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reservations.
     */
    cursor?: ReservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * Reservation create
   */
  export type ReservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to create a Reservation.
     */
    data: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
  }

  /**
   * Reservation createMany
   */
  export type ReservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reservation createManyAndReturn
   */
  export type ReservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * The data used to create many Reservations.
     */
    data: ReservationCreateManyInput | ReservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reservation update
   */
  export type ReservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The data needed to update a Reservation.
     */
    data: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
    /**
     * Choose, which Reservation to update.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation updateMany
   */
  export type ReservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reservations.
     */
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyInput>
    /**
     * Filter which Reservations to update
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to update.
     */
    limit?: number
  }

  /**
   * Reservation updateManyAndReturn
   */
  export type ReservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * The data used to update Reservations.
     */
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyInput>
    /**
     * Filter which Reservations to update
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reservation upsert
   */
  export type ReservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * The filter to search for the Reservation to update in case it exists.
     */
    where: ReservationWhereUniqueInput
    /**
     * In case the Reservation found by the `where` argument doesn't exist, create a new Reservation with this data.
     */
    create: XOR<ReservationCreateInput, ReservationUncheckedCreateInput>
    /**
     * In case the Reservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservationUpdateInput, ReservationUncheckedUpdateInput>
  }

  /**
   * Reservation delete
   */
  export type ReservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
    /**
     * Filter which Reservation to delete.
     */
    where: ReservationWhereUniqueInput
  }

  /**
   * Reservation deleteMany
   */
  export type ReservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservations to delete
     */
    where?: ReservationWhereInput
    /**
     * Limit how many Reservations to delete.
     */
    limit?: number
  }

  /**
   * Reservation.messages
   */
  export type Reservation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Reservation without action
   */
  export type ReservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reservation
     */
    select?: ReservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reservation
     */
    omit?: ReservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    reservationId: string | null
    senderId: string | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    content: string | null
    createdAt: Date | null
    reservationId: string | null
    senderId: string | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    reservationId: number
    senderId: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    reservationId?: true
    senderId?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    reservationId?: true
    senderId?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    reservationId?: true
    senderId?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    content: string
    createdAt: Date
    reservationId: string
    senderId: string
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    reservationId?: boolean
    senderId?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    reservationId?: boolean
    senderId?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    reservationId?: boolean
    senderId?: boolean
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    reservationId?: boolean
    senderId?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "reservationId" | "senderId", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | ReservationDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      reservation: Prisma.$ReservationPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      createdAt: Date
      reservationId: string
      senderId: string
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservation<T extends ReservationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReservationDefaultArgs<ExtArgs>>): Prisma__ReservationClient<$Result.GetResult<Prisma.$ReservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly reservationId: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model TokenTransaction
   */

  export type AggregateTokenTransaction = {
    _count: TokenTransactionCountAggregateOutputType | null
    _avg: TokenTransactionAvgAggregateOutputType | null
    _sum: TokenTransactionSumAggregateOutputType | null
    _min: TokenTransactionMinAggregateOutputType | null
    _max: TokenTransactionMaxAggregateOutputType | null
  }

  export type TokenTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TokenTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TokenTransactionMinAggregateOutputType = {
    id: string | null
    amount: number | null
    note: string | null
    createdAt: Date | null
    fromUserId: string | null
    toUserId: string | null
  }

  export type TokenTransactionMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    note: string | null
    createdAt: Date | null
    fromUserId: string | null
    toUserId: string | null
  }

  export type TokenTransactionCountAggregateOutputType = {
    id: number
    amount: number
    note: number
    createdAt: number
    fromUserId: number
    toUserId: number
    _all: number
  }


  export type TokenTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TokenTransactionSumAggregateInputType = {
    amount?: true
  }

  export type TokenTransactionMinAggregateInputType = {
    id?: true
    amount?: true
    note?: true
    createdAt?: true
    fromUserId?: true
    toUserId?: true
  }

  export type TokenTransactionMaxAggregateInputType = {
    id?: true
    amount?: true
    note?: true
    createdAt?: true
    fromUserId?: true
    toUserId?: true
  }

  export type TokenTransactionCountAggregateInputType = {
    id?: true
    amount?: true
    note?: true
    createdAt?: true
    fromUserId?: true
    toUserId?: true
    _all?: true
  }

  export type TokenTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenTransaction to aggregate.
     */
    where?: TokenTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenTransactions to fetch.
     */
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenTransactions
    **/
    _count?: true | TokenTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenTransactionMaxAggregateInputType
  }

  export type GetTokenTransactionAggregateType<T extends TokenTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenTransaction[P]>
      : GetScalarType<T[P], AggregateTokenTransaction[P]>
  }




  export type TokenTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenTransactionWhereInput
    orderBy?: TokenTransactionOrderByWithAggregationInput | TokenTransactionOrderByWithAggregationInput[]
    by: TokenTransactionScalarFieldEnum[] | TokenTransactionScalarFieldEnum
    having?: TokenTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenTransactionCountAggregateInputType | true
    _avg?: TokenTransactionAvgAggregateInputType
    _sum?: TokenTransactionSumAggregateInputType
    _min?: TokenTransactionMinAggregateInputType
    _max?: TokenTransactionMaxAggregateInputType
  }

  export type TokenTransactionGroupByOutputType = {
    id: string
    amount: number
    note: string | null
    createdAt: Date
    fromUserId: string | null
    toUserId: string
    _count: TokenTransactionCountAggregateOutputType | null
    _avg: TokenTransactionAvgAggregateOutputType | null
    _sum: TokenTransactionSumAggregateOutputType | null
    _min: TokenTransactionMinAggregateOutputType | null
    _max: TokenTransactionMaxAggregateOutputType | null
  }

  type GetTokenTransactionGroupByPayload<T extends TokenTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TokenTransactionGroupByOutputType[P]>
        }
      >
    >


  export type TokenTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    note?: boolean
    createdAt?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenTransaction"]>

  export type TokenTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    note?: boolean
    createdAt?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenTransaction"]>

  export type TokenTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    note?: boolean
    createdAt?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenTransaction"]>

  export type TokenTransactionSelectScalar = {
    id?: boolean
    amount?: boolean
    note?: boolean
    createdAt?: boolean
    fromUserId?: boolean
    toUserId?: boolean
  }

  export type TokenTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "note" | "createdAt" | "fromUserId" | "toUserId", ExtArgs["result"]["tokenTransaction"]>
  export type TokenTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | TokenTransaction$fromUserArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenTransaction"
    objects: {
      fromUser: Prisma.$UserPayload<ExtArgs> | null
      toUser: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      note: string | null
      createdAt: Date
      fromUserId: string | null
      toUserId: string
    }, ExtArgs["result"]["tokenTransaction"]>
    composites: {}
  }

  type TokenTransactionGetPayload<S extends boolean | null | undefined | TokenTransactionDefaultArgs> = $Result.GetResult<Prisma.$TokenTransactionPayload, S>

  type TokenTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenTransactionCountAggregateInputType | true
    }

  export interface TokenTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenTransaction'], meta: { name: 'TokenTransaction' } }
    /**
     * Find zero or one TokenTransaction that matches the filter.
     * @param {TokenTransactionFindUniqueArgs} args - Arguments to find a TokenTransaction
     * @example
     * // Get one TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenTransactionFindUniqueArgs>(args: SelectSubset<T, TokenTransactionFindUniqueArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenTransactionFindUniqueOrThrowArgs} args - Arguments to find a TokenTransaction
     * @example
     * // Get one TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionFindFirstArgs} args - Arguments to find a TokenTransaction
     * @example
     * // Get one TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenTransactionFindFirstArgs>(args?: SelectSubset<T, TokenTransactionFindFirstArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionFindFirstOrThrowArgs} args - Arguments to find a TokenTransaction
     * @example
     * // Get one TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenTransactions
     * const tokenTransactions = await prisma.tokenTransaction.findMany()
     * 
     * // Get first 10 TokenTransactions
     * const tokenTransactions = await prisma.tokenTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenTransactionWithIdOnly = await prisma.tokenTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenTransactionFindManyArgs>(args?: SelectSubset<T, TokenTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenTransaction.
     * @param {TokenTransactionCreateArgs} args - Arguments to create a TokenTransaction.
     * @example
     * // Create one TokenTransaction
     * const TokenTransaction = await prisma.tokenTransaction.create({
     *   data: {
     *     // ... data to create a TokenTransaction
     *   }
     * })
     * 
     */
    create<T extends TokenTransactionCreateArgs>(args: SelectSubset<T, TokenTransactionCreateArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenTransactions.
     * @param {TokenTransactionCreateManyArgs} args - Arguments to create many TokenTransactions.
     * @example
     * // Create many TokenTransactions
     * const tokenTransaction = await prisma.tokenTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenTransactionCreateManyArgs>(args?: SelectSubset<T, TokenTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TokenTransactions and returns the data saved in the database.
     * @param {TokenTransactionCreateManyAndReturnArgs} args - Arguments to create many TokenTransactions.
     * @example
     * // Create many TokenTransactions
     * const tokenTransaction = await prisma.tokenTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TokenTransactions and only return the `id`
     * const tokenTransactionWithIdOnly = await prisma.tokenTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TokenTransaction.
     * @param {TokenTransactionDeleteArgs} args - Arguments to delete one TokenTransaction.
     * @example
     * // Delete one TokenTransaction
     * const TokenTransaction = await prisma.tokenTransaction.delete({
     *   where: {
     *     // ... filter to delete one TokenTransaction
     *   }
     * })
     * 
     */
    delete<T extends TokenTransactionDeleteArgs>(args: SelectSubset<T, TokenTransactionDeleteArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenTransaction.
     * @param {TokenTransactionUpdateArgs} args - Arguments to update one TokenTransaction.
     * @example
     * // Update one TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenTransactionUpdateArgs>(args: SelectSubset<T, TokenTransactionUpdateArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenTransactions.
     * @param {TokenTransactionDeleteManyArgs} args - Arguments to filter TokenTransactions to delete.
     * @example
     * // Delete a few TokenTransactions
     * const { count } = await prisma.tokenTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenTransactionDeleteManyArgs>(args?: SelectSubset<T, TokenTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenTransactions
     * const tokenTransaction = await prisma.tokenTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenTransactionUpdateManyArgs>(args: SelectSubset<T, TokenTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenTransactions and returns the data updated in the database.
     * @param {TokenTransactionUpdateManyAndReturnArgs} args - Arguments to update many TokenTransactions.
     * @example
     * // Update many TokenTransactions
     * const tokenTransaction = await prisma.tokenTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TokenTransactions and only return the `id`
     * const tokenTransactionWithIdOnly = await prisma.tokenTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TokenTransaction.
     * @param {TokenTransactionUpsertArgs} args - Arguments to update or create a TokenTransaction.
     * @example
     * // Update or create a TokenTransaction
     * const tokenTransaction = await prisma.tokenTransaction.upsert({
     *   create: {
     *     // ... data to create a TokenTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenTransaction we want to update
     *   }
     * })
     */
    upsert<T extends TokenTransactionUpsertArgs>(args: SelectSubset<T, TokenTransactionUpsertArgs<ExtArgs>>): Prisma__TokenTransactionClient<$Result.GetResult<Prisma.$TokenTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionCountArgs} args - Arguments to filter TokenTransactions to count.
     * @example
     * // Count the number of TokenTransactions
     * const count = await prisma.tokenTransaction.count({
     *   where: {
     *     // ... the filter for the TokenTransactions we want to count
     *   }
     * })
    **/
    count<T extends TokenTransactionCountArgs>(
      args?: Subset<T, TokenTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenTransactionAggregateArgs>(args: Subset<T, TokenTransactionAggregateArgs>): Prisma.PrismaPromise<GetTokenTransactionAggregateType<T>>

    /**
     * Group by TokenTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenTransactionGroupByArgs['orderBy'] }
        : { orderBy?: TokenTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenTransaction model
   */
  readonly fields: TokenTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromUser<T extends TokenTransaction$fromUserArgs<ExtArgs> = {}>(args?: Subset<T, TokenTransaction$fromUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    toUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenTransaction model
   */
  interface TokenTransactionFieldRefs {
    readonly id: FieldRef<"TokenTransaction", 'String'>
    readonly amount: FieldRef<"TokenTransaction", 'Int'>
    readonly note: FieldRef<"TokenTransaction", 'String'>
    readonly createdAt: FieldRef<"TokenTransaction", 'DateTime'>
    readonly fromUserId: FieldRef<"TokenTransaction", 'String'>
    readonly toUserId: FieldRef<"TokenTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TokenTransaction findUnique
   */
  export type TokenTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TokenTransaction to fetch.
     */
    where: TokenTransactionWhereUniqueInput
  }

  /**
   * TokenTransaction findUniqueOrThrow
   */
  export type TokenTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TokenTransaction to fetch.
     */
    where: TokenTransactionWhereUniqueInput
  }

  /**
   * TokenTransaction findFirst
   */
  export type TokenTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TokenTransaction to fetch.
     */
    where?: TokenTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenTransactions to fetch.
     */
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenTransactions.
     */
    cursor?: TokenTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenTransactions.
     */
    distinct?: TokenTransactionScalarFieldEnum | TokenTransactionScalarFieldEnum[]
  }

  /**
   * TokenTransaction findFirstOrThrow
   */
  export type TokenTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TokenTransaction to fetch.
     */
    where?: TokenTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenTransactions to fetch.
     */
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenTransactions.
     */
    cursor?: TokenTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenTransactions.
     */
    distinct?: TokenTransactionScalarFieldEnum | TokenTransactionScalarFieldEnum[]
  }

  /**
   * TokenTransaction findMany
   */
  export type TokenTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter, which TokenTransactions to fetch.
     */
    where?: TokenTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenTransactions to fetch.
     */
    orderBy?: TokenTransactionOrderByWithRelationInput | TokenTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenTransactions.
     */
    cursor?: TokenTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenTransactions.
     */
    distinct?: TokenTransactionScalarFieldEnum | TokenTransactionScalarFieldEnum[]
  }

  /**
   * TokenTransaction create
   */
  export type TokenTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenTransaction.
     */
    data: XOR<TokenTransactionCreateInput, TokenTransactionUncheckedCreateInput>
  }

  /**
   * TokenTransaction createMany
   */
  export type TokenTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenTransactions.
     */
    data: TokenTransactionCreateManyInput | TokenTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenTransaction createManyAndReturn
   */
  export type TokenTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many TokenTransactions.
     */
    data: TokenTransactionCreateManyInput | TokenTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenTransaction update
   */
  export type TokenTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenTransaction.
     */
    data: XOR<TokenTransactionUpdateInput, TokenTransactionUncheckedUpdateInput>
    /**
     * Choose, which TokenTransaction to update.
     */
    where: TokenTransactionWhereUniqueInput
  }

  /**
   * TokenTransaction updateMany
   */
  export type TokenTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenTransactions.
     */
    data: XOR<TokenTransactionUpdateManyMutationInput, TokenTransactionUncheckedUpdateManyInput>
    /**
     * Filter which TokenTransactions to update
     */
    where?: TokenTransactionWhereInput
    /**
     * Limit how many TokenTransactions to update.
     */
    limit?: number
  }

  /**
   * TokenTransaction updateManyAndReturn
   */
  export type TokenTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * The data used to update TokenTransactions.
     */
    data: XOR<TokenTransactionUpdateManyMutationInput, TokenTransactionUncheckedUpdateManyInput>
    /**
     * Filter which TokenTransactions to update
     */
    where?: TokenTransactionWhereInput
    /**
     * Limit how many TokenTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TokenTransaction upsert
   */
  export type TokenTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenTransaction to update in case it exists.
     */
    where: TokenTransactionWhereUniqueInput
    /**
     * In case the TokenTransaction found by the `where` argument doesn't exist, create a new TokenTransaction with this data.
     */
    create: XOR<TokenTransactionCreateInput, TokenTransactionUncheckedCreateInput>
    /**
     * In case the TokenTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenTransactionUpdateInput, TokenTransactionUncheckedUpdateInput>
  }

  /**
   * TokenTransaction delete
   */
  export type TokenTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
    /**
     * Filter which TokenTransaction to delete.
     */
    where: TokenTransactionWhereUniqueInput
  }

  /**
   * TokenTransaction deleteMany
   */
  export type TokenTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenTransactions to delete
     */
    where?: TokenTransactionWhereInput
    /**
     * Limit how many TokenTransactions to delete.
     */
    limit?: number
  }

  /**
   * TokenTransaction.fromUser
   */
  export type TokenTransaction$fromUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TokenTransaction without action
   */
  export type TokenTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenTransaction
     */
    select?: TokenTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenTransaction
     */
    omit?: TokenTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenTransactionInclude<ExtArgs> | null
  }


  /**
   * Model WishListing
   */

  export type AggregateWishListing = {
    _count: WishListingCountAggregateOutputType | null
    _min: WishListingMinAggregateOutputType | null
    _max: WishListingMaxAggregateOutputType | null
  }

  export type WishListingMinAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    isbn: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    requesterId: string | null
  }

  export type WishListingMaxAggregateOutputType = {
    id: string | null
    title: string | null
    author: string | null
    isbn: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    requesterId: string | null
  }

  export type WishListingCountAggregateOutputType = {
    id: number
    title: number
    author: number
    isbn: number
    description: number
    createdAt: number
    updatedAt: number
    requesterId: number
    _all: number
  }


  export type WishListingMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    requesterId?: true
  }

  export type WishListingMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    requesterId?: true
  }

  export type WishListingCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    isbn?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    requesterId?: true
    _all?: true
  }

  export type WishListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WishListing to aggregate.
     */
    where?: WishListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishListings to fetch.
     */
    orderBy?: WishListingOrderByWithRelationInput | WishListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WishListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WishListings
    **/
    _count?: true | WishListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WishListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WishListingMaxAggregateInputType
  }

  export type GetWishListingAggregateType<T extends WishListingAggregateArgs> = {
        [P in keyof T & keyof AggregateWishListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWishListing[P]>
      : GetScalarType<T[P], AggregateWishListing[P]>
  }




  export type WishListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishListingWhereInput
    orderBy?: WishListingOrderByWithAggregationInput | WishListingOrderByWithAggregationInput[]
    by: WishListingScalarFieldEnum[] | WishListingScalarFieldEnum
    having?: WishListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WishListingCountAggregateInputType | true
    _min?: WishListingMinAggregateInputType
    _max?: WishListingMaxAggregateInputType
  }

  export type WishListingGroupByOutputType = {
    id: string
    title: string
    author: string | null
    isbn: string | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    requesterId: string
    _count: WishListingCountAggregateOutputType | null
    _min: WishListingMinAggregateOutputType | null
    _max: WishListingMaxAggregateOutputType | null
  }

  type GetWishListingGroupByPayload<T extends WishListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WishListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WishListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WishListingGroupByOutputType[P]>
            : GetScalarType<T[P], WishListingGroupByOutputType[P]>
        }
      >
    >


  export type WishListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterId?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishListing"]>

  export type WishListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterId?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishListing"]>

  export type WishListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterId?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishListing"]>

  export type WishListingSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    isbn?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requesterId?: boolean
  }

  export type WishListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "author" | "isbn" | "description" | "createdAt" | "updatedAt" | "requesterId", ExtArgs["result"]["wishListing"]>
  export type WishListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WishListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WishListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WishListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WishListing"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      author: string | null
      isbn: string | null
      description: string | null
      createdAt: Date
      updatedAt: Date
      requesterId: string
    }, ExtArgs["result"]["wishListing"]>
    composites: {}
  }

  type WishListingGetPayload<S extends boolean | null | undefined | WishListingDefaultArgs> = $Result.GetResult<Prisma.$WishListingPayload, S>

  type WishListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WishListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WishListingCountAggregateInputType | true
    }

  export interface WishListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WishListing'], meta: { name: 'WishListing' } }
    /**
     * Find zero or one WishListing that matches the filter.
     * @param {WishListingFindUniqueArgs} args - Arguments to find a WishListing
     * @example
     * // Get one WishListing
     * const wishListing = await prisma.wishListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WishListingFindUniqueArgs>(args: SelectSubset<T, WishListingFindUniqueArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WishListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WishListingFindUniqueOrThrowArgs} args - Arguments to find a WishListing
     * @example
     * // Get one WishListing
     * const wishListing = await prisma.wishListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WishListingFindUniqueOrThrowArgs>(args: SelectSubset<T, WishListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WishListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingFindFirstArgs} args - Arguments to find a WishListing
     * @example
     * // Get one WishListing
     * const wishListing = await prisma.wishListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WishListingFindFirstArgs>(args?: SelectSubset<T, WishListingFindFirstArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WishListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingFindFirstOrThrowArgs} args - Arguments to find a WishListing
     * @example
     * // Get one WishListing
     * const wishListing = await prisma.wishListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WishListingFindFirstOrThrowArgs>(args?: SelectSubset<T, WishListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WishListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WishListings
     * const wishListings = await prisma.wishListing.findMany()
     * 
     * // Get first 10 WishListings
     * const wishListings = await prisma.wishListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wishListingWithIdOnly = await prisma.wishListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WishListingFindManyArgs>(args?: SelectSubset<T, WishListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WishListing.
     * @param {WishListingCreateArgs} args - Arguments to create a WishListing.
     * @example
     * // Create one WishListing
     * const WishListing = await prisma.wishListing.create({
     *   data: {
     *     // ... data to create a WishListing
     *   }
     * })
     * 
     */
    create<T extends WishListingCreateArgs>(args: SelectSubset<T, WishListingCreateArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WishListings.
     * @param {WishListingCreateManyArgs} args - Arguments to create many WishListings.
     * @example
     * // Create many WishListings
     * const wishListing = await prisma.wishListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WishListingCreateManyArgs>(args?: SelectSubset<T, WishListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WishListings and returns the data saved in the database.
     * @param {WishListingCreateManyAndReturnArgs} args - Arguments to create many WishListings.
     * @example
     * // Create many WishListings
     * const wishListing = await prisma.wishListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WishListings and only return the `id`
     * const wishListingWithIdOnly = await prisma.wishListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WishListingCreateManyAndReturnArgs>(args?: SelectSubset<T, WishListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WishListing.
     * @param {WishListingDeleteArgs} args - Arguments to delete one WishListing.
     * @example
     * // Delete one WishListing
     * const WishListing = await prisma.wishListing.delete({
     *   where: {
     *     // ... filter to delete one WishListing
     *   }
     * })
     * 
     */
    delete<T extends WishListingDeleteArgs>(args: SelectSubset<T, WishListingDeleteArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WishListing.
     * @param {WishListingUpdateArgs} args - Arguments to update one WishListing.
     * @example
     * // Update one WishListing
     * const wishListing = await prisma.wishListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WishListingUpdateArgs>(args: SelectSubset<T, WishListingUpdateArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WishListings.
     * @param {WishListingDeleteManyArgs} args - Arguments to filter WishListings to delete.
     * @example
     * // Delete a few WishListings
     * const { count } = await prisma.wishListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WishListingDeleteManyArgs>(args?: SelectSubset<T, WishListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WishListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WishListings
     * const wishListing = await prisma.wishListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WishListingUpdateManyArgs>(args: SelectSubset<T, WishListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WishListings and returns the data updated in the database.
     * @param {WishListingUpdateManyAndReturnArgs} args - Arguments to update many WishListings.
     * @example
     * // Update many WishListings
     * const wishListing = await prisma.wishListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WishListings and only return the `id`
     * const wishListingWithIdOnly = await prisma.wishListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WishListingUpdateManyAndReturnArgs>(args: SelectSubset<T, WishListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WishListing.
     * @param {WishListingUpsertArgs} args - Arguments to update or create a WishListing.
     * @example
     * // Update or create a WishListing
     * const wishListing = await prisma.wishListing.upsert({
     *   create: {
     *     // ... data to create a WishListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WishListing we want to update
     *   }
     * })
     */
    upsert<T extends WishListingUpsertArgs>(args: SelectSubset<T, WishListingUpsertArgs<ExtArgs>>): Prisma__WishListingClient<$Result.GetResult<Prisma.$WishListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WishListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingCountArgs} args - Arguments to filter WishListings to count.
     * @example
     * // Count the number of WishListings
     * const count = await prisma.wishListing.count({
     *   where: {
     *     // ... the filter for the WishListings we want to count
     *   }
     * })
    **/
    count<T extends WishListingCountArgs>(
      args?: Subset<T, WishListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WishListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WishListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WishListingAggregateArgs>(args: Subset<T, WishListingAggregateArgs>): Prisma.PrismaPromise<GetWishListingAggregateType<T>>

    /**
     * Group by WishListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WishListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WishListingGroupByArgs['orderBy'] }
        : { orderBy?: WishListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WishListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWishListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WishListing model
   */
  readonly fields: WishListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WishListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WishListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WishListing model
   */
  interface WishListingFieldRefs {
    readonly id: FieldRef<"WishListing", 'String'>
    readonly title: FieldRef<"WishListing", 'String'>
    readonly author: FieldRef<"WishListing", 'String'>
    readonly isbn: FieldRef<"WishListing", 'String'>
    readonly description: FieldRef<"WishListing", 'String'>
    readonly createdAt: FieldRef<"WishListing", 'DateTime'>
    readonly updatedAt: FieldRef<"WishListing", 'DateTime'>
    readonly requesterId: FieldRef<"WishListing", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WishListing findUnique
   */
  export type WishListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter, which WishListing to fetch.
     */
    where: WishListingWhereUniqueInput
  }

  /**
   * WishListing findUniqueOrThrow
   */
  export type WishListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter, which WishListing to fetch.
     */
    where: WishListingWhereUniqueInput
  }

  /**
   * WishListing findFirst
   */
  export type WishListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter, which WishListing to fetch.
     */
    where?: WishListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishListings to fetch.
     */
    orderBy?: WishListingOrderByWithRelationInput | WishListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WishListings.
     */
    cursor?: WishListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WishListings.
     */
    distinct?: WishListingScalarFieldEnum | WishListingScalarFieldEnum[]
  }

  /**
   * WishListing findFirstOrThrow
   */
  export type WishListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter, which WishListing to fetch.
     */
    where?: WishListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishListings to fetch.
     */
    orderBy?: WishListingOrderByWithRelationInput | WishListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WishListings.
     */
    cursor?: WishListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WishListings.
     */
    distinct?: WishListingScalarFieldEnum | WishListingScalarFieldEnum[]
  }

  /**
   * WishListing findMany
   */
  export type WishListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter, which WishListings to fetch.
     */
    where?: WishListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WishListings to fetch.
     */
    orderBy?: WishListingOrderByWithRelationInput | WishListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WishListings.
     */
    cursor?: WishListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WishListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WishListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WishListings.
     */
    distinct?: WishListingScalarFieldEnum | WishListingScalarFieldEnum[]
  }

  /**
   * WishListing create
   */
  export type WishListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * The data needed to create a WishListing.
     */
    data: XOR<WishListingCreateInput, WishListingUncheckedCreateInput>
  }

  /**
   * WishListing createMany
   */
  export type WishListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WishListings.
     */
    data: WishListingCreateManyInput | WishListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WishListing createManyAndReturn
   */
  export type WishListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * The data used to create many WishListings.
     */
    data: WishListingCreateManyInput | WishListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WishListing update
   */
  export type WishListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * The data needed to update a WishListing.
     */
    data: XOR<WishListingUpdateInput, WishListingUncheckedUpdateInput>
    /**
     * Choose, which WishListing to update.
     */
    where: WishListingWhereUniqueInput
  }

  /**
   * WishListing updateMany
   */
  export type WishListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WishListings.
     */
    data: XOR<WishListingUpdateManyMutationInput, WishListingUncheckedUpdateManyInput>
    /**
     * Filter which WishListings to update
     */
    where?: WishListingWhereInput
    /**
     * Limit how many WishListings to update.
     */
    limit?: number
  }

  /**
   * WishListing updateManyAndReturn
   */
  export type WishListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * The data used to update WishListings.
     */
    data: XOR<WishListingUpdateManyMutationInput, WishListingUncheckedUpdateManyInput>
    /**
     * Filter which WishListings to update
     */
    where?: WishListingWhereInput
    /**
     * Limit how many WishListings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WishListing upsert
   */
  export type WishListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * The filter to search for the WishListing to update in case it exists.
     */
    where: WishListingWhereUniqueInput
    /**
     * In case the WishListing found by the `where` argument doesn't exist, create a new WishListing with this data.
     */
    create: XOR<WishListingCreateInput, WishListingUncheckedCreateInput>
    /**
     * In case the WishListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WishListingUpdateInput, WishListingUncheckedUpdateInput>
  }

  /**
   * WishListing delete
   */
  export type WishListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
    /**
     * Filter which WishListing to delete.
     */
    where: WishListingWhereUniqueInput
  }

  /**
   * WishListing deleteMany
   */
  export type WishListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WishListings to delete
     */
    where?: WishListingWhereInput
    /**
     * Limit how many WishListings to delete.
     */
    limit?: number
  }

  /**
   * WishListing without action
   */
  export type WishListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WishListing
     */
    select?: WishListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WishListing
     */
    omit?: WishListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishListingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    image: 'image',
    walletAddress: 'walletAddress',
    createdAt: 'createdAt',
    tokenBalance: 'tokenBalance'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BookListingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    condition: 'condition',
    location: 'location',
    availableTime: 'availableTime',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    giverId: 'giverId'
  };

  export type BookListingScalarFieldEnum = (typeof BookListingScalarFieldEnum)[keyof typeof BookListingScalarFieldEnum]


  export const ReservationScalarFieldEnum: {
    id: 'id',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    bookListingId: 'bookListingId',
    receiverId: 'receiverId'
  };

  export type ReservationScalarFieldEnum = (typeof ReservationScalarFieldEnum)[keyof typeof ReservationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    reservationId: 'reservationId',
    senderId: 'senderId'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const TokenTransactionScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    note: 'note',
    createdAt: 'createdAt',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId'
  };

  export type TokenTransactionScalarFieldEnum = (typeof TokenTransactionScalarFieldEnum)[keyof typeof TokenTransactionScalarFieldEnum]


  export const WishListingScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    isbn: 'isbn',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    requesterId: 'requesterId'
  };

  export type WishListingScalarFieldEnum = (typeof WishListingScalarFieldEnum)[keyof typeof WishListingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BookListingStatus'
   */
  export type EnumBookListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookListingStatus'>
    


  /**
   * Reference to a field of type 'BookListingStatus[]'
   */
  export type ListEnumBookListingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookListingStatus[]'>
    


  /**
   * Reference to a field of type 'ReservationStatus'
   */
  export type EnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus'>
    


  /**
   * Reference to a field of type 'ReservationStatus[]'
   */
  export type ListEnumReservationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReservationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    walletAddress?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    tokenBalance?: IntFilter<"User"> | number
    bookListings?: BookListingListRelationFilter
    reservations?: ReservationListRelationFilter
    sentMessages?: MessageListRelationFilter
    sentTransactions?: TokenTransactionListRelationFilter
    receivedTransactions?: TokenTransactionListRelationFilter
    wishListings?: WishListingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    walletAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tokenBalance?: SortOrder
    bookListings?: BookListingOrderByRelationAggregateInput
    reservations?: ReservationOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    sentTransactions?: TokenTransactionOrderByRelationAggregateInput
    receivedTransactions?: TokenTransactionOrderByRelationAggregateInput
    wishListings?: WishListingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    walletAddress?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    tokenBalance?: IntFilter<"User"> | number
    bookListings?: BookListingListRelationFilter
    reservations?: ReservationListRelationFilter
    sentMessages?: MessageListRelationFilter
    sentTransactions?: TokenTransactionListRelationFilter
    receivedTransactions?: TokenTransactionListRelationFilter
    wishListings?: WishListingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    walletAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tokenBalance?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    tokenBalance?: IntWithAggregatesFilter<"User"> | number
  }

  export type BookListingWhereInput = {
    AND?: BookListingWhereInput | BookListingWhereInput[]
    OR?: BookListingWhereInput[]
    NOT?: BookListingWhereInput | BookListingWhereInput[]
    id?: StringFilter<"BookListing"> | string
    title?: StringFilter<"BookListing"> | string
    author?: StringNullableFilter<"BookListing"> | string | null
    isbn?: StringNullableFilter<"BookListing"> | string | null
    condition?: StringFilter<"BookListing"> | string
    location?: StringFilter<"BookListing"> | string
    availableTime?: StringNullableFilter<"BookListing"> | string | null
    description?: StringNullableFilter<"BookListing"> | string | null
    status?: EnumBookListingStatusFilter<"BookListing"> | $Enums.BookListingStatus
    createdAt?: DateTimeFilter<"BookListing"> | Date | string
    updatedAt?: DateTimeFilter<"BookListing"> | Date | string
    giverId?: StringFilter<"BookListing"> | string
    giver?: XOR<UserScalarRelationFilter, UserWhereInput>
    reservation?: XOR<ReservationNullableScalarRelationFilter, ReservationWhereInput> | null
  }

  export type BookListingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    condition?: SortOrder
    location?: SortOrder
    availableTime?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    giverId?: SortOrder
    giver?: UserOrderByWithRelationInput
    reservation?: ReservationOrderByWithRelationInput
  }

  export type BookListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookListingWhereInput | BookListingWhereInput[]
    OR?: BookListingWhereInput[]
    NOT?: BookListingWhereInput | BookListingWhereInput[]
    title?: StringFilter<"BookListing"> | string
    author?: StringNullableFilter<"BookListing"> | string | null
    isbn?: StringNullableFilter<"BookListing"> | string | null
    condition?: StringFilter<"BookListing"> | string
    location?: StringFilter<"BookListing"> | string
    availableTime?: StringNullableFilter<"BookListing"> | string | null
    description?: StringNullableFilter<"BookListing"> | string | null
    status?: EnumBookListingStatusFilter<"BookListing"> | $Enums.BookListingStatus
    createdAt?: DateTimeFilter<"BookListing"> | Date | string
    updatedAt?: DateTimeFilter<"BookListing"> | Date | string
    giverId?: StringFilter<"BookListing"> | string
    giver?: XOR<UserScalarRelationFilter, UserWhereInput>
    reservation?: XOR<ReservationNullableScalarRelationFilter, ReservationWhereInput> | null
  }, "id">

  export type BookListingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    condition?: SortOrder
    location?: SortOrder
    availableTime?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    giverId?: SortOrder
    _count?: BookListingCountOrderByAggregateInput
    _max?: BookListingMaxOrderByAggregateInput
    _min?: BookListingMinOrderByAggregateInput
  }

  export type BookListingScalarWhereWithAggregatesInput = {
    AND?: BookListingScalarWhereWithAggregatesInput | BookListingScalarWhereWithAggregatesInput[]
    OR?: BookListingScalarWhereWithAggregatesInput[]
    NOT?: BookListingScalarWhereWithAggregatesInput | BookListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BookListing"> | string
    title?: StringWithAggregatesFilter<"BookListing"> | string
    author?: StringNullableWithAggregatesFilter<"BookListing"> | string | null
    isbn?: StringNullableWithAggregatesFilter<"BookListing"> | string | null
    condition?: StringWithAggregatesFilter<"BookListing"> | string
    location?: StringWithAggregatesFilter<"BookListing"> | string
    availableTime?: StringNullableWithAggregatesFilter<"BookListing"> | string | null
    description?: StringNullableWithAggregatesFilter<"BookListing"> | string | null
    status?: EnumBookListingStatusWithAggregatesFilter<"BookListing"> | $Enums.BookListingStatus
    createdAt?: DateTimeWithAggregatesFilter<"BookListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BookListing"> | Date | string
    giverId?: StringWithAggregatesFilter<"BookListing"> | string
  }

  export type ReservationWhereInput = {
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    id?: StringFilter<"Reservation"> | string
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
    bookListingId?: StringFilter<"Reservation"> | string
    receiverId?: StringFilter<"Reservation"> | string
    bookListing?: XOR<BookListingScalarRelationFilter, BookListingWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }

  export type ReservationOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookListingId?: SortOrder
    receiverId?: SortOrder
    bookListing?: BookListingOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ReservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookListingId?: string
    AND?: ReservationWhereInput | ReservationWhereInput[]
    OR?: ReservationWhereInput[]
    NOT?: ReservationWhereInput | ReservationWhereInput[]
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
    receiverId?: StringFilter<"Reservation"> | string
    bookListing?: XOR<BookListingScalarRelationFilter, BookListingWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }, "id" | "bookListingId">

  export type ReservationOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookListingId?: SortOrder
    receiverId?: SortOrder
    _count?: ReservationCountOrderByAggregateInput
    _max?: ReservationMaxOrderByAggregateInput
    _min?: ReservationMinOrderByAggregateInput
  }

  export type ReservationScalarWhereWithAggregatesInput = {
    AND?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    OR?: ReservationScalarWhereWithAggregatesInput[]
    NOT?: ReservationScalarWhereWithAggregatesInput | ReservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reservation"> | string
    status?: EnumReservationStatusWithAggregatesFilter<"Reservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reservation"> | Date | string
    bookListingId?: StringWithAggregatesFilter<"Reservation"> | string
    receiverId?: StringWithAggregatesFilter<"Reservation"> | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    reservationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    reservation?: XOR<ReservationScalarRelationFilter, ReservationWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    reservationId?: SortOrder
    senderId?: SortOrder
    reservation?: ReservationOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    reservationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    reservation?: XOR<ReservationScalarRelationFilter, ReservationWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    reservationId?: SortOrder
    senderId?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    reservationId?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
  }

  export type TokenTransactionWhereInput = {
    AND?: TokenTransactionWhereInput | TokenTransactionWhereInput[]
    OR?: TokenTransactionWhereInput[]
    NOT?: TokenTransactionWhereInput | TokenTransactionWhereInput[]
    id?: StringFilter<"TokenTransaction"> | string
    amount?: IntFilter<"TokenTransaction"> | number
    note?: StringNullableFilter<"TokenTransaction"> | string | null
    createdAt?: DateTimeFilter<"TokenTransaction"> | Date | string
    fromUserId?: StringNullableFilter<"TokenTransaction"> | string | null
    toUserId?: StringFilter<"TokenTransaction"> | string
    fromUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TokenTransactionOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    fromUserId?: SortOrderInput | SortOrder
    toUserId?: SortOrder
    fromUser?: UserOrderByWithRelationInput
    toUser?: UserOrderByWithRelationInput
  }

  export type TokenTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TokenTransactionWhereInput | TokenTransactionWhereInput[]
    OR?: TokenTransactionWhereInput[]
    NOT?: TokenTransactionWhereInput | TokenTransactionWhereInput[]
    amount?: IntFilter<"TokenTransaction"> | number
    note?: StringNullableFilter<"TokenTransaction"> | string | null
    createdAt?: DateTimeFilter<"TokenTransaction"> | Date | string
    fromUserId?: StringNullableFilter<"TokenTransaction"> | string | null
    toUserId?: StringFilter<"TokenTransaction"> | string
    fromUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TokenTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    fromUserId?: SortOrderInput | SortOrder
    toUserId?: SortOrder
    _count?: TokenTransactionCountOrderByAggregateInput
    _avg?: TokenTransactionAvgOrderByAggregateInput
    _max?: TokenTransactionMaxOrderByAggregateInput
    _min?: TokenTransactionMinOrderByAggregateInput
    _sum?: TokenTransactionSumOrderByAggregateInput
  }

  export type TokenTransactionScalarWhereWithAggregatesInput = {
    AND?: TokenTransactionScalarWhereWithAggregatesInput | TokenTransactionScalarWhereWithAggregatesInput[]
    OR?: TokenTransactionScalarWhereWithAggregatesInput[]
    NOT?: TokenTransactionScalarWhereWithAggregatesInput | TokenTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TokenTransaction"> | string
    amount?: IntWithAggregatesFilter<"TokenTransaction"> | number
    note?: StringNullableWithAggregatesFilter<"TokenTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TokenTransaction"> | Date | string
    fromUserId?: StringNullableWithAggregatesFilter<"TokenTransaction"> | string | null
    toUserId?: StringWithAggregatesFilter<"TokenTransaction"> | string
  }

  export type WishListingWhereInput = {
    AND?: WishListingWhereInput | WishListingWhereInput[]
    OR?: WishListingWhereInput[]
    NOT?: WishListingWhereInput | WishListingWhereInput[]
    id?: StringFilter<"WishListing"> | string
    title?: StringFilter<"WishListing"> | string
    author?: StringNullableFilter<"WishListing"> | string | null
    isbn?: StringNullableFilter<"WishListing"> | string | null
    description?: StringNullableFilter<"WishListing"> | string | null
    createdAt?: DateTimeFilter<"WishListing"> | Date | string
    updatedAt?: DateTimeFilter<"WishListing"> | Date | string
    requesterId?: StringFilter<"WishListing"> | string
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WishListingOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterId?: SortOrder
    requester?: UserOrderByWithRelationInput
  }

  export type WishListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WishListingWhereInput | WishListingWhereInput[]
    OR?: WishListingWhereInput[]
    NOT?: WishListingWhereInput | WishListingWhereInput[]
    title?: StringFilter<"WishListing"> | string
    author?: StringNullableFilter<"WishListing"> | string | null
    isbn?: StringNullableFilter<"WishListing"> | string | null
    description?: StringNullableFilter<"WishListing"> | string | null
    createdAt?: DateTimeFilter<"WishListing"> | Date | string
    updatedAt?: DateTimeFilter<"WishListing"> | Date | string
    requesterId?: StringFilter<"WishListing"> | string
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WishListingOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterId?: SortOrder
    _count?: WishListingCountOrderByAggregateInput
    _max?: WishListingMaxOrderByAggregateInput
    _min?: WishListingMinOrderByAggregateInput
  }

  export type WishListingScalarWhereWithAggregatesInput = {
    AND?: WishListingScalarWhereWithAggregatesInput | WishListingScalarWhereWithAggregatesInput[]
    OR?: WishListingScalarWhereWithAggregatesInput[]
    NOT?: WishListingScalarWhereWithAggregatesInput | WishListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WishListing"> | string
    title?: StringWithAggregatesFilter<"WishListing"> | string
    author?: StringNullableWithAggregatesFilter<"WishListing"> | string | null
    isbn?: StringNullableWithAggregatesFilter<"WishListing"> | string | null
    description?: StringNullableWithAggregatesFilter<"WishListing"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WishListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WishListing"> | Date | string
    requesterId?: StringWithAggregatesFilter<"WishListing"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
  }

  export type BookListingCreateInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    giver: UserCreateNestedOneWithoutBookListingsInput
    reservation?: ReservationCreateNestedOneWithoutBookListingInput
  }

  export type BookListingUncheckedCreateInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    giverId: string
    reservation?: ReservationUncheckedCreateNestedOneWithoutBookListingInput
  }

  export type BookListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    giver?: UserUpdateOneRequiredWithoutBookListingsNestedInput
    reservation?: ReservationUpdateOneWithoutBookListingNestedInput
  }

  export type BookListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    giverId?: StringFieldUpdateOperationsInput | string
    reservation?: ReservationUncheckedUpdateOneWithoutBookListingNestedInput
  }

  export type BookListingCreateManyInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    giverId: string
  }

  export type BookListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    giverId?: StringFieldUpdateOperationsInput | string
  }

  export type ReservationCreateInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListing: BookListingCreateNestedOneWithoutReservationInput
    receiver: UserCreateNestedOneWithoutReservationsInput
    messages?: MessageCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListingId: string
    receiverId: string
    messages?: MessageUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListing?: BookListingUpdateOneRequiredWithoutReservationNestedInput
    receiver?: UserUpdateOneRequiredWithoutReservationsNestedInput
    messages?: MessageUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListingId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    messages?: MessageUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationCreateManyInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListingId: string
    receiverId: string
  }

  export type ReservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListingId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservation: ReservationCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservationId: string
    senderId: string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservationId: string
    senderId: string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenTransactionCreateInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUser?: UserCreateNestedOneWithoutSentTransactionsInput
    toUser: UserCreateNestedOneWithoutReceivedTransactionsInput
  }

  export type TokenTransactionUncheckedCreateInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUserId?: string | null
    toUserId: string
  }

  export type TokenTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneWithoutSentTransactionsNestedInput
    toUser?: UserUpdateOneRequiredWithoutReceivedTransactionsNestedInput
  }

  export type TokenTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUserId?: NullableStringFieldUpdateOperationsInput | string | null
    toUserId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenTransactionCreateManyInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUserId?: string | null
    toUserId: string
  }

  export type TokenTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUserId?: NullableStringFieldUpdateOperationsInput | string | null
    toUserId?: StringFieldUpdateOperationsInput | string
  }

  export type WishListingCreateInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requester: UserCreateNestedOneWithoutWishListingsInput
  }

  export type WishListingUncheckedCreateInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requesterId: string
  }

  export type WishListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneRequiredWithoutWishListingsNestedInput
  }

  export type WishListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
  }

  export type WishListingCreateManyInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    requesterId: string
  }

  export type WishListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requesterId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BookListingListRelationFilter = {
    every?: BookListingWhereInput
    some?: BookListingWhereInput
    none?: BookListingWhereInput
  }

  export type ReservationListRelationFilter = {
    every?: ReservationWhereInput
    some?: ReservationWhereInput
    none?: ReservationWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type TokenTransactionListRelationFilter = {
    every?: TokenTransactionWhereInput
    some?: TokenTransactionWhereInput
    none?: TokenTransactionWhereInput
  }

  export type WishListingListRelationFilter = {
    every?: WishListingWhereInput
    some?: WishListingWhereInput
    none?: WishListingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WishListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    tokenBalance?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    tokenBalance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    tokenBalance?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    image?: SortOrder
    walletAddress?: SortOrder
    createdAt?: SortOrder
    tokenBalance?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    tokenBalance?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumBookListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookListingStatus | EnumBookListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookListingStatusFilter<$PrismaModel> | $Enums.BookListingStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReservationNullableScalarRelationFilter = {
    is?: ReservationWhereInput | null
    isNot?: ReservationWhereInput | null
  }

  export type BookListingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    condition?: SortOrder
    location?: SortOrder
    availableTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    giverId?: SortOrder
  }

  export type BookListingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    condition?: SortOrder
    location?: SortOrder
    availableTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    giverId?: SortOrder
  }

  export type BookListingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    condition?: SortOrder
    location?: SortOrder
    availableTime?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    giverId?: SortOrder
  }

  export type EnumBookListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookListingStatus | EnumBookListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookListingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookListingStatusFilter<$PrismaModel>
  }

  export type EnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type BookListingScalarRelationFilter = {
    is?: BookListingWhereInput
    isNot?: BookListingWhereInput
  }

  export type ReservationCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookListingId?: SortOrder
    receiverId?: SortOrder
  }

  export type ReservationMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookListingId?: SortOrder
    receiverId?: SortOrder
  }

  export type ReservationMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookListingId?: SortOrder
    receiverId?: SortOrder
  }

  export type EnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type ReservationScalarRelationFilter = {
    is?: ReservationWhereInput
    isNot?: ReservationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    reservationId?: SortOrder
    senderId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    reservationId?: SortOrder
    senderId?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    reservationId?: SortOrder
    senderId?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TokenTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
  }

  export type TokenTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TokenTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
  }

  export type TokenTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
  }

  export type TokenTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WishListingCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterId?: SortOrder
  }

  export type WishListingMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterId?: SortOrder
  }

  export type WishListingMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    isbn?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requesterId?: SortOrder
  }

  export type BookListingCreateNestedManyWithoutGiverInput = {
    create?: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput> | BookListingCreateWithoutGiverInput[] | BookListingUncheckedCreateWithoutGiverInput[]
    connectOrCreate?: BookListingCreateOrConnectWithoutGiverInput | BookListingCreateOrConnectWithoutGiverInput[]
    createMany?: BookListingCreateManyGiverInputEnvelope
    connect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
  }

  export type ReservationCreateNestedManyWithoutReceiverInput = {
    create?: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput> | ReservationCreateWithoutReceiverInput[] | ReservationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutReceiverInput | ReservationCreateOrConnectWithoutReceiverInput[]
    createMany?: ReservationCreateManyReceiverInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TokenTransactionCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput> | TokenTransactionCreateWithoutFromUserInput[] | TokenTransactionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutFromUserInput | TokenTransactionCreateOrConnectWithoutFromUserInput[]
    createMany?: TokenTransactionCreateManyFromUserInputEnvelope
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
  }

  export type TokenTransactionCreateNestedManyWithoutToUserInput = {
    create?: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput> | TokenTransactionCreateWithoutToUserInput[] | TokenTransactionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutToUserInput | TokenTransactionCreateOrConnectWithoutToUserInput[]
    createMany?: TokenTransactionCreateManyToUserInputEnvelope
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
  }

  export type WishListingCreateNestedManyWithoutRequesterInput = {
    create?: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput> | WishListingCreateWithoutRequesterInput[] | WishListingUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: WishListingCreateOrConnectWithoutRequesterInput | WishListingCreateOrConnectWithoutRequesterInput[]
    createMany?: WishListingCreateManyRequesterInputEnvelope
    connect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
  }

  export type BookListingUncheckedCreateNestedManyWithoutGiverInput = {
    create?: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput> | BookListingCreateWithoutGiverInput[] | BookListingUncheckedCreateWithoutGiverInput[]
    connectOrCreate?: BookListingCreateOrConnectWithoutGiverInput | BookListingCreateOrConnectWithoutGiverInput[]
    createMany?: BookListingCreateManyGiverInputEnvelope
    connect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
  }

  export type ReservationUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput> | ReservationCreateWithoutReceiverInput[] | ReservationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutReceiverInput | ReservationCreateOrConnectWithoutReceiverInput[]
    createMany?: ReservationCreateManyReceiverInputEnvelope
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput = {
    create?: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput> | TokenTransactionCreateWithoutFromUserInput[] | TokenTransactionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutFromUserInput | TokenTransactionCreateOrConnectWithoutFromUserInput[]
    createMany?: TokenTransactionCreateManyFromUserInputEnvelope
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
  }

  export type TokenTransactionUncheckedCreateNestedManyWithoutToUserInput = {
    create?: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput> | TokenTransactionCreateWithoutToUserInput[] | TokenTransactionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutToUserInput | TokenTransactionCreateOrConnectWithoutToUserInput[]
    createMany?: TokenTransactionCreateManyToUserInputEnvelope
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
  }

  export type WishListingUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput> | WishListingCreateWithoutRequesterInput[] | WishListingUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: WishListingCreateOrConnectWithoutRequesterInput | WishListingCreateOrConnectWithoutRequesterInput[]
    createMany?: WishListingCreateManyRequesterInputEnvelope
    connect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookListingUpdateManyWithoutGiverNestedInput = {
    create?: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput> | BookListingCreateWithoutGiverInput[] | BookListingUncheckedCreateWithoutGiverInput[]
    connectOrCreate?: BookListingCreateOrConnectWithoutGiverInput | BookListingCreateOrConnectWithoutGiverInput[]
    upsert?: BookListingUpsertWithWhereUniqueWithoutGiverInput | BookListingUpsertWithWhereUniqueWithoutGiverInput[]
    createMany?: BookListingCreateManyGiverInputEnvelope
    set?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    disconnect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    delete?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    connect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    update?: BookListingUpdateWithWhereUniqueWithoutGiverInput | BookListingUpdateWithWhereUniqueWithoutGiverInput[]
    updateMany?: BookListingUpdateManyWithWhereWithoutGiverInput | BookListingUpdateManyWithWhereWithoutGiverInput[]
    deleteMany?: BookListingScalarWhereInput | BookListingScalarWhereInput[]
  }

  export type ReservationUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput> | ReservationCreateWithoutReceiverInput[] | ReservationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutReceiverInput | ReservationCreateOrConnectWithoutReceiverInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutReceiverInput | ReservationUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: ReservationCreateManyReceiverInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutReceiverInput | ReservationUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutReceiverInput | ReservationUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TokenTransactionUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput> | TokenTransactionCreateWithoutFromUserInput[] | TokenTransactionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutFromUserInput | TokenTransactionCreateOrConnectWithoutFromUserInput[]
    upsert?: TokenTransactionUpsertWithWhereUniqueWithoutFromUserInput | TokenTransactionUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TokenTransactionCreateManyFromUserInputEnvelope
    set?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    disconnect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    delete?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    update?: TokenTransactionUpdateWithWhereUniqueWithoutFromUserInput | TokenTransactionUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TokenTransactionUpdateManyWithWhereWithoutFromUserInput | TokenTransactionUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
  }

  export type TokenTransactionUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput> | TokenTransactionCreateWithoutToUserInput[] | TokenTransactionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutToUserInput | TokenTransactionCreateOrConnectWithoutToUserInput[]
    upsert?: TokenTransactionUpsertWithWhereUniqueWithoutToUserInput | TokenTransactionUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TokenTransactionCreateManyToUserInputEnvelope
    set?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    disconnect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    delete?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    update?: TokenTransactionUpdateWithWhereUniqueWithoutToUserInput | TokenTransactionUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TokenTransactionUpdateManyWithWhereWithoutToUserInput | TokenTransactionUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
  }

  export type WishListingUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput> | WishListingCreateWithoutRequesterInput[] | WishListingUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: WishListingCreateOrConnectWithoutRequesterInput | WishListingCreateOrConnectWithoutRequesterInput[]
    upsert?: WishListingUpsertWithWhereUniqueWithoutRequesterInput | WishListingUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: WishListingCreateManyRequesterInputEnvelope
    set?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    disconnect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    delete?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    connect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    update?: WishListingUpdateWithWhereUniqueWithoutRequesterInput | WishListingUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: WishListingUpdateManyWithWhereWithoutRequesterInput | WishListingUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: WishListingScalarWhereInput | WishListingScalarWhereInput[]
  }

  export type BookListingUncheckedUpdateManyWithoutGiverNestedInput = {
    create?: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput> | BookListingCreateWithoutGiverInput[] | BookListingUncheckedCreateWithoutGiverInput[]
    connectOrCreate?: BookListingCreateOrConnectWithoutGiverInput | BookListingCreateOrConnectWithoutGiverInput[]
    upsert?: BookListingUpsertWithWhereUniqueWithoutGiverInput | BookListingUpsertWithWhereUniqueWithoutGiverInput[]
    createMany?: BookListingCreateManyGiverInputEnvelope
    set?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    disconnect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    delete?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    connect?: BookListingWhereUniqueInput | BookListingWhereUniqueInput[]
    update?: BookListingUpdateWithWhereUniqueWithoutGiverInput | BookListingUpdateWithWhereUniqueWithoutGiverInput[]
    updateMany?: BookListingUpdateManyWithWhereWithoutGiverInput | BookListingUpdateManyWithWhereWithoutGiverInput[]
    deleteMany?: BookListingScalarWhereInput | BookListingScalarWhereInput[]
  }

  export type ReservationUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput> | ReservationCreateWithoutReceiverInput[] | ReservationUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: ReservationCreateOrConnectWithoutReceiverInput | ReservationCreateOrConnectWithoutReceiverInput[]
    upsert?: ReservationUpsertWithWhereUniqueWithoutReceiverInput | ReservationUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: ReservationCreateManyReceiverInputEnvelope
    set?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    disconnect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    delete?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    connect?: ReservationWhereUniqueInput | ReservationWhereUniqueInput[]
    update?: ReservationUpdateWithWhereUniqueWithoutReceiverInput | ReservationUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: ReservationUpdateManyWithWhereWithoutReceiverInput | ReservationUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput> | TokenTransactionCreateWithoutFromUserInput[] | TokenTransactionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutFromUserInput | TokenTransactionCreateOrConnectWithoutFromUserInput[]
    upsert?: TokenTransactionUpsertWithWhereUniqueWithoutFromUserInput | TokenTransactionUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: TokenTransactionCreateManyFromUserInputEnvelope
    set?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    disconnect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    delete?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    update?: TokenTransactionUpdateWithWhereUniqueWithoutFromUserInput | TokenTransactionUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: TokenTransactionUpdateManyWithWhereWithoutFromUserInput | TokenTransactionUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
  }

  export type TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput = {
    create?: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput> | TokenTransactionCreateWithoutToUserInput[] | TokenTransactionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: TokenTransactionCreateOrConnectWithoutToUserInput | TokenTransactionCreateOrConnectWithoutToUserInput[]
    upsert?: TokenTransactionUpsertWithWhereUniqueWithoutToUserInput | TokenTransactionUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: TokenTransactionCreateManyToUserInputEnvelope
    set?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    disconnect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    delete?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    connect?: TokenTransactionWhereUniqueInput | TokenTransactionWhereUniqueInput[]
    update?: TokenTransactionUpdateWithWhereUniqueWithoutToUserInput | TokenTransactionUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: TokenTransactionUpdateManyWithWhereWithoutToUserInput | TokenTransactionUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
  }

  export type WishListingUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput> | WishListingCreateWithoutRequesterInput[] | WishListingUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: WishListingCreateOrConnectWithoutRequesterInput | WishListingCreateOrConnectWithoutRequesterInput[]
    upsert?: WishListingUpsertWithWhereUniqueWithoutRequesterInput | WishListingUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: WishListingCreateManyRequesterInputEnvelope
    set?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    disconnect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    delete?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    connect?: WishListingWhereUniqueInput | WishListingWhereUniqueInput[]
    update?: WishListingUpdateWithWhereUniqueWithoutRequesterInput | WishListingUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: WishListingUpdateManyWithWhereWithoutRequesterInput | WishListingUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: WishListingScalarWhereInput | WishListingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBookListingsInput = {
    create?: XOR<UserCreateWithoutBookListingsInput, UserUncheckedCreateWithoutBookListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookListingsInput
    connect?: UserWhereUniqueInput
  }

  export type ReservationCreateNestedOneWithoutBookListingInput = {
    create?: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutBookListingInput
    connect?: ReservationWhereUniqueInput
  }

  export type ReservationUncheckedCreateNestedOneWithoutBookListingInput = {
    create?: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutBookListingInput
    connect?: ReservationWhereUniqueInput
  }

  export type EnumBookListingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookListingStatus
  }

  export type UserUpdateOneRequiredWithoutBookListingsNestedInput = {
    create?: XOR<UserCreateWithoutBookListingsInput, UserUncheckedCreateWithoutBookListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookListingsInput
    upsert?: UserUpsertWithoutBookListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookListingsInput, UserUpdateWithoutBookListingsInput>, UserUncheckedUpdateWithoutBookListingsInput>
  }

  export type ReservationUpdateOneWithoutBookListingNestedInput = {
    create?: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutBookListingInput
    upsert?: ReservationUpsertWithoutBookListingInput
    disconnect?: ReservationWhereInput | boolean
    delete?: ReservationWhereInput | boolean
    connect?: ReservationWhereUniqueInput
    update?: XOR<XOR<ReservationUpdateToOneWithWhereWithoutBookListingInput, ReservationUpdateWithoutBookListingInput>, ReservationUncheckedUpdateWithoutBookListingInput>
  }

  export type ReservationUncheckedUpdateOneWithoutBookListingNestedInput = {
    create?: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutBookListingInput
    upsert?: ReservationUpsertWithoutBookListingInput
    disconnect?: ReservationWhereInput | boolean
    delete?: ReservationWhereInput | boolean
    connect?: ReservationWhereUniqueInput
    update?: XOR<XOR<ReservationUpdateToOneWithWhereWithoutBookListingInput, ReservationUpdateWithoutBookListingInput>, ReservationUncheckedUpdateWithoutBookListingInput>
  }

  export type BookListingCreateNestedOneWithoutReservationInput = {
    create?: XOR<BookListingCreateWithoutReservationInput, BookListingUncheckedCreateWithoutReservationInput>
    connectOrCreate?: BookListingCreateOrConnectWithoutReservationInput
    connect?: BookListingWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReservationsInput = {
    create?: XOR<UserCreateWithoutReservationsInput, UserUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReservationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutReservationInput = {
    create?: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput> | MessageCreateWithoutReservationInput[] | MessageUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReservationInput | MessageCreateOrConnectWithoutReservationInput[]
    createMany?: MessageCreateManyReservationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReservationInput = {
    create?: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput> | MessageCreateWithoutReservationInput[] | MessageUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReservationInput | MessageCreateOrConnectWithoutReservationInput[]
    createMany?: MessageCreateManyReservationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type EnumReservationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReservationStatus
  }

  export type BookListingUpdateOneRequiredWithoutReservationNestedInput = {
    create?: XOR<BookListingCreateWithoutReservationInput, BookListingUncheckedCreateWithoutReservationInput>
    connectOrCreate?: BookListingCreateOrConnectWithoutReservationInput
    upsert?: BookListingUpsertWithoutReservationInput
    connect?: BookListingWhereUniqueInput
    update?: XOR<XOR<BookListingUpdateToOneWithWhereWithoutReservationInput, BookListingUpdateWithoutReservationInput>, BookListingUncheckedUpdateWithoutReservationInput>
  }

  export type UserUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: XOR<UserCreateWithoutReservationsInput, UserUncheckedCreateWithoutReservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReservationsInput
    upsert?: UserUpsertWithoutReservationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReservationsInput, UserUpdateWithoutReservationsInput>, UserUncheckedUpdateWithoutReservationsInput>
  }

  export type MessageUpdateManyWithoutReservationNestedInput = {
    create?: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput> | MessageCreateWithoutReservationInput[] | MessageUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReservationInput | MessageCreateOrConnectWithoutReservationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReservationInput | MessageUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: MessageCreateManyReservationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReservationInput | MessageUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReservationInput | MessageUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReservationNestedInput = {
    create?: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput> | MessageCreateWithoutReservationInput[] | MessageUncheckedCreateWithoutReservationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReservationInput | MessageCreateOrConnectWithoutReservationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReservationInput | MessageUpsertWithWhereUniqueWithoutReservationInput[]
    createMany?: MessageCreateManyReservationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReservationInput | MessageUpdateWithWhereUniqueWithoutReservationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReservationInput | MessageUpdateManyWithWhereWithoutReservationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ReservationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ReservationCreateWithoutMessagesInput, ReservationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutMessagesInput
    connect?: ReservationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type ReservationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ReservationCreateWithoutMessagesInput, ReservationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ReservationCreateOrConnectWithoutMessagesInput
    upsert?: ReservationUpsertWithoutMessagesInput
    connect?: ReservationWhereUniqueInput
    update?: XOR<XOR<ReservationUpdateToOneWithWhereWithoutMessagesInput, ReservationUpdateWithoutMessagesInput>, ReservationUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserCreateNestedOneWithoutSentTransactionsInput = {
    create?: XOR<UserCreateWithoutSentTransactionsInput, UserUncheckedCreateWithoutSentTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedTransactionsInput = {
    create?: XOR<UserCreateWithoutReceivedTransactionsInput, UserUncheckedCreateWithoutReceivedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutSentTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutSentTransactionsInput, UserUncheckedCreateWithoutSentTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentTransactionsInput
    upsert?: UserUpsertWithoutSentTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentTransactionsInput, UserUpdateWithoutSentTransactionsInput>, UserUncheckedUpdateWithoutSentTransactionsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedTransactionsInput, UserUncheckedCreateWithoutReceivedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedTransactionsInput
    upsert?: UserUpsertWithoutReceivedTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedTransactionsInput, UserUpdateWithoutReceivedTransactionsInput>, UserUncheckedUpdateWithoutReceivedTransactionsInput>
  }

  export type UserCreateNestedOneWithoutWishListingsInput = {
    create?: XOR<UserCreateWithoutWishListingsInput, UserUncheckedCreateWithoutWishListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishListingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWishListingsNestedInput = {
    create?: XOR<UserCreateWithoutWishListingsInput, UserUncheckedCreateWithoutWishListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWishListingsInput
    upsert?: UserUpsertWithoutWishListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWishListingsInput, UserUpdateWithoutWishListingsInput>, UserUncheckedUpdateWithoutWishListingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumBookListingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookListingStatus | EnumBookListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookListingStatusFilter<$PrismaModel> | $Enums.BookListingStatus
  }

  export type NestedEnumBookListingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookListingStatus | EnumBookListingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookListingStatus[] | ListEnumBookListingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookListingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookListingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookListingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookListingStatusFilter<$PrismaModel>
  }

  export type NestedEnumReservationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusFilter<$PrismaModel> | $Enums.ReservationStatus
  }

  export type NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReservationStatus | EnumReservationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReservationStatus[] | ListEnumReservationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReservationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReservationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReservationStatusFilter<$PrismaModel>
    _max?: NestedEnumReservationStatusFilter<$PrismaModel>
  }

  export type BookListingCreateWithoutGiverInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reservation?: ReservationCreateNestedOneWithoutBookListingInput
  }

  export type BookListingUncheckedCreateWithoutGiverInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    reservation?: ReservationUncheckedCreateNestedOneWithoutBookListingInput
  }

  export type BookListingCreateOrConnectWithoutGiverInput = {
    where: BookListingWhereUniqueInput
    create: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput>
  }

  export type BookListingCreateManyGiverInputEnvelope = {
    data: BookListingCreateManyGiverInput | BookListingCreateManyGiverInput[]
    skipDuplicates?: boolean
  }

  export type ReservationCreateWithoutReceiverInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListing: BookListingCreateNestedOneWithoutReservationInput
    messages?: MessageCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutReceiverInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListingId: string
    messages?: MessageUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutReceiverInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput>
  }

  export type ReservationCreateManyReceiverInputEnvelope = {
    data: ReservationCreateManyReceiverInput | ReservationCreateManyReceiverInput[]
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservation: ReservationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservationId: string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type TokenTransactionCreateWithoutFromUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    toUser: UserCreateNestedOneWithoutReceivedTransactionsInput
  }

  export type TokenTransactionUncheckedCreateWithoutFromUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    toUserId: string
  }

  export type TokenTransactionCreateOrConnectWithoutFromUserInput = {
    where: TokenTransactionWhereUniqueInput
    create: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput>
  }

  export type TokenTransactionCreateManyFromUserInputEnvelope = {
    data: TokenTransactionCreateManyFromUserInput | TokenTransactionCreateManyFromUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenTransactionCreateWithoutToUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUser?: UserCreateNestedOneWithoutSentTransactionsInput
  }

  export type TokenTransactionUncheckedCreateWithoutToUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUserId?: string | null
  }

  export type TokenTransactionCreateOrConnectWithoutToUserInput = {
    where: TokenTransactionWhereUniqueInput
    create: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput>
  }

  export type TokenTransactionCreateManyToUserInputEnvelope = {
    data: TokenTransactionCreateManyToUserInput | TokenTransactionCreateManyToUserInput[]
    skipDuplicates?: boolean
  }

  export type WishListingCreateWithoutRequesterInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WishListingUncheckedCreateWithoutRequesterInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WishListingCreateOrConnectWithoutRequesterInput = {
    where: WishListingWhereUniqueInput
    create: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput>
  }

  export type WishListingCreateManyRequesterInputEnvelope = {
    data: WishListingCreateManyRequesterInput | WishListingCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type BookListingUpsertWithWhereUniqueWithoutGiverInput = {
    where: BookListingWhereUniqueInput
    update: XOR<BookListingUpdateWithoutGiverInput, BookListingUncheckedUpdateWithoutGiverInput>
    create: XOR<BookListingCreateWithoutGiverInput, BookListingUncheckedCreateWithoutGiverInput>
  }

  export type BookListingUpdateWithWhereUniqueWithoutGiverInput = {
    where: BookListingWhereUniqueInput
    data: XOR<BookListingUpdateWithoutGiverInput, BookListingUncheckedUpdateWithoutGiverInput>
  }

  export type BookListingUpdateManyWithWhereWithoutGiverInput = {
    where: BookListingScalarWhereInput
    data: XOR<BookListingUpdateManyMutationInput, BookListingUncheckedUpdateManyWithoutGiverInput>
  }

  export type BookListingScalarWhereInput = {
    AND?: BookListingScalarWhereInput | BookListingScalarWhereInput[]
    OR?: BookListingScalarWhereInput[]
    NOT?: BookListingScalarWhereInput | BookListingScalarWhereInput[]
    id?: StringFilter<"BookListing"> | string
    title?: StringFilter<"BookListing"> | string
    author?: StringNullableFilter<"BookListing"> | string | null
    isbn?: StringNullableFilter<"BookListing"> | string | null
    condition?: StringFilter<"BookListing"> | string
    location?: StringFilter<"BookListing"> | string
    availableTime?: StringNullableFilter<"BookListing"> | string | null
    description?: StringNullableFilter<"BookListing"> | string | null
    status?: EnumBookListingStatusFilter<"BookListing"> | $Enums.BookListingStatus
    createdAt?: DateTimeFilter<"BookListing"> | Date | string
    updatedAt?: DateTimeFilter<"BookListing"> | Date | string
    giverId?: StringFilter<"BookListing"> | string
  }

  export type ReservationUpsertWithWhereUniqueWithoutReceiverInput = {
    where: ReservationWhereUniqueInput
    update: XOR<ReservationUpdateWithoutReceiverInput, ReservationUncheckedUpdateWithoutReceiverInput>
    create: XOR<ReservationCreateWithoutReceiverInput, ReservationUncheckedCreateWithoutReceiverInput>
  }

  export type ReservationUpdateWithWhereUniqueWithoutReceiverInput = {
    where: ReservationWhereUniqueInput
    data: XOR<ReservationUpdateWithoutReceiverInput, ReservationUncheckedUpdateWithoutReceiverInput>
  }

  export type ReservationUpdateManyWithWhereWithoutReceiverInput = {
    where: ReservationScalarWhereInput
    data: XOR<ReservationUpdateManyMutationInput, ReservationUncheckedUpdateManyWithoutReceiverInput>
  }

  export type ReservationScalarWhereInput = {
    AND?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    OR?: ReservationScalarWhereInput[]
    NOT?: ReservationScalarWhereInput | ReservationScalarWhereInput[]
    id?: StringFilter<"Reservation"> | string
    status?: EnumReservationStatusFilter<"Reservation"> | $Enums.ReservationStatus
    createdAt?: DateTimeFilter<"Reservation"> | Date | string
    updatedAt?: DateTimeFilter<"Reservation"> | Date | string
    bookListingId?: StringFilter<"Reservation"> | string
    receiverId?: StringFilter<"Reservation"> | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    createdAt?: DateTimeFilter<"Message"> | Date | string
    reservationId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
  }

  export type TokenTransactionUpsertWithWhereUniqueWithoutFromUserInput = {
    where: TokenTransactionWhereUniqueInput
    update: XOR<TokenTransactionUpdateWithoutFromUserInput, TokenTransactionUncheckedUpdateWithoutFromUserInput>
    create: XOR<TokenTransactionCreateWithoutFromUserInput, TokenTransactionUncheckedCreateWithoutFromUserInput>
  }

  export type TokenTransactionUpdateWithWhereUniqueWithoutFromUserInput = {
    where: TokenTransactionWhereUniqueInput
    data: XOR<TokenTransactionUpdateWithoutFromUserInput, TokenTransactionUncheckedUpdateWithoutFromUserInput>
  }

  export type TokenTransactionUpdateManyWithWhereWithoutFromUserInput = {
    where: TokenTransactionScalarWhereInput
    data: XOR<TokenTransactionUpdateManyMutationInput, TokenTransactionUncheckedUpdateManyWithoutFromUserInput>
  }

  export type TokenTransactionScalarWhereInput = {
    AND?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
    OR?: TokenTransactionScalarWhereInput[]
    NOT?: TokenTransactionScalarWhereInput | TokenTransactionScalarWhereInput[]
    id?: StringFilter<"TokenTransaction"> | string
    amount?: IntFilter<"TokenTransaction"> | number
    note?: StringNullableFilter<"TokenTransaction"> | string | null
    createdAt?: DateTimeFilter<"TokenTransaction"> | Date | string
    fromUserId?: StringNullableFilter<"TokenTransaction"> | string | null
    toUserId?: StringFilter<"TokenTransaction"> | string
  }

  export type TokenTransactionUpsertWithWhereUniqueWithoutToUserInput = {
    where: TokenTransactionWhereUniqueInput
    update: XOR<TokenTransactionUpdateWithoutToUserInput, TokenTransactionUncheckedUpdateWithoutToUserInput>
    create: XOR<TokenTransactionCreateWithoutToUserInput, TokenTransactionUncheckedCreateWithoutToUserInput>
  }

  export type TokenTransactionUpdateWithWhereUniqueWithoutToUserInput = {
    where: TokenTransactionWhereUniqueInput
    data: XOR<TokenTransactionUpdateWithoutToUserInput, TokenTransactionUncheckedUpdateWithoutToUserInput>
  }

  export type TokenTransactionUpdateManyWithWhereWithoutToUserInput = {
    where: TokenTransactionScalarWhereInput
    data: XOR<TokenTransactionUpdateManyMutationInput, TokenTransactionUncheckedUpdateManyWithoutToUserInput>
  }

  export type WishListingUpsertWithWhereUniqueWithoutRequesterInput = {
    where: WishListingWhereUniqueInput
    update: XOR<WishListingUpdateWithoutRequesterInput, WishListingUncheckedUpdateWithoutRequesterInput>
    create: XOR<WishListingCreateWithoutRequesterInput, WishListingUncheckedCreateWithoutRequesterInput>
  }

  export type WishListingUpdateWithWhereUniqueWithoutRequesterInput = {
    where: WishListingWhereUniqueInput
    data: XOR<WishListingUpdateWithoutRequesterInput, WishListingUncheckedUpdateWithoutRequesterInput>
  }

  export type WishListingUpdateManyWithWhereWithoutRequesterInput = {
    where: WishListingScalarWhereInput
    data: XOR<WishListingUpdateManyMutationInput, WishListingUncheckedUpdateManyWithoutRequesterInput>
  }

  export type WishListingScalarWhereInput = {
    AND?: WishListingScalarWhereInput | WishListingScalarWhereInput[]
    OR?: WishListingScalarWhereInput[]
    NOT?: WishListingScalarWhereInput | WishListingScalarWhereInput[]
    id?: StringFilter<"WishListing"> | string
    title?: StringFilter<"WishListing"> | string
    author?: StringNullableFilter<"WishListing"> | string | null
    isbn?: StringNullableFilter<"WishListing"> | string | null
    description?: StringNullableFilter<"WishListing"> | string | null
    createdAt?: DateTimeFilter<"WishListing"> | Date | string
    updatedAt?: DateTimeFilter<"WishListing"> | Date | string
    requesterId?: StringFilter<"WishListing"> | string
  }

  export type UserCreateWithoutBookListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutBookListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutBookListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookListingsInput, UserUncheckedCreateWithoutBookListingsInput>
  }

  export type ReservationCreateWithoutBookListingInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReservationsInput
    messages?: MessageCreateNestedManyWithoutReservationInput
  }

  export type ReservationUncheckedCreateWithoutBookListingInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    receiverId: string
    messages?: MessageUncheckedCreateNestedManyWithoutReservationInput
  }

  export type ReservationCreateOrConnectWithoutBookListingInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
  }

  export type UserUpsertWithoutBookListingsInput = {
    update: XOR<UserUpdateWithoutBookListingsInput, UserUncheckedUpdateWithoutBookListingsInput>
    create: XOR<UserCreateWithoutBookListingsInput, UserUncheckedCreateWithoutBookListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookListingsInput, UserUncheckedUpdateWithoutBookListingsInput>
  }

  export type UserUpdateWithoutBookListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutBookListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type ReservationUpsertWithoutBookListingInput = {
    update: XOR<ReservationUpdateWithoutBookListingInput, ReservationUncheckedUpdateWithoutBookListingInput>
    create: XOR<ReservationCreateWithoutBookListingInput, ReservationUncheckedCreateWithoutBookListingInput>
    where?: ReservationWhereInput
  }

  export type ReservationUpdateToOneWithWhereWithoutBookListingInput = {
    where?: ReservationWhereInput
    data: XOR<ReservationUpdateWithoutBookListingInput, ReservationUncheckedUpdateWithoutBookListingInput>
  }

  export type ReservationUpdateWithoutBookListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReservationsNestedInput
    messages?: MessageUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutBookListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiverId?: StringFieldUpdateOperationsInput | string
    messages?: MessageUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type BookListingCreateWithoutReservationInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    giver: UserCreateNestedOneWithoutBookListingsInput
  }

  export type BookListingUncheckedCreateWithoutReservationInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    giverId: string
  }

  export type BookListingCreateOrConnectWithoutReservationInput = {
    where: BookListingWhereUniqueInput
    create: XOR<BookListingCreateWithoutReservationInput, BookListingUncheckedCreateWithoutReservationInput>
  }

  export type UserCreateWithoutReservationsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutReservationsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutReservationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReservationsInput, UserUncheckedCreateWithoutReservationsInput>
  }

  export type MessageCreateWithoutReservationInput = {
    id?: string
    content: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutReservationInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
  }

  export type MessageCreateOrConnectWithoutReservationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput>
  }

  export type MessageCreateManyReservationInputEnvelope = {
    data: MessageCreateManyReservationInput | MessageCreateManyReservationInput[]
    skipDuplicates?: boolean
  }

  export type BookListingUpsertWithoutReservationInput = {
    update: XOR<BookListingUpdateWithoutReservationInput, BookListingUncheckedUpdateWithoutReservationInput>
    create: XOR<BookListingCreateWithoutReservationInput, BookListingUncheckedCreateWithoutReservationInput>
    where?: BookListingWhereInput
  }

  export type BookListingUpdateToOneWithWhereWithoutReservationInput = {
    where?: BookListingWhereInput
    data: XOR<BookListingUpdateWithoutReservationInput, BookListingUncheckedUpdateWithoutReservationInput>
  }

  export type BookListingUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    giver?: UserUpdateOneRequiredWithoutBookListingsNestedInput
  }

  export type BookListingUncheckedUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    giverId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutReservationsInput = {
    update: XOR<UserUpdateWithoutReservationsInput, UserUncheckedUpdateWithoutReservationsInput>
    create: XOR<UserCreateWithoutReservationsInput, UserUncheckedCreateWithoutReservationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReservationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReservationsInput, UserUncheckedUpdateWithoutReservationsInput>
  }

  export type UserUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutReservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutReservationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReservationInput, MessageUncheckedUpdateWithoutReservationInput>
    create: XOR<MessageCreateWithoutReservationInput, MessageUncheckedCreateWithoutReservationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReservationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReservationInput, MessageUncheckedUpdateWithoutReservationInput>
  }

  export type MessageUpdateManyWithWhereWithoutReservationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReservationInput>
  }

  export type ReservationCreateWithoutMessagesInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListing: BookListingCreateNestedOneWithoutReservationInput
    receiver: UserCreateNestedOneWithoutReservationsInput
  }

  export type ReservationUncheckedCreateWithoutMessagesInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListingId: string
    receiverId: string
  }

  export type ReservationCreateOrConnectWithoutMessagesInput = {
    where: ReservationWhereUniqueInput
    create: XOR<ReservationCreateWithoutMessagesInput, ReservationUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type ReservationUpsertWithoutMessagesInput = {
    update: XOR<ReservationUpdateWithoutMessagesInput, ReservationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ReservationCreateWithoutMessagesInput, ReservationUncheckedCreateWithoutMessagesInput>
    where?: ReservationWhereInput
  }

  export type ReservationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ReservationWhereInput
    data: XOR<ReservationUpdateWithoutMessagesInput, ReservationUncheckedUpdateWithoutMessagesInput>
  }

  export type ReservationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListing?: BookListingUpdateOneRequiredWithoutReservationNestedInput
    receiver?: UserUpdateOneRequiredWithoutReservationsNestedInput
  }

  export type ReservationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListingId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type UserCreateWithoutSentTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutSentTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutSentTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentTransactionsInput, UserUncheckedCreateWithoutSentTransactionsInput>
  }

  export type UserCreateWithoutReceivedTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    wishListings?: WishListingCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateWithoutReceivedTransactionsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    wishListings?: WishListingUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserCreateOrConnectWithoutReceivedTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedTransactionsInput, UserUncheckedCreateWithoutReceivedTransactionsInput>
  }

  export type UserUpsertWithoutSentTransactionsInput = {
    update: XOR<UserUpdateWithoutSentTransactionsInput, UserUncheckedUpdateWithoutSentTransactionsInput>
    create: XOR<UserCreateWithoutSentTransactionsInput, UserUncheckedCreateWithoutSentTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentTransactionsInput, UserUncheckedUpdateWithoutSentTransactionsInput>
  }

  export type UserUpdateWithoutSentTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutSentTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type UserUpsertWithoutReceivedTransactionsInput = {
    update: XOR<UserUpdateWithoutReceivedTransactionsInput, UserUncheckedUpdateWithoutReceivedTransactionsInput>
    create: XOR<UserCreateWithoutReceivedTransactionsInput, UserUncheckedCreateWithoutReceivedTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedTransactionsInput, UserUncheckedUpdateWithoutReceivedTransactionsInput>
  }

  export type UserUpdateWithoutReceivedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    wishListings?: WishListingUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    wishListings?: WishListingUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type UserCreateWithoutWishListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingCreateNestedManyWithoutGiverInput
    reservations?: ReservationCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionCreateNestedManyWithoutToUserInput
  }

  export type UserUncheckedCreateWithoutWishListingsInput = {
    id?: string
    email: string
    name?: string | null
    image?: string | null
    walletAddress?: string | null
    createdAt?: Date | string
    tokenBalance?: number
    bookListings?: BookListingUncheckedCreateNestedManyWithoutGiverInput
    reservations?: ReservationUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    sentTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutFromUserInput
    receivedTransactions?: TokenTransactionUncheckedCreateNestedManyWithoutToUserInput
  }

  export type UserCreateOrConnectWithoutWishListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWishListingsInput, UserUncheckedCreateWithoutWishListingsInput>
  }

  export type UserUpsertWithoutWishListingsInput = {
    update: XOR<UserUpdateWithoutWishListingsInput, UserUncheckedUpdateWithoutWishListingsInput>
    create: XOR<UserCreateWithoutWishListingsInput, UserUncheckedCreateWithoutWishListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWishListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWishListingsInput, UserUncheckedUpdateWithoutWishListingsInput>
  }

  export type UserUpdateWithoutWishListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUpdateManyWithoutToUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWishListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tokenBalance?: IntFieldUpdateOperationsInput | number
    bookListings?: BookListingUncheckedUpdateManyWithoutGiverNestedInput
    reservations?: ReservationUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    sentTransactions?: TokenTransactionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedTransactions?: TokenTransactionUncheckedUpdateManyWithoutToUserNestedInput
  }

  export type BookListingCreateManyGiverInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    condition: string
    location: string
    availableTime?: string | null
    description?: string | null
    status?: $Enums.BookListingStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReservationCreateManyReceiverInput = {
    id?: string
    status?: $Enums.ReservationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    bookListingId: string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    content: string
    createdAt?: Date | string
    reservationId: string
  }

  export type TokenTransactionCreateManyFromUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    toUserId: string
  }

  export type TokenTransactionCreateManyToUserInput = {
    id?: string
    amount: number
    note?: string | null
    createdAt?: Date | string
    fromUserId?: string | null
  }

  export type WishListingCreateManyRequesterInput = {
    id?: string
    title: string
    author?: string | null
    isbn?: string | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookListingUpdateWithoutGiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUpdateOneWithoutBookListingNestedInput
  }

  export type BookListingUncheckedUpdateWithoutGiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUncheckedUpdateOneWithoutBookListingNestedInput
  }

  export type BookListingUncheckedUpdateManyWithoutGiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    availableTime?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBookListingStatusFieldUpdateOperationsInput | $Enums.BookListingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservationUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListing?: BookListingUpdateOneRequiredWithoutReservationNestedInput
    messages?: MessageUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListingId?: StringFieldUpdateOperationsInput | string
    messages?: MessageUncheckedUpdateManyWithoutReservationNestedInput
  }

  export type ReservationUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReservationStatusFieldUpdateOperationsInput | $Enums.ReservationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookListingId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservation?: ReservationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reservationId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenTransactionUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUser?: UserUpdateOneRequiredWithoutReceivedTransactionsNestedInput
  }

  export type TokenTransactionUncheckedUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUserId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenTransactionUncheckedUpdateManyWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUserId?: StringFieldUpdateOperationsInput | string
  }

  export type TokenTransactionUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneWithoutSentTransactionsNestedInput
  }

  export type TokenTransactionUncheckedUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenTransactionUncheckedUpdateManyWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WishListingUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListingUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishListingUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyReservationInput = {
    id?: string
    content: string
    createdAt?: Date | string
    senderId: string
  }

  export type MessageUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
  }

  export type MessageUncheckedUpdateManyWithoutReservationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    senderId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}